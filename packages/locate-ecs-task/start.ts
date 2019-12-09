import locateECSTask from './src'

locateECSTask({
  cluster: 'clarity-ECSCluster-1KYVHEV17KYK8',
  task:
    'arn:aws:ecs:us-west-2:052972125574:task/3d7049fb-827a-4247-a3a1-026dc6b0170d',
}).then(console.log, console.error)
