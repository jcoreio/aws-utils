import fetch from 'node-fetch'

export type Container = {
  DockerId: string
  DockerName: string
  Name: string
}

export enum TaskStatus {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
}

export type Task = {
  Arn: string
  DesiredStatus: TaskStatus
  KnownStatus: TaskStatus
  Family: string
  Version: string
  Containers: Container[]
}

export type TasksResponse = {
  Tasks: Task[]
}

export type Metadata = {
  Cluster: string
  ContainerInstanceArn: string
  Version: string
}

export default class ECSAgentClient {
  private baseUrl: string

  constructor({
    protocol,
    host,
    port,
    apiVersion,
  }: {
    protocol?: string | null
    host?: string | null
    port?: number | null
    apiVersion?: number | null
  }) {
    this.baseUrl = `${protocol || 'http'}://${host || 'localhost'}:${port ||
      '51678'}/v${apiVersion || '1'}`
  }

  fetch<T>(url: string): Promise<T> {
    return fetch(`${this.baseUrl}/${url}`).then(res => res.json())
  }

  metadata(): Promise<Metadata> {
    return this.fetch('/metadata')
  }

  task(arnOrDockerId: string): Promise<Task> {
    const query: Record<string, string> = /^arn:/.test(arnOrDockerId)
      ? { taskarn: arnOrDockerId }
      : { dockerid: arnOrDockerId }
    return this.fetch(`/tasks?${new URLSearchParams(query)}`)
  }

  tasks(): Promise<TasksResponse> {
    return this.fetch(`/tasks`)
  }
}
