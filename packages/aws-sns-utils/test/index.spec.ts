import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
  SNSTopicOpts,
  snsTopicExists,
  ensureSNSTopicExists,
  getSNSTopicArn,
  deleteSNSTopic,
} from '../src'

const {
  AWS_ACCOUNT_ID: AWSAccountId,
  AWS_REGION: AWSRegion,
  TEST_SNS_TOPIC: TopicName,
} = process.env
if (TopicName) {
  if (!AWSAccountId) throw Error('AWS_ACCOUNT_ID is required for SNS tests')
  if (!AWSRegion) throw Error('AWS_REGION is required for SNS tests')

  const options: SNSTopicOpts = {
    AWSAccountId,
    AWSRegion,
    TopicName,
  }

  const TopicArn = `arn:aws:sns:${AWSRegion}:${AWSAccountId}:${TopicName}`
  describe('getTopicArn', () => {
    it('calculates the correct topic ARN', () => {
      expect(getSNSTopicArn(options)).to.equal(TopicArn)
    })
    it('returns the topic ARN if it is provided as an argument', () => {
      const ANOTHER_TOPIC_ARN = 'another:arn'
      expect(
        getSNSTopicArn({ ...options, TopicArn: ANOTHER_TOPIC_ARN })
      ).to.equal(ANOTHER_TOPIC_ARN)
    })
    for (const prop of ['AWSAccountId', 'AWSRegion', 'TopicName']) {
      it(`throws if ${prop} property is missing`, () => {
        const optionsCopy = { ...options }
        delete optionsCopy[prop]
        expect(() => getSNSTopicArn(optionsCopy)).to.throw(
          `${prop} is required`
        )
      })
    }
  })

  // You can't really separate the tests for these 3 things
  describe('snsTopicExists, ensureSNSTopicExists, deleteSNSTopic', () => {
    it('creates, detects the presence of, and deletes a topic', async function() {
      this.timeout(5000)
      expect(await snsTopicExists(options)).to.be.false
      await ensureSNSTopicExists(options)
      expect(await snsTopicExists(options)).to.be.true
      await deleteSNSTopic(options)
      expect(await snsTopicExists(options)).to.be.false
    })
  })
}
