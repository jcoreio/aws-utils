import AWS from 'aws-sdk'
import chunks from './util/chunks'

export const skipFailures = <T, P>(
  fn: (ecs: AWS.ECS, params: P) => AsyncIterable<T | AWS.ECS.Failure>
) =>
  async function*(ecs: AWS.ECS, params: P): AsyncIterable<T> {
    for await (const item of fn(ecs, params)) {
      if (!item || (item as any).hasOwnProperty('arn')) continue // eslint-disable-line @typescript-eslint/no-explicit-any
      yield item as T
    }
  }

export type DescribeCapacityProvidersRequest = Omit<
  AWS.ECS.DescribeCapacityProvidersRequest,
  'capacityProviders'
> & {
  capacityProviders: Iterable<string> | AsyncIterable<string>
}

export async function* describeCapacityProviders(
  ecs: AWS.ECS,
  { capacityProviders, ...params }: DescribeCapacityProvidersRequest
): AsyncIterable<AWS.ECS.CapacityProvider | AWS.ECS.Failure> {
  for await (const chunk of chunks(capacityProviders, 100)) {
    do {
      const {
        capacityProviders,
        failures,
        nextToken,
      } = await ecs
        .describeCapacityProviders({ ...params, capacityProviders: chunk })
        .promise()
      if (capacityProviders) yield* capacityProviders
      if (failures) yield* failures
      params.nextToken = nextToken
    } while (params.nextToken)
  }
}

export type DescribeClustersRequest = Omit<
  AWS.ECS.DescribeClustersRequest,
  'clusters'
> & {
  clusters: Iterable<string> | AsyncIterable<string>
}

export async function* describeClusters(
  ecs: AWS.ECS,
  { clusters, ...params }: DescribeClustersRequest
): AsyncIterable<AWS.ECS.Cluster | AWS.ECS.Failure> {
  for await (const chunk of chunks(clusters, 100)) {
    const { clusters, failures } = await ecs
      .describeClusters({ ...params, clusters: chunk })
      .promise()
    if (clusters) yield* clusters
    if (failures) yield* failures
  }
}

export type DescribeContainerInstancesRequest = Omit<
  AWS.ECS.DescribeContainerInstancesRequest,
  'containerInstances'
> & {
  containerInstances: Iterable<string> | AsyncIterable<string>
}

export async function* describeContainerInstances(
  ecs: AWS.ECS,
  { containerInstances, ...params }: DescribeContainerInstancesRequest
): AsyncIterable<AWS.ECS.ContainerInstance | AWS.ECS.Failure> {
  for await (const chunk of chunks(containerInstances, 100)) {
    const {
      containerInstances,
      failures,
    } = await ecs
      .describeContainerInstances({ ...params, containerInstances: chunk })
      .promise()
    if (containerInstances) yield* containerInstances
    if (failures) yield* failures
  }
}

export type DescribeServicesRequest = Omit<
  AWS.ECS.DescribeServicesRequest,
  'services'
> & {
  services: Iterable<string> | AsyncIterable<string>
}

export async function* describeServices(
  ecs: AWS.ECS,
  { services, ...params }: DescribeServicesRequest
): AsyncIterable<AWS.ECS.Service | AWS.ECS.Failure> {
  for await (const chunk of chunks(services, 100)) {
    const { services, failures } = await ecs
      .describeServices({ ...params, services: chunk })
      .promise()
    if (services) yield* services
    if (failures) yield* failures
  }
}

export type DescribeTasksRequest = Omit<
  AWS.ECS.DescribeTasksRequest,
  'tasks'
> & {
  tasks: Iterable<string> | AsyncIterable<string>
}

export async function* describeTasks(
  ecs: AWS.ECS,
  { tasks, ...params }: DescribeTasksRequest
): AsyncIterable<AWS.ECS.Task | AWS.ECS.Failure> {
  for await (const chunk of chunks(tasks, 100)) {
    const { tasks, failures } = await ecs
      .describeTasks({ ...params, tasks: chunk })
      .promise()
    if (tasks) yield* tasks
    if (failures) yield* failures
  }
}

export type DescribeTaskSetsRequest = Omit<
  AWS.ECS.DescribeTaskSetsRequest,
  'taskSets'
> & {
  taskSets: Iterable<string> | AsyncIterable<string>
}

export async function* describeTaskSets(
  ecs: AWS.ECS,
  { taskSets, ...params }: DescribeTaskSetsRequest
): AsyncIterable<AWS.ECS.TaskSet | AWS.ECS.Failure> {
  for await (const chunk of chunks(taskSets, 100)) {
    const { taskSets, failures } = await ecs
      .describeTaskSets({ ...params, taskSets: chunk })
      .promise()
    if (taskSets) yield* taskSets
    if (failures) yield* failures
  }
}

export async function* listAccountSettings(
  ecs: AWS.ECS,
  params: AWS.ECS.ListAccountSettingsRequest
): AsyncIterable<AWS.ECS.Setting> {
  params = { ...params }
  do {
    const { settings, nextToken } = await ecs
      .listAccountSettings(params)
      .promise()
    if (settings) yield* settings
    params.nextToken = nextToken
  } while (params.nextToken)
}

export async function* listClusters(
  ecs: AWS.ECS,
  params: AWS.ECS.ListClustersRequest = {}
): AsyncIterable<string> {
  params = { ...params }
  do {
    const { clusterArns, nextToken } = await ecs.listClusters(params).promise()
    if (clusterArns) yield* clusterArns
    params.nextToken = nextToken
  } while (params.nextToken)
}

export async function* listContainerInstances(
  ecs: AWS.ECS,
  params: AWS.ECS.ListContainerInstancesRequest
): AsyncIterable<string> {
  params = { ...params }
  do {
    const {
      containerInstanceArns,
      nextToken,
    } = await ecs.listContainerInstances(params).promise()
    if (containerInstanceArns) yield* containerInstanceArns
    params.nextToken = nextToken
  } while (params.nextToken)
}

export async function* listServices(
  ecs: AWS.ECS,
  params: AWS.ECS.ListServicesRequest
): AsyncIterable<string> {
  params = { ...params }
  do {
    const { serviceArns, nextToken } = await ecs.listServices(params).promise()
    if (serviceArns) yield* serviceArns
    params.nextToken = nextToken
  } while (params.nextToken)
}

export async function* listTaskDefinitionFamilies(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTaskDefinitionFamiliesRequest
): AsyncIterable<string> {
  params = { ...params }
  do {
    const { families, nextToken } = await ecs
      .listTaskDefinitionFamilies(params)
      .promise()
    if (families) yield* families
    params.nextToken = nextToken
  } while (params.nextToken)
}

export async function* listTaskDefinitions(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTaskDefinitionsRequest
): AsyncIterable<string> {
  params = { ...params }
  do {
    const { taskDefinitionArns, nextToken } = await ecs
      .listTaskDefinitions(params)
      .promise()
    if (taskDefinitionArns) yield* taskDefinitionArns
    params.nextToken = nextToken
  } while (params.nextToken)
}

export async function* listTasks(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTasksRequest
): AsyncIterable<string> {
  params = { ...params }
  do {
    const { taskArns, nextToken } = await ecs.listTasks(params).promise()
    if (taskArns) yield* taskArns
    params.nextToken = nextToken
  } while (params.nextToken)
}
