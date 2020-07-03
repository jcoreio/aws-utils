import AWS from 'aws-sdk'

export async function* describeSubnets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSubnetsRequest
): AsyncIterable<AWS.EC2.Subnet> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSubnets(params).promise()
    if (result.Subnets) yield* result.Subnets
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}
