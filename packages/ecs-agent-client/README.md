# ecs-agent-client

A simple Node API for interacting with ECS Agent.

```ts
import ECSAgentClient from '@jcoreio/aws-ecs-agent-client'

const client = new ECSAgentClient({
  protocol: 'http', // optional
  host: 'localhost', // optional
  protocol: '51678', // optional
})

client.tasks().then(tasks => console.log(JSON.stringify(tasks, null, 2)))
```

## Methods

### `metadata(): Promise<Metadata>`

Fetches ECS Agent metadata.

### `task(arnOrDockerId: string): Promise<Task>`

Fetches information about the task with the given arn or docker id.

### `tasks(): Promise<{Tasks: Task[]}>`

Fetches information about all tasks.
