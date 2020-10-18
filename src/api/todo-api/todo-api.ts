import ky from 'ky'
import { CreateProjectDto, ProjectDto } from './types'

const request = ky.create({ prefixUrl: '/api/v1/' })

const getAllProjects = async (): Promise<ProjectDto[]> => {
  const projects: ProjectDto[] = await request
    .get('project/getAllProject')
    .json()
  return projects
}

const createProject = async (project: CreateProjectDto): Promise<void> => {
  await request.post('project/createProject', { json: project })
}

const createTask = async (task: CreateProjectDto): Promise<void> => {
  await request.post('task/createTask', { json: task })
}

export const todoApi = {
  getAllProjects,
  createProject,
  createTask,
}
