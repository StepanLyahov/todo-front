export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  EXPIRED = 'EXPIRED',
}

export type ProjectId = number

export type TaskId = number

export type TaskDto = {
  id: TaskId
  title: string
  description: string
  status: TaskStatus
}

export type ProjectDto = {
  id: ProjectId
  title: string
  taskDtos: TaskDto[]
}

export type CreateProjectDto = {
  title: string
}

export type CreateTaskDto = {
  projectId: ProjectId
  title: string
  description: string
  status: TaskStatus
}
