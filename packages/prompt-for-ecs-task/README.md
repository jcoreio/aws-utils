# @jcoreio/prompt-for-ecs-task

Prompt the user to select an ECS task in the terminal

```ts
import promptForECSTask from '@jcoreio/prompt-for-ecs-task'

promptForECSTask({ cluster: 'mycluster' }).then(taskArn => {
  // do something with taskArn
})
```

## Options

### `cluster`

The short name or full Amazon Resource Name (ARN) of the cluster to select a task in.
If not given, the user will be prompted to select a cluster.

### `serviceName`

The name of the service to select a task in.
If not given, the user will be prompted to select a service.

### `ECS`

An `AWS.ECS` client to use. If not given, a default one will be created.
