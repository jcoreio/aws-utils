import AWS from 'aws-sdk'
import {
  skipFailures,
  listClusters,
  describeClusters,
  listServices,
  describeServices,
  listTasks,
  describeTasks,
} from '@jcoreio/aws-sdk-async-iterables/ecs'
import { flatten, groupBy, map, sortBy, filter, compact, noop } from 'lodash/fp'
import * as inquirer from 'inquirer'
import path from 'path'
import fs from 'fs-extra'
import { flow, differenceWith, isEqual } from 'lodash'

async function slurp<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const result = []
  for await (const item of iterable) {
    result.push(item)
  }
  return result
}

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

const getClusters = (ecs: AWS.ECS): Promise<AWS.ECS.Cluster[]> =>
  slurp(skipFailures(describeClusters)(ecs, { clusters: listClusters(ecs) }))

const getServices = (
  ecs: AWS.ECS,
  cluster: string
): Promise<AWS.ECS.Service[]> =>
  slurp(
    skipFailures(describeServices)(ecs, {
      cluster,
      services: listServices(ecs, { cluster }),
    })
  )

const getTasks = (
  ecs: AWS.ECS,
  cluster: string,
  serviceName: string
): Promise<AWS.ECS.Task[]> =>
  slurp(
    skipFailures(describeTasks)(ecs, {
      cluster,
      tasks: listTasks(ecs, { cluster, serviceName }),
    })
  )

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
    updater: (cache: Cache) => Cache | Promise<Cache>
  ): Promise<void> => {
    if (!cacheFile) return
    if (!isSupportedCacheVersion(cache.version)) return
    cache = await updater(cache)
    await fs.writeJSON(cacheFile, cache)
  }

  const markRecent = (result: Recent): Promise<void> =>
    updateCache((cache: Cache) => ({
      ...cache,
      recent: [
        result,
        ...differenceWith(cache.recent, [result], isEqual),
      ].slice(0, 20),
    }))

  const pruneObsoleteTasks = (): Promise<void> =>
    updateCache(
      async (cache: Cache): Promise<Cache> => {
        if (!cache.recent || !cache.recent.length) return cache
        const groups = flow(
          groupBy((item: Recent) => item.cluster),
          /* eslint-disable @typescript-eslint/no-explicit-any */
          (map as any).convert({ cap: false })(
            /* eslint-enable @typescript-eslint/no-explicit-any */
            (group: Recent[], cluster: string) =>
              ecs
                .describeTasks({
                  cluster,
                  tasks: group.map(item => item.task),
                })
                .promise()
          )
        )(cache.recent) as Promise<AWS.ECS.DescribeTasksResponse>[]

        const remaining = new Set(
          flow(
            map((r: AWS.ECS.DescribeTasksResponse) => r.tasks),
            compact,
            flatten,
            map(t => t.taskArn),
            compact
          )(await Promise.all(groups))
        )

        return {
          ...cache,
          recent: cache.recent.filter(item => remaining.has(item.task)),
        }
      }
    )

  const clustersPromise = options.cluster
    ? Promise.resolve([])
    : getClusters(ecs)
  clustersPromise.catch(error => console.error(error.stack)) // eslint-disable-line no-console

  let pruneObsoletePromise

  try {
    if (isSupportedCacheVersion(cache.version)) {
      pruneObsoletePromise = pruneObsoleteTasks()
      pruneObsoletePromise.catch(noop)
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
          await markRecent(choice)
          const { cluster, task } = choice
          return { cluster, task }
        }
      }
    }

    const cluster =
      options.cluster ||
      (await (async (): Promise<string> => {
        const clusters = await clustersPromise
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
        const { service } = await inquirer.prompt([
          {
            message: 'Select ECS Service',
            name: 'service',
            type: 'list',
            choices: flow(
              map(({ serviceName }: AWS.ECS.Service) => serviceName)
            )(services).sort(),
          },
        ])
        return service
      })())

    const tasks = await getTasks(ecs, cluster, serviceName)
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
    await pruneObsoletePromise
    await markRecent({ cluster, serviceName, task })
    return { cluster, task }
  } finally {
    if (pruneObsoletePromise) {
      await pruneObsoletePromise.catch(
        err => console.error(err.stack) // eslint-disable-line no-console
      )
    }
  }
}
