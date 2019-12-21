import AWS from 'aws-sdk'
import { flow, map, filter, fromPairs } from 'lodash/fp'
import locateECSTask from '@jcoreio/locate-ecs-task'
import path from 'path'
import request, { Request } from 'request'
import fs from 'fs-extra'
import { DateTime } from 'luxon'
import { Writable } from 'stream'

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
  const { Task, PublicDnsName, PrivateDnsName } = await locateECSTask({
    task,
    cluster,
    ECS,
    EC2,
  })

  const { taskDefinitionArn, containers } = Task
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

  return {
    name,
    profilerBaseUrl: `http://${PublicDnsName || PrivateDnsName}:${
      binding.hostPort
    }/${PROFILER_BASE_URL.replace(/^\/|\/$/g, '')}`,
  }
}

export function getOutFile(cluster: string, task: string, ext: string): string {
  return path.join(
    cluster.replace(/^arn([^/]+?)cluster\//g, ''),
    task,
    `${task}-${DateTime.local().toFormat('yyyy-MM-dd-hh:mm:ss-a')}.${ext}`
  )
}

async function pipeResponse(req: Request, out: Writable): Promise<void> {
  await new Promise((resolve, reject) => {
    out.on('finish', resolve)
    out.on('error', reject)
    req.on('error', reject).pipe(out)
  })
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

  process.stderr.write(
    `${profilerBaseUrl}/cpu?durationMillis=${durationMillis}
  -> ${path.relative(process.cwd(), outFile)}...`
  )
  await pipeResponse(
    request.get({
      uri: profilerBaseUrl + '/cpu',
      timeout: durationMillis * 2,
      qs: { durationMillis },
      headers: { Accept: 'application/json' },
    }),
    fs.createWriteStream(outFile, 'utf8')
  )
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

  process.stderr.write(
    `${profilerBaseUrl}/heap
  -> ${path.relative(process.cwd(), outFile)}...`
  )
  await pipeResponse(
    request.get({
      uri: `${profilerBaseUrl}/heap`,
      timeout: 15 * 60000,
      headers: { Accept: 'application/json' },
    }),
    fs.createWriteStream(outFile, 'utf8')
  )
  process.stderr.write(`done\n`)

  return { file: outFile }
}

export async function sampleHeapProfiling(options: {
  cluster: string
  task: string
  durationMillis: number
  interval?: number | null
  depth?: number | null
  ECS?: AWS.ECS | undefined
  EC2?: AWS.EC2 | undefined
  outDir?: string | undefined
}): Promise<{ file: string }> {
  const { cluster, task, durationMillis, interval, depth } = options
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
    getOutFile(cluster, name || task, 'heapprofile')
  )
  await fs.mkdirs(path.dirname(outFile))

  process.stderr.write(
    `${profilerBaseUrl}/cpu?durationMillis=${durationMillis}
  -> ${path.relative(process.cwd(), outFile)}...`
  )
  await pipeResponse(
    request.get({
      uri: profilerBaseUrl + '/sampleHeapProfiling',
      timeout: durationMillis * 2,
      qs: {
        durationMillis,
        ...(interval != null && depth != null ? { interval, depth } : {}),
      },
      headers: { Accept: 'application/json' },
    }),
    fs.createWriteStream(outFile, 'utf8')
  )
  process.stderr.write(`done\n`)

  return { file: outFile }
}

export async function gc(options: {
  cluster: string
  task: string
  ECS?: AWS.ECS | undefined
  EC2?: AWS.EC2 | undefined
}): Promise<void> {
  const { cluster, task } = options
  const ECS = options.ECS || new AWS.ECS()
  const EC2 = options.EC2 || new AWS.EC2()

  const { profilerBaseUrl } = await getTaskInfo({
    cluster,
    task,
    ECS,
    EC2,
  })

  process.stderr.write(`${profilerBaseUrl}/gc...`)
  await request.get(profilerBaseUrl + '/gc')
  process.stderr.write(`done\n`)
}
