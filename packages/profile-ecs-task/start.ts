import promptForECSTask from '@jcoreio/prompt-for-ecs-task'
import { profileCPU, takeHeapSnapshot } from './src'

async function go(): Promise<void> {
  const { cluster, task } = await promptForECSTask()
  await profileCPU({ cluster, task, durationMillis: 1000 })
  await takeHeapSnapshot({ cluster, task })
}

go().then(console.log, e => console.error(e.stack))
