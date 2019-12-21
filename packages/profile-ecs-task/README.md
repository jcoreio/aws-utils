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

## `sampleHeapProfiling(options)`

Runs the heap sampler on an ECS task, saving the profile into a file.

### Options

#### `cluster: string` (**required**)

The ECS cluster

#### `task: string` (**required**)

The ECS task arn

#### `durationMillis: number` (**required**)

The amount of time to run the sampler, in milliseconds

#### `interval: number` (_optional_)

The sampling interval, in milliseconds

#### `depth: number` (_optional_)

The sampling depth

#### `outDir: string` (**required**)

The base output directory for the file.

#### `ECS: AWS.ECS` (_optional_)

The ECS client

#### `EC2: AWS.EC2` (_optional_)

The EC2 client

### Returns `Promise<{file: string}>`

An object with the `file` that the profile was saved into.

## `gc(options)`

Runs the garbage collector in an ECS task.

### Options

#### `cluster: string` (**required**)

The ECS cluster

#### `task: string` (**required**)

The ECS task arn

#### `ECS: AWS.ECS` (_optional_)

The ECS client

#### `EC2: AWS.EC2` (_optional_)

The EC2 client

### Returns `Promise<void>`

Will resolve once the garbage collector has been called
