# @jcoreio/aws-sdk-async-iterables

async iterable wrappers for AWS SDKs

# Overview

Pagination sucks. Every time you implement a pagination loop you lose a brain cell.
Use async iterable wrappers so that you don't lose any more brain cells.

Right now there are only wrappers for the methods listed below. I'll add wrappers to this package as I need them.

# Table of Contents

<!-- toc -->

- [@jcoreio/aws-sdk-async-iterables](#jcoreioaws-sdk-async-iterables)
- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [API](#api)
  - [S3](#s3)
    - [listObjectsV2](#listobjectsv2)
    - [deleteObjects](#deleteobjects)
    - [listAndDeleteObjects](#listanddeleteobjects)

<!-- tocstop -->

# API

## S3

```js
import { S3 } from '@jcoreio/aws-sdk-async-iterables'
```

### `listObjectsV2`

`listObjectsV2(s3: AWS.S3, params: AWS.S3.ListObjectsV2Request): AsyncIterable<AWS.S3.Object>`

Async iterable version of `AWS.S3.listObjectsV2`.

### `deleteObjects`

`deleteObjects(s3: AWS.S3, params: DeleteObjectsRequest*): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error>`

Async iterable version of `AWS.S3.deletedObjects`. `params.Delete.Objects` must be an `AsyncIterable<ObjectIdentifier>` instead of
`ObjectIdentifier[]`.

### `listAndDeleteObjects`

`listAndDeleteObjects(s3: AWS.S3, listParams: AWS.S3.ListObjectsV2Request, deleteParams?: DeleteObjectsRequest*): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error>`

Convenience method for performing `deleteObjects` on all objects from `listObjectsV2`.
`deleteParams.Delete`, if given, must not have `Objects`.
