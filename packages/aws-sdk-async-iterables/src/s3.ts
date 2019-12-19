import AWS from 'aws-sdk'
import chunks from './util/chunks'

export async function* listObjectsV2(
  s3: AWS.S3,
  params: AWS.S3.ListObjectsV2Request
): AsyncIterable<AWS.S3.Object> {
  params = { ...params }
  let result
  do {
    result = await s3.listObjectsV2(params).promise()
    if (result.Contents) yield* result.Contents
    if (result.NextContinuationToken) {
      delete params.StartAfter
      params.ContinuationToken = result.NextContinuationToken
    }
  } while (result.IsTruncated)
}

export async function* objectIdentifiers(
  objects: Iterable<AWS.S3.Object> | AsyncIterable<AWS.S3.Object>
): AsyncIterable<AWS.S3.ObjectIdentifier> {
  for await (const { Key } of objects) {
    if (Key != null) yield { Key }
  }
}

export type Delete = Omit<AWS.S3.Delete, 'Objects'> & {
  Objects:
    | Iterable<AWS.S3.ObjectIdentifier>
    | AsyncIterable<AWS.S3.ObjectIdentifier>
}

export type DeleteObjectsRequest = Omit<
  AWS.S3.DeleteObjectsRequest,
  'Delete'
> & {
  Delete: Delete
}

export async function* deleteObjects(
  s3: AWS.S3,
  params: DeleteObjectsRequest
): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error> {
  const {
    Delete: { Objects, ...restDelete },
    ...restParams
  } = params
  for await (const chunk of chunks(Objects, 1000)) {
    const { Deleted, Errors } = await s3
      .deleteObjects({
        ...restParams,
        Delete: { ...restDelete, Objects: chunk },
      })
      .promise()
    if (Deleted) yield* Deleted
    if (Errors) yield* Errors
  }
}

export async function* listAndDeleteObjects(
  s3: AWS.S3,
  listParams: AWS.S3.ListObjectsV2Request,
  deleteParams?: Omit<AWS.S3.DeleteObjectsRequest, 'Bucket' | 'Delete'> & {
    Delete: Omit<AWS.S3.Delete, 'Objects'>
  }
): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error> {
  yield* deleteObjects(s3, {
    ...deleteParams,
    Bucket: listParams.Bucket,
    Delete: {
      ...(deleteParams ? deleteParams.Delete : null),
      Objects: objectIdentifiers(listObjectsV2(s3, listParams)),
    },
  })
}
