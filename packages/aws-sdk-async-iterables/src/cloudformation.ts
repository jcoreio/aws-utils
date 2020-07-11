import AWS from 'aws-sdk'

export async function* describeStackEvents(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.DescribeStackEventsInput
): AsyncIterable<AWS.CloudFormation.StackEvent> {
  params = { ...params }
  do {
    const { StackEvents, NextToken } = await cloudformation
      .describeStackEvents(params)
      .promise()
    if (StackEvents) yield* StackEvents
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* describeStacks(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.DescribeStacksInput
): AsyncIterable<AWS.CloudFormation.Stack> {
  params = { ...params }
  do {
    const { Stacks, NextToken } = await cloudformation
      .describeStacks(params)
      .promise()
    if (Stacks) yield* Stacks
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listChangeSets(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListChangeSetsInput
): AsyncIterable<AWS.CloudFormation.ChangeSetSummary> {
  params = { ...params }
  do {
    const { Summaries, NextToken } = await cloudformation
      .listChangeSets(params)
      .promise()
    if (Summaries) yield* Summaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listExports(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListExportsInput
): AsyncIterable<AWS.CloudFormation.Export> {
  params = { ...params }
  do {
    const { Exports, NextToken } = await cloudformation
      .listExports(params)
      .promise()
    if (Exports) yield* Exports
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listImports(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListImportsInput
): AsyncIterable<AWS.CloudFormation.Imports[number]> {
  params = { ...params }
  do {
    const { Imports, NextToken } = await cloudformation
      .listImports(params)
      .promise()
    if (Imports) yield* Imports
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listStackInstances(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackInstancesInput
): AsyncIterable<AWS.CloudFormation.StackInstanceSummary> {
  params = { ...params }
  do {
    const { Summaries, NextToken } = await cloudformation
      .listStackInstances(params)
      .promise()
    if (Summaries) yield* Summaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listStackResources(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackResourcesInput
): AsyncIterable<AWS.CloudFormation.StackResourceSummary> {
  params = { ...params }
  do {
    const {
      StackResourceSummaries,
      NextToken,
    } = await cloudformation.listStackResources(params).promise()
    if (StackResourceSummaries) yield* StackResourceSummaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listStacks(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStacksInput
): AsyncIterable<AWS.CloudFormation.StackSummary> {
  params = { ...params }
  do {
    const { StackSummaries, NextToken } = await cloudformation
      .listStacks(params)
      .promise()
    if (StackSummaries) yield* StackSummaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listStackSetOperationResults(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetOperationResultsInput
): AsyncIterable<AWS.CloudFormation.StackSetOperationResultSummary> {
  params = { ...params }
  do {
    const {
      Summaries,
      NextToken,
    } = await cloudformation.listStackSetOperationResults(params).promise()
    if (Summaries) yield* Summaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listStackSetOperations(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetOperationsInput
): AsyncIterable<AWS.CloudFormation.StackSetOperationSummary> {
  params = { ...params }
  do {
    const {
      Summaries,
      NextToken,
    } = await cloudformation.listStackSetOperations(params).promise()
    if (Summaries) yield* Summaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listStackSets(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetsInput
): AsyncIterable<AWS.CloudFormation.StackSetSummary> {
  params = { ...params }
  do {
    const { Summaries, NextToken } = await cloudformation
      .listStackSets(params)
      .promise()
    if (Summaries) yield* Summaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listTypeRegistrations(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypeRegistrationsInput
): AsyncIterable<AWS.CloudFormation.RegistrationToken> {
  params = { ...params }
  do {
    const {
      RegistrationTokenList,
      NextToken,
    } = await cloudformation.listTypeRegistrations(params).promise()
    if (RegistrationTokenList) yield* RegistrationTokenList
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listTypes(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypesInput
): AsyncIterable<AWS.CloudFormation.TypeSummary> {
  params = { ...params }
  do {
    const { TypeSummaries, NextToken } = await cloudformation
      .listTypes(params)
      .promise()
    if (TypeSummaries) yield* TypeSummaries
    params.NextToken = NextToken
  } while (params.NextToken)
}

export async function* listTypeVersions(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypeVersionsInput
): AsyncIterable<AWS.CloudFormation.TypeVersionSummary> {
  params = { ...params }
  do {
    const {
      TypeVersionSummaries,
      NextToken,
    } = await cloudformation.listTypeVersions(params).promise()
    if (TypeVersionSummaries) yield* TypeVersionSummaries
    params.NextToken = NextToken
  } while (params.NextToken)
}
