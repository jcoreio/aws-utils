# @jcoreio/aws-sns-utils

Create, upsert, and delete SNS topics

```ts
import {
  ensureSNSTopicExists,
  DEFAULT_SERVICE_MONITORING_TOPIC,
} from '@jcoreio/aws-sns-utils'

// Inside of async function
const { TopicArn } = await ensureSNSTopicExists({
  AWSAccountId: process.env.AWS_ACCOUNT_ID,
  AWSRegion: process.env.AWS_REGION,
  TopicName: DEFAULT_SERVICE_MONITORING_TOPIC,
})
```

## Methods

All methods take arguments in the shape of `SNSTopicOpts`:

```ts
export type SNSTopicOpts = {
  AWSAccountId: string
  AWSRegion: string
  TopicName: string
  TopicArn?: string | null
  SNS?: AWS.SNS | null
}
```

### `ensureSNSTopicExists(options: SNSTopicOpts): Promise<{ TopicArn: string }>`

Ensures that a SNS topic exists, creating it if necessary. Has no effect if the
topic already exists. Returns the full ARN of the topic.

### `snsTopicExists(options: SNSTopicOpts): Promise<{ TopicArn: string }>`

Returns `true` if the topic already exists, `false` otherwise.

### `createSNSTopic(options: SNSTopicOpts): Promise<{ TopicArn: string }>`

Creates a SNS topic.

### `deleteSNSTopic(options: SNSTopicOpts): Promise<void>`

Deletes a SNS topic.
