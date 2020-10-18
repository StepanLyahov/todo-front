import { combine, createDomain, forward } from 'effector'
import { ProjectDto, ProjectId, TaskId, todoApi } from '../api/todo-api'
import { createReEffect } from 'effector-reeffect'
import { createGate } from 'effector-react'

const gate = createGate()

const todoDomain = createDomain()

const getAllProjectsFx = createReEffect({
  handler: todoApi.getAllProjects,
})

const init = todoDomain.createEvent()
const destroy = todoDomain.createEvent()
const projectSelected = todoDomain.createEvent<ProjectId>()
const taskSelected = todoDomain.createEvent<TaskId>()
const filterChanged = todoDomain.createEvent<string>()

todoDomain.onCreateStore((store) => store.reset(destroy))

const $projects = todoDomain.createStore<ProjectDto[]>([])
$projects.on(getAllProjectsFx.doneData, (_, projects) => projects)

const $selectedProjectId = todoDomain.createStore<ProjectId | null>(null)
$selectedProjectId.on(projectSelected, (_, id) => id)

const $selectedTaskId = todoDomain.createStore<TaskId | null>(null)
$selectedTaskId.on(taskSelected, (_, id) => id)

const $taskNameFilter = todoDomain.createStore('')
$taskNameFilter.on(filterChanged, (_, name) => name)

const $selectedProject = combine(
  { projects: $projects, projectId: $selectedProjectId },
  ({ projects, projectId }) => {
    return projects.find((p) => p.id === projectId) ?? null
  }
)

const $selectedTask = combine(
  { project: $selectedProject, taskId: $selectedTaskId },
  ({ project, taskId }) => {
    return project?.taskDtos.find((t) => t.id === taskId) ?? null
  }
)

forward({ from: gate.open, to: init })
forward({ from: init, to: getAllProjectsFx })
forward({ from: destroy, to: getAllProjectsFx.cancel })

const $isLoading = getAllProjectsFx.pending

export const todoModel = {
  gate,
  init,
  destroy,
  projectSelected,
  taskSelected,
  filterChanged,
  $store: combine({
    projects: $projects,
    selectedProject: $selectedProject,
    selectedTask: $selectedTask,
    taskNameFilter: $taskNameFilter,
    isLoading: $isLoading,
  }),
}
