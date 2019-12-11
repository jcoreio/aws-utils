import AWS from 'aws-sdk'
import { flow, map, filter, fromPairs } from 'lodash/fp'
import locateECSTask from '@jcoreio/locate-ecs-task'
import path from 'path'
import emitted from 'p-event'
import superagent from 'superagent'
import fs from 'fs-extra'
import { DateTime } from 'luxon'

function environmentToObject(
  environment: AWS.ECS.KeyValuePair[] | undefined
): Record<string, string | undefined> {
  return flow(
    filter(({ name }) => name != null),
    map(({ name, value }: AWS.ECS.KeyValuePair) => [name, value]),
    fromPairs
  )(environment)
}

export async function getTaskInfo({
  cluster,
  task,
  ECS,
  EC2,
}: {
  cluster: string
  task: string
  ECS: AWS.ECS
  EC2?: AWS.EC2 | undefined
}): Promise<{ profilerBaseUrl: string; name: string | undefined }> {
  const { tasks } = await ECS.describeTasks({
    tasks: [task],
    cluster,
  }).promise()

  const descr = tasks ? tasks.find(t => t.taskArn === task) : null
  if (!descr) throw new Error(`task not found: ${task}`)

  const { taskDefinitionArn, containers } = descr
  if (!taskDefinitionArn) throw new Error(`missing taskDefinitionArn`)
  if (!containers || containers.length !== 1)
    throw new Error(`there must be exactly one container in task: ${task}`)
  const [{ networkBindings, name }] = containers
  if (!networkBindings) throw new Error(`missing networkBindings`)

  const { taskDefinition } = await ECS.describeTaskDefinition({
    taskDefinition: taskDefinitionArn,
  }).promise()

  if (!taskDefinition)
    throw new Error(`task definition not found: ${taskDefinitionArn}`)

  const { containerDefinitions } = taskDefinition
  if (!containerDefinitions || containerDefinitions.length !== 1)
    throw new Error(
      `there must be exactly one containerDefinition in taskDefinition: ${taskDefinitionArn}`
    )

  const environment = environmentToObject(containerDefinitions[0].environment)
  const { PROFILER_BASE_URL, PROFILER_PORT } = environment
  if (!PROFILER_BASE_URL)
    throw new Error(`missing PROFILER_BASE_URL in environment`)
  if (!PROFILER_PORT) throw new Error(`missing PROFILER_PORT in environment`)

  const containerPort = parseInt(PROFILER_PORT)
  const binding = networkBindings.find(b => b.containerPort === containerPort)
  if (!binding) throw new Error(`missing networkBinding for PROFILER_PORT`)

  const { PrivateDnsName } = await locateECSTask({
    task,
    cluster,
    ECS,
    EC2,
  })

  return {
    name,
    profilerBaseUrl: `http${
      PROFILER_PORT === '443' ? 's' : ''
    }://${PrivateDnsName}:${binding.hostPort}/${PROFILER_BASE_URL.replace(
      /^\/|\/$/g,
      ''
    )}`,
  }
}

export function getOutFile(cluster: string, task: string, ext: string): string {
  return path.join(
    cluster,
    task,
    `${task}-${DateTime.local().toFormat('yyyy-MM-dd hh:mm:ss a')}.${ext}`
  )
}

export async function profileCPU(options: {
  cluster: string
  task: string
  durationMillis: number
  ECS?: AWS.ECS | undefined
  EC2?: AWS.EC2 | undefined
  outDir?: string | undefined
}): Promise<{ file: string }> {
  const { cluster, task, durationMillis } = options
  const outDir = options.outDir || process.cwd()
  const ECS = options.ECS || new AWS.ECS()
  const EC2 = options.EC2 || new AWS.EC2()

  const { name, profilerBaseUrl } = await getTaskInfo({
    cluster,
    task,
    ECS,
    EC2,
  })

  const outFile = path.join(
    outDir,
    getOutFile(cluster, name || task, 'cpuprofile')
  )
  await fs.mkdirs(path.dirname(outFile))
  const out = fs.createWriteStream(outFile, 'utf8')
  const finished = emitted(out, 'finish', { rejectionEvents: ['error'] })

  process.stderr.write(`Saving to ${outFile}...`)

  await superagent
    .get(profilerBaseUrl + '/cpu')
    .timeout({ response: durationMillis * 2 })
    .query({ durationMillis })
    .pipe(out)

  await finished
  process.stderr.write(`done\n`)

  return { file: outFile }
}

export async function takeHeapSnapshot(options: {
  cluster: string
  task: string
  ECS?: AWS.ECS | undefined
  EC2?: AWS.EC2 | undefined
  outDir?: string | undefined
}): Promise<{ file: string }> {
  const { cluster, task } = options
  const outDir = options.outDir || process.cwd()
  const ECS = options.ECS || new AWS.ECS()
  const EC2 = options.EC2 || new AWS.EC2()

  const { name, profilerBaseUrl } = await getTaskInfo({
    cluster,
    task,
    ECS,
    EC2,
  })

  const outFile = path.join(
    outDir,
    getOutFile(cluster, name || task, 'heapsnapshot')
  )
  await fs.mkdirs(path.dirname(outFile))
  const out = fs.createWriteStream(outFile, 'utf8')
  const finished = emitted(out, 'finish', { rejectionEvents: ['error'] })

  process.stderr.write(`Saving to ${outFile}...`)

  await superagent
    .get(profilerBaseUrl + '/heap')
    .timeout({ response: 60000 })
    .pipe(out)

  await finished
  process.stderr.write(`done\n`)

  return { file: outFile }
}
