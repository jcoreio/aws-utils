# @jcoreio/aws-sdk-async-iterables

async iterable wrappers for AWS SDKs

# Overview

Pagination sucks. Every time you implement a pagination loop you lose a brain cell.
Use async iterable wrappers so that you don't lose any more brain cells.

Right now there are only wrappers for the methods listed below. I'll add wrappers to this package as I need them.

# Table of Contents

<!-- toc -->

- [API](#api)
  - [CloudFormation](#cloudformation)
    - [`describeStackEvents`](#describestackevents)
    - [`describeStacks`](#describestacks)
    - [`listChangeSets`](#listchangesets)
    - [`listExports`](#listexports)
    - [`listImports`](#listimports)
    - [`listStackInstances`](#liststackinstances)
    - [`listStackResources`](#liststackresources)
    - [`listStacks`](#liststacks)
    - [`listStackSetOperationResults`](#liststacksetoperationresults)
    - [`listStackSetOperations`](#liststacksetoperations)
    - [`listStackSets`](#liststacksets)
    - [`listTypeRegistrations`](#listtyperegistrations)
    - [`listTypes`](#listtypes)
    - [`listTypeVersions`](#listtypeversions)
  - [EC2](#ec2)
    - [`describeSubnets`](#describesubnets)
  - [ECS](#ecs)
    - [`describeCapacityProviders`](#describecapacityproviders)
    - [`describeClusters`](#describeclusters)
    - [`describeContainerInstances`](#describecontainerinstances)
    - [`describeServices`](#describeservices)
    - [`describeTasks`](#describetasks)
    - [`describeTaskSets`](#describetasksets)
    - [`listAccountSettings`](#listaccountsettings)
    - [`listClusters`](#listclusters)
    - [`listContainerInstances`](#listcontainerinstances)
    - [`listServices`](#listservices)
    - [`listTaskDefinitionFamilies`](#listtaskdefinitionfamilies)
    - [`listTaskDefinitions`](#listtaskdefinitions)
    - [`listTasks`](#listtasks)
  - [S3](#s3)
    - [`listObjectsV2`](#listobjectsv2)
    - [`deleteObjects`](#deleteobjects)
    - [`listAndDeleteObjects`](#listanddeleteobjects)

<!-- tocstop -->

# API

## CloudFormation

```ts
import { CloudFormation } from '@jcoreio/aws-sdk-async-iterables'
```

### `describeStackEvents`

```ts
export async function* describeStackEvents(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.DescribeStackEventsInput
): AsyncIterable<AWS.CloudFormation.StackEvent>
```

### `describeStacks`

```ts
export async function* describeStacks(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.DescribeStacksInput
): AsyncIterable<AWS.CloudFormation.Stack>
```

### `listChangeSets`

```ts
export async function* listChangeSets(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListChangeSetsInput
): AsyncIterable<AWS.CloudFormation.ChangeSetSummary>
```

### `listExports`

```ts
export async function* listExports(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListExportsInput
): AsyncIterable<AWS.CloudFormation.Export>
```

### `listImports`

```ts
export async function* listImports(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListImportsInput
): AsyncIterable<AWS.CloudFormation.Imports[number]>
```

### `listStackInstances`

```ts
export async function* listStackInstances(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackInstancesInput
): AsyncIterable<AWS.CloudFormation.StackInstanceSummary>
```

### `listStackResources`

```ts
export async function* listStackResources(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackResourcesInput
): AsyncIterable<AWS.CloudFormation.StackResourceSummary>
```

### `listStacks`

```ts
export async function* listStacks(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStacksInput
): AsyncIterable<AWS.CloudFormation.StackSummary>
```

### `listStackSetOperationResults`

```ts
export async function* listStackSetOperationResults(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetOperationResultsInput
): AsyncIterable<AWS.CloudFormation.StackSetOperationResultSummary>
```

### `listStackSetOperations`

```ts
export async function* listStackSetOperations(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetOperationsInput
): AsyncIterable<AWS.CloudFormation.StackSetOperationSummary>
```

### `listStackSets`

```ts
export async function* listStackSets(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetsInput
): AsyncIterable<AWS.CloudFormation.StackSetSummary>
```

### `listTypeRegistrations`

```ts
export async function* listTypeRegistrations(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypeRegistrationsInput
): AsyncIterable<AWS.CloudFormation.RegistrationToken>
```

### `listTypes`

```ts
export async function* listTypes(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypesInput
): AsyncIterable<AWS.CloudFormation.TypeSummary>
```

### `listTypeVersions`

```ts
export async function* listTypeVersions(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypeVersionsInput
): AsyncIterable<AWS.CloudFormation.TypeVersionSummary>
```

## EC2

```js
import { EC2 } from '@jcoreio/aws-sdk-async-iterables'
```

### `describeSubnets`

```js
export async function* describeSubnets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSubnetsRequest
): AsyncIterable<AWS.EC2.Subnet>
```

## ECS

```js
import { ECS } from '@jcoreio/aws-sdk-async-iterables'
```

The `describe` methods accept sync/async iterables of ARNs to describe
in places of just arrays. This means you can pipe the `AsyncIterable`s
returned by `list` methods into them:

```ts
async function go() {
  for await (const taskOrFailure of ECS.describeTasks(ecs, {
    cluster: 'mycluster',
    tasks: ECS.listTasks(ecs, { cluster: 'mycluster' }),
  })) {
    console.log(taskOrFailure)
  }
}
```

The `describe` methods yield both descriptions and failures; if
you don't want the failures wrap the function in `skipFailures`:

```ts
async function go() {
  for await (const task of ECS.skipFailures(ECS.describeTasks)(ecs, {
    tasks: ECS.listTasks(ecs, { cluster: 'mycluster' }),
  })) {
    console.log(task)
  }
}
```

### `describeCapacityProviders`

```ts
export async function* describeCapacityProviders(
  ecs: AWS.ECS,
  params: DescribeCapacityProvidersRequest
): AsyncIterable<AWS.ECS.CapacityProvider | AWS.ECS.Failure>
```

### `describeClusters`

```ts
export async function* describeClusters(
  ecs: AWS.ECS,
  params: DescribeClustersRequest
): AsyncIterable<AWS.ECS.Cluster | AWS.ECS.Failure>
```

### `describeContainerInstances`

```ts
export async function* describeContainerInstances(
  ecs: AWS.ECS,
  params: DescribeContainerInstancesRequest
): AsyncIterable<AWS.ECS.ContainerInstance | AWS.ECS.Failure>
```

### `describeServices`

```ts
export async function* describeServices(
  ecs: AWS.ECS,
  params: DescribeServicesRequest
): AsyncIterable<AWS.ECS.Service | AWS.ECS.Failure>
```

### `describeTasks`

```ts
export async function* describeTasks(
  ecs: AWS.ECS,
  params: DescribeTasksRequest
): AsyncIterable<AWS.ECS.Task | AWS.ECS.Failure>
```

### `describeTaskSets`

```ts
export async function* describeTaskSets(
  ecs: AWS.ECS,
  params: DescribeTaskSetsRequest
): AsyncIterable<AWS.ECS.TaskSet | AWS.ECS.Failure>
```

### `listAccountSettings`

```ts
export async function* listAccountSettings(
  ecs: AWS.ECS,
  params: AWS.ECS.ListAccountSettingsRequest
): AsyncIterable<AWS.ECS.Setting>
```

### `listClusters`

```ts
export async function* listClusters(
  ecs: AWS.ECS,
  params: AWS.ECS.ListClustersRequest
): AsyncIterable<string>
```

### `listContainerInstances`

```ts
export async function* listContainerInstances(
  ecs: AWS.ECS,
  params: AWS.ECS.ListContainerInstancesRequest
): AsyncIterable<string>
```

### `listServices`

```ts
export async function* listServices(
  ecs: AWS.ECS,
  params: AWS.ECS.ListServicesRequest
): AsyncIterable<string>
```

### `listTaskDefinitionFamilies`

```ts
export async function* listTaskDefinitionFamilies(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTaskDefinitionFamiliesRequest
): AsyncIterable<string>
```

### `listTaskDefinitions`

```ts
export async function* listTaskDefinitions(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTaskDefinitionsRequest
): AsyncIterable<string>
```

### `listTasks`

```ts
export async function* listTasks(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTasksRequest
): AsyncIterable<string>
```

## S3

```js
import { S3 } from '@jcoreio/aws-sdk-async-iterables'
```

### `listObjectsV2`

`listObjectsV2(s3: AWS.S3, params: AWS.S3.ListObjectsV2Request): AsyncIterable<AWS.S3.Object>`

Async iterable version of `AWS.S3.listObjectsV2`.

### `deleteObjects`

`deleteObjects(s3: AWS.S3, params: DeleteObjectsRequest*): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error>`

Async iterable version of `AWS.S3.deletedObjects`. `params.Delete.Objects` can be an `Iterable<ObjectIdentifier>` or `AsyncIterable<ObjectIdentifier>` instead
of just `ObjectIdentifier[]`.

### `listAndDeleteObjects`

`listAndDeleteObjects(s3: AWS.S3, listParams: AWS.S3.ListObjectsV2Request, deleteParams?: DeleteObjectsRequest*): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error>`

Convenience method for performing `deleteObjects` on all objects from `listObjectsV2`.
`deleteParams.Delete`, if given, must not have `Objects`.
