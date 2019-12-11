import AWS from 'aws-sdk'
import ECSAgentClient, { Container } from '@jcoreio/ecs-agent-client'

export default async function locateECSTask(options: {
  task: string
  cluster?: string | null
  ECS?: AWS.ECS | null
  EC2?: AWS.EC2 | null
}): Promise<{
  ec2InstanceId: string
  Containers: Container[]
  PublicDnsName: string | undefined
  PublicIpAddress: string | undefined
  PrivateDnsName: string
  PrivateIpAddress: string
}> {
  const { task } = options
  const cluster = options.cluster || 'default'
  const ecs = options.ECS || new AWS.ECS()
  const ec2 = options.EC2 || new AWS.EC2()

  const { tasks } = await ecs
    .describeTasks({
      tasks: [task],
      cluster,
    })
    .promise()

  if (!tasks) throw new Error(`task not found: ${task}`)

  const [{ containerInstanceArn }] = tasks

  if (!containerInstanceArn)
    throw new Error(`failed to get containerInstanceArn for task: ${task}`)

  const { containerInstances } = await ecs
    .describeContainerInstances({
      containerInstances: [containerInstanceArn],
      cluster,
    })
    .promise()

  if (!containerInstances)
    throw new Error(`failed to get container instance: ${containerInstanceArn}`)

  const [{ ec2InstanceId }] = containerInstances

  if (!ec2InstanceId)
    throw new Error(
      `failed to get EC2 instance for container instance: ${containerInstanceArn}`
    )

  const { Reservations } = await ec2
    .describeInstances({
      InstanceIds: [ec2InstanceId],
    })
    .promise()

  if (!Reservations || !Reservations[0])
    throw new Error(
      `failed to get Reservations for EC2 instance: ${ec2InstanceId}`
    )

  const [{ Instances }] = Reservations

  if (!Instances || !Instances[0])
    throw new Error(`failed to get EC2 instance: ${ec2InstanceId}`)

  const [{ PublicDnsName, PublicIpAddress, NetworkInterfaces }] = Instances

  if (!NetworkInterfaces || !NetworkInterfaces[0])
    throw new Error(
      `failed to get NetworkInterfaces for EC2 instance: ${ec2InstanceId}`
    )

  const [{ PrivateDnsName, PrivateIpAddress }] = NetworkInterfaces

  if (!PrivateDnsName)
    throw new Error(
      `failed to get PrivateDnsName for EC2 instance: ${ec2InstanceId}`
    )
  if (!PrivateIpAddress)
    throw new Error(
      `failed to get PrivateDnsName for EC2 instance: ${ec2InstanceId}`
    )

  const ecsAgent = new ECSAgentClient({
    host: PrivateDnsName,
  })

  const { Containers } = await ecsAgent.task(task)

  return {
    ec2InstanceId,
    Containers,
    PublicDnsName,
    PublicIpAddress,
    PrivateDnsName,
    PrivateIpAddress,
  }
}
