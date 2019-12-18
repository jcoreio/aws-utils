# @jcoreio/aws-sdk-async-iterables

async iterable wrappers for AWS SDKs

# Overview

Pagination sucks. Every time you implement a pagination loop you lose a brain cell.
Use async iterable wrappers so that you don't lose any more brain cells.

Right now there are only wrappers for the methods listed below. I'll add wrappers to this package as I need them.

# API

## S3

### `listObjectsV2(S3: AWS.S3, params: AWS.S3.ListObjectsV2Request): AsyncIterable<AWS.S3.Object>`

Async iterable version of `AWS.S3.listObjectsV2`.
