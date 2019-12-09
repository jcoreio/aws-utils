import AWS from 'aws-sdk'
import { flow, compact, flatten, map, sortBy } from 'lodash/fp'
import * as inquirer from 'inquirer'

export default async function promptForECSTask(
  options: {
    cluster?: string | null
    serviceName?: string | null
    ECS?: AWS.ECS | null
  } = {}
): Promise<string> {
  const ecs = options.ECS || new AWS.ECS()

  const cluster =
    options.cluster ||
    (await (async (): Promise<string> => {
      const chunks = []
      let { clusterArns, nextToken } = await ecs.listClusters().promise()
      if (clusterArns) {
        const { clusters } = await ecs
          .describeClusters({ clusters: clusterArns })
          .promise()
        chunks.push(clusters)
      }
      while (nextToken) {
        ;({ clusterArns, nextToken } = await ecs
          .listClusters({ nextToken })
          .promise())
        if (clusterArns) {
          const { clusters } = await ecs
            .describeClusters({ clusters: clusterArns })
            .promise()
          chunks.push(clusters)
        }
      }
      const { cluster } = await inquirer.prompt([
        {
          message: 'Select ECS Cluster',
          name: 'cluster',
          type: 'list',
          choices: flow(
            compact,
            flatten,
            map(({ clusterName, clusterArn }: AWS.ECS.Cluster) => ({
              name: clusterName,
              value: clusterArn,
            })),
            sortBy('name')
          )(chunks),
        },
      ])
      return cluster
    })())

  const serviceName =
    options.serviceName ||
    (await (async (): Promise<string> => {
      const chunks = []
      let { serviceArns, nextToken } = await ecs
        .listServices({ cluster })
        .promise()
      if (serviceArns) {
        const { services } = await ecs
          .describeServices({ cluster, services: serviceArns })
          .promise()
        chunks.push(services)
      }
      while (nextToken) {
        ;({ serviceArns, nextToken } = await ecs
          .listServices({ cluster, nextToken })
          .promise())
        if (serviceArns) {
          const { services } = await ecs
            .describeServices({ cluster, services: serviceArns })
            .promise()
          chunks.push(services)
        }
      }
      const { service } = await inquirer.prompt([
        {
          message: 'Select ECS Service',
          name: 'service',
          type: 'list',
          choices: flow(
            compact,
            flatten,
            map(({ serviceName }: AWS.ECS.Service) => serviceName)
          )(chunks).sort(),
        },
      ])
      return service
    })())

  const chunks = []
  let { taskArns, nextToken } = await ecs
    .listTasks({ cluster, serviceName })
    .promise()
  chunks.push(taskArns)
  while (nextToken) {
    ;({ taskArns, nextToken } = await ecs
      .listTasks({ cluster, serviceName, nextToken })
      .promise())
    chunks.push(taskArns)
  }
  const { task } = await inquirer.prompt([
    {
      message: 'Select ECS Task',
      name: 'task',
      type: 'list',
      choices: flow(
        compact,
        flatten
      )(chunks),
    },
  ])
  return task
}
