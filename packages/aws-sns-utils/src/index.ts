import AWS from 'aws-sdk'
import { VError } from 'verror'

export const DEFAULT_SERVICE_MONITORING_TOPIC = 'service-monitoring'

export type GetSNSTopicArnOpts = {
  awsConfig?: AWS.ConfigurationOptions
  AWSAccountId: string
  AWSRegion?: string
  TopicName: string
  TopicArn?: string | null
}

export type SNSTopicOpts = GetSNSTopicArnOpts & {
  SNS?: AWS.SNS | null
}

const getSNSFromOpts = (options: SNSTopicOpts): AWS.SNS =>
  options.SNS || new AWS.SNS(options.awsConfig)

export function getSNSTopicArn(options: GetSNSTopicArnOpts): string {
  const {
    awsConfig,
    AWSRegion = awsConfig ? awsConfig.region : undefined,
    AWSAccountId,
    TopicName,
    TopicArn,
  } = options
  if (!AWSRegion) throw Error('upsertSNSTopic: AWSRegion is required')
  if (!AWSAccountId) throw Error('upsertSNSTopic: AWSAccountId is required')
  if (!TopicName) throw Error('upsertSNSTopic: TopicName is required')
  return TopicArn || `arn:aws:sns:${AWSRegion}:${AWSAccountId}:${TopicName}`
}

export async function snsTopicExists(options: SNSTopicOpts): Promise<boolean> {
  const sns = getSNSFromOpts(options)
  const TopicArn = getSNSTopicArn(options)
  try {
    await sns.getTopicAttributes({ TopicArn }).promise()
    return true
  } catch (err) {
    if ('NotFound' === err.code) return false
    throw new VError(
      err,
      `error while using the AWS SNS API to detect whether topic ${TopicArn} exists`
    )
  }
}

export async function createSNSTopic(
  options: SNSTopicOpts
): Promise<{ TopicArn: string }> {
  const sns = getSNSFromOpts(options)
  const TopicArn = getSNSTopicArn(options)
  await sns.createTopic({ Name: options.TopicName }).promise()
  return { TopicArn }
}

export async function ensureSNSTopicExists(
  options: SNSTopicOpts
): Promise<{ TopicArn: string }> {
  const TopicArn = getSNSTopicArn(options)
  const subCallOptions: SNSTopicOpts = {
    ...options,
    TopicArn,
    SNS: getSNSFromOpts(options),
  }
  if (!(await snsTopicExists(subCallOptions))) {
    await createSNSTopic(subCallOptions)
  }
  return { TopicArn }
}

export async function deleteSNSTopic(options: SNSTopicOpts): Promise<void> {
  await getSNSFromOpts(options)
    .deleteTopic({
      TopicArn: getSNSTopicArn(options),
    })
    .promise()
}

/**
 * @param TopicArn Destination SNS topic
 * @return IAM policy that allow publishing to the specified SNS topic.
 */
export function getSNSPublishIAMPolicy({
  TopicArn,
}: {
  TopicArn: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Record<string, any> {
  return {
    PolicyName: 'sns-publish',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['sns:Publish'],
          Resource: TopicArn,
        },
      ],
    },
  }
}
