import ky from 'ky'
import { ProjectDto } from './types'

const request = ky.create({ prefixUrl: '/api/v1/' })

const getAllProjects = async (): Promise<ProjectDto[]> => {
  const projects: ProjectDto[] = await request
    .get('project/getAllProject')
    .json()
  return projects
}

export const todoApi = {
  getAllProjects,
}
