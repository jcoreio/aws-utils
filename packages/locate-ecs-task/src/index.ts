import AWS from 'aws-sdk'

function findInstance(
  Reservations: AWS.EC2.Reservation[] | undefined,
  InstanceId: string
): AWS.EC2.Instance | undefined {
  if (!Reservations) return undefined
  for (const { Instances } of Reservations) {
    if (!Instances) continue
    for (const Instance of Instances) {
      if (Instance.InstanceId === InstanceId) {
        return Instance
      }
    }
  }
}

export default async function locateECSTask(options: {
  task: string
  cluster?: string | null
  ECS?: AWS.ECS | null
  EC2?: AWS.EC2 | null
}): Promise<{
  ec2InstanceId: string
  PublicDnsName: string | undefined
  PublicIpAddress: string | undefined
  PrivateDnsName: string
  PrivateIpAddress: string
  Task: AWS.ECS.Task
  ContainerInstance: AWS.ECS.ContainerInstance
  Instance: AWS.EC2.Instance
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

  const Task = tasks ? tasks[0] : null

  if (!Task) throw new Error(`task not found: ${task}`)

  const { containerInstanceArn } = Task

  if (!containerInstanceArn)
    throw new Error(`failed to get containerInstanceArn for task: ${task}`)

  const { containerInstances } = await ecs
    .describeContainerInstances({
      containerInstances: [containerInstanceArn],
      cluster,
    })
    .promise()

  if (containerInstances && containerInstances.length > 1) {
    throw new Error(
      `this Task has multiple ContainerInstances, which isn't currently supported`
    )
  }
  const ContainerInstance = containerInstances ? containerInstances[0] : null

  if (!ContainerInstance)
    throw new Error(`failed to get container instance: ${containerInstanceArn}`)

  const { ec2InstanceId } = ContainerInstance

  if (!ec2InstanceId)
    throw new Error(
      `failed to get EC2 instance for container instance: ${containerInstanceArn}`
    )

  const { Reservations } = await ec2
    .describeInstances({
      InstanceIds: [ec2InstanceId],
    })
    .promise()

  const Instance = findInstance(Reservations, ec2InstanceId)

  if (!Instance) throw new Error(`failed to get EC2 instance: ${ec2InstanceId}`)

  const { PublicDnsName, PublicIpAddress, NetworkInterfaces } = Instance

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

  return {
    ec2InstanceId,
    PublicDnsName,
    PublicIpAddress,
    PrivateDnsName,
    PrivateIpAddress,
    Task,
    ContainerInstance,
    Instance,
  }
}
