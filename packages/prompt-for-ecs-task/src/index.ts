import AWS from 'aws-sdk'
import { flow, flatten, map, sortBy, filter } from 'lodash/fp'
import * as inquirer from 'inquirer'
import path from 'path'
import fs from 'fs-extra'
import { differenceWith, isEqual } from 'lodash'

type Recent = {
  cluster: string
  serviceName: string
  task: string
}

type Cache = {
  version: number
  recent: Recent[]
}

const CURRENT_CACHE_VERSION = 1

function isSupportedCacheVersion(version: number): boolean {
  return version === CURRENT_CACHE_VERSION
}

const displayCluster = (cluster: string): string =>
  cluster.replace(/^arn:aws[^/]+cluster\//, '')
const displayTask = (task: string): string =>
  task.replace(/^arn:aws[^/]+task\//, '')

async function getClusters(ECS: AWS.ECS): Promise<AWS.ECS.Cluster[]> {
  const chunks: AWS.ECS.Cluster[][] = []
  let { clusterArns, nextToken } = await ECS.listClusters().promise()
  if (clusterArns) {
    const { clusters } = await ECS.describeClusters({
      clusters: clusterArns,
    }).promise()
    if (clusters) chunks.push(clusters)
  }
  while (nextToken) {
    ;({ clusterArns, nextToken } = await ECS.listClusters({
      nextToken,
    }).promise())
    if (clusterArns) {
      const { clusters } = await ECS.describeClusters({
        clusters: clusterArns,
      }).promise()
      if (clusters) chunks.push(clusters)
    }
  }
  return flatten(chunks)
}

async function getServices(
  ECS: AWS.ECS,
  cluster: string
): Promise<AWS.ECS.Service[]> {
  const chunks: AWS.ECS.Service[][] = []
  let { serviceArns, nextToken } = await ECS.listServices({ cluster }).promise()
  if (serviceArns) {
    const { services } = await ECS.describeServices({
      cluster,
      services: serviceArns,
    }).promise()
    if (services) chunks.push(services)
  }
  while (nextToken) {
    ;({ serviceArns, nextToken } = await ECS.listServices({
      cluster,
      nextToken,
    }).promise())
    if (serviceArns) {
      const { services } = await ECS.describeServices({
        cluster,
        services: serviceArns,
      }).promise()
      if (services) chunks.push(services)
    }
  }
  return flatten(chunks)
}

async function getTasks(
  ECS: AWS.ECS,
  cluster: string,
  serviceName: string
): Promise<AWS.ECS.Task[]> {
  const chunks: AWS.ECS.Task[][] = []
  let { taskArns, nextToken } = await ECS.listTasks({
    cluster,
    serviceName,
  }).promise()
  if (taskArns) {
    const { tasks } = await ECS.describeTasks({
      cluster,
      tasks: taskArns,
    }).promise()
    if (tasks) chunks.push(tasks)
  }
  while (nextToken) {
    ;({ taskArns, nextToken } = await ECS.listTasks({
      cluster,
      serviceName,
      nextToken,
    }).promise())
    if (taskArns) {
      const { tasks } = await ECS.describeTasks({
        cluster,
        tasks: taskArns,
      }).promise()
      if (tasks) chunks.push(tasks)
    }
  }
  return flatten(chunks)
}

export default async function promptForECSTask(
  options: {
    cluster?: string | null
    clusterFilter?: null | ((cluster: AWS.ECS.Cluster) => boolean)
    serviceName?: string | null
    ECS?: AWS.ECS | null
    cacheFile?: string | false
  } = {}
): Promise<{ cluster: string; task: string }> {
  const cacheFile =
    typeof options.cacheFile === 'string'
      ? path.resolve(options.cacheFile)
      : options.cacheFile === false
      ? null
      : path.resolve('.prompt-for-ecs-task.json')
  const ecs = options.ECS || new AWS.ECS()

  let cache: Cache = cacheFile
    ? await fs
        .readJSON(cacheFile)
        .catch(() => ({ version: CURRENT_CACHE_VERSION }))
    : { version: CURRENT_CACHE_VERSION }

  const updateCache = async (
    updater: (cache: Cache) => Cache
  ): Promise<void> => {
    if (!cacheFile) return
    if (!isSupportedCacheVersion(cache.version)) return
    cache = updater(cache)
    await fs.writeJSON(cacheFile, cache)
  }

  const setRecent = (result: Recent): Promise<void> =>
    updateCache((cache: Cache) => ({
      ...cache,
      recent: [
        result,
        ...differenceWith(cache.recent, [result], isEqual),
      ].slice(0, 20),
    }))

  const pruneObsoleteClusters = (clusters: AWS.ECS.Cluster[]): Promise<void> =>
    updateCache((cache: Cache) => {
      const remaining = new Set(clusters.map(c => c.clusterArn))
      return {
        ...cache,
        recent: (cache.recent || []).filter(item =>
          remaining.has(item.cluster)
        ),
      }
    })

  const pruneObsoleteServices = (
    cluster: string,
    services: AWS.ECS.Service[]
  ): Promise<void> =>
    updateCache((cache: Cache) => {
      const remaining = new Set(services.map(c => c.serviceName))
      return {
        ...cache,
        recent: (cache.recent || []).filter(
          item => item.cluster !== cluster || remaining.has(item.serviceName)
        ),
      }
    })

  const pruneObsoleteTasks = (
    cluster: string,
    serviceName: string,
    tasks: AWS.ECS.Task[]
  ): Promise<void> =>
    updateCache((cache: Cache) => {
      const remaining = new Set(tasks.map(c => c.taskArn))
      return {
        ...cache,
        recent: (cache.recent || []).filter(
          item =>
            item.cluster !== cluster ||
            item.serviceName !== serviceName ||
            remaining.has(item.task)
        ),
      }
    })

  const clustersPromise = options.cluster
    ? Promise.resolve([])
    : getClusters(ecs)
  clustersPromise.catch(error => console.error(error.stack)) // eslint-disable-line no-console

  if (isSupportedCacheVersion(cache.version)) {
    const { cluster } = options
    const recent =
      cache.recent && cluster
        ? cache.recent.filter(
            item => displayCluster(item.cluster) === displayCluster(cluster)
          )
        : cache.recent
    if (recent && recent.length) {
      const choices = recent.map(({ cluster, serviceName, task }) => ({
        name: [displayCluster(cluster), serviceName, displayTask(task)].join(
          ' > '
        ),
        value: { cluster, serviceName, task },
      }))
      choices.splice(1, 0, {
        name: 'None (Select a New Task)',
        value: null as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      })
      const { choice } = await inquirer.prompt([
        {
          message: 'Select Recent Task?',
          name: 'choice',
          type: 'list',
          choices,
        },
      ])
      if (choice) {
        await setRecent(choice)
        const { cluster, task } = choice
        return { cluster, task }
      }
    }
  }

  const cluster =
    options.cluster ||
    (await (async (): Promise<string> => {
      const clusters = await clustersPromise
      await pruneObsoleteClusters(clusters)
      const { cluster } = await inquirer.prompt([
        {
          message: 'Select ECS Cluster',
          name: 'cluster',
          type: 'list',
          choices: flow(
            filter(options.clusterFilter || ((): boolean => true)),
            map(({ clusterName, clusterArn }: AWS.ECS.Cluster) => ({
              name: clusterName,
              value: clusterArn,
            })),
            sortBy('name')
          )(clusters),
        },
      ])
      return cluster
    })())

  const serviceName =
    options.serviceName ||
    (await (async (): Promise<string> => {
      const services = await getServices(ecs, cluster)
      await pruneObsoleteServices(cluster, services)
      const { service } = await inquirer.prompt([
        {
          message: 'Select ECS Service',
          name: 'service',
          type: 'list',
          choices: flow(map(({ serviceName }: AWS.ECS.Service) => serviceName))(
            services
          ).sort(),
        },
      ])
      return service
    })())

  const tasks = await getTasks(ecs, cluster, serviceName)
  await pruneObsoleteTasks(cluster, serviceName, tasks)
  const { task } = await inquirer.prompt([
    {
      message: 'Select ECS Task',
      name: 'task',
      type: 'list',
      choices: flow(
        map((task: AWS.ECS.Task) => ({
          name: displayTask(task.taskArn || ''),
          value: task.taskArn,
        }))
      )(tasks),
    },
  ])
  await setRecent({ cluster, serviceName, task })
  return { cluster, task }
}
