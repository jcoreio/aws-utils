# @jcoreio/profile-ecs-task

Run V8 Profiler remotely in an ECS task

# API

## `profileCPU(options)`

Runs the CPU profiler on an ECS task, saving the profile into a file.

### Options

#### `cluster: string` (**required**)

The ECS cluster

#### `task: string` (**required**)

The ECS task arn

#### `durationMillis: number` (**required**)

The amount of time to run the profiler, in milliseconds

#### `outDir: string` (**required**)

The base output directory for the file.

#### `ECS: AWS.ECS` (_optional_)

The ECS client

#### `EC2: AWS.EC2` (_optional_)

The EC2 client

### Returns `Promise<{file: string}>`

An object with the `file` that the profile was saved into.

## `takeHeapSnapshot(options)`

Takes a heap snapshot on an ECS task, saving it into a file.

### Options

#### `cluster: string` (**required**)

The ECS cluster

#### `task: string` (**required**)

The ECS task arn

#### `outDir: string` (**required**)

The base output directory for the file.

#### `ECS: AWS.ECS` (_optional_)

The ECS client

#### `EC2: AWS.EC2` (_optional_)

The EC2 client

### Returns `Promise<{file: string}>`

An object with the `file` that the snapshot was saved into.