import AWS from 'aws-sdk'

export async function* listObjectsV2(
  S3: AWS.S3,
  params: AWS.S3.ListObjectsV2Request
): AsyncIterable<AWS.S3.Object> {
  params = { ...params }
  let result
  do {
    result = await S3.listObjectsV2(params).promise()
    if (result.Contents) yield* result.Contents
    if (result.NextContinuationToken) {
      delete params.StartAfter
      params.ContinuationToken = result.NextContinuationToken
    }
  } while (result.IsTruncated)
}
