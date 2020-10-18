import { combine, createDomain, forward, sample } from 'effector'
import { createReEffect } from 'effector-reeffect'
import { createGate } from 'effector-react'
import { ProjectDto, TaskDto, todoApi } from '../api/todo-api'

const gate = createGate()

const todoDomain = createDomain()

const getAllProjectsFx = createReEffect({ handler: todoApi.getAllProjects })

const refetchProjectsFx = createReEffect({ handler: todoApi.getAllProjects })

const createProjectFx = createReEffect({ handler: todoApi.createProject })

const createTaskFx = createReEffect({ handler: todoApi.createTask })

const init = todoDomain.createEvent()
const destroy = todoDomain.createEvent()
const projectSelected = todoDomain.createEvent<ProjectDto>()
const taskSelected = todoDomain.createEvent<TaskDto>()
const filterChanged = todoDomain.createEvent<string>()

const newProjectNameChanged = todoDomain.createEvent<string>()

const addProjectModalOpened = todoDomain.createEvent()
const addProjectModalClosed = todoDomain.createEvent()

const addTaskModalOpened = todoDomain.createEvent()
const addTaskModalClosed = todoDomain.createEvent()

const addTaskClicked = todoDomain.createEvent()
const addProjectClicked = todoDomain.createEvent()

todoDomain.onCreateStore((store) => store.reset(destroy))

const $projects = todoDomain.createStore<ProjectDto[]>([])

const $selectedProject = todoDomain.createStore<ProjectDto | null>(null)

const $selectedTask = todoDomain.createStore<TaskDto | null>(null)

const $addProjectModalIsOpened = todoDomain.createStore(false)

const $addTaskModalIsOpened = todoDomain.createStore(false)

const $taskNameFilter = todoDomain.createStore('')

const $newProjectName = todoDomain.createStore('')

$projects.on(getAllProjectsFx.doneData, (_, projects) => projects)
$projects.on(refetchProjectsFx.doneData, (_, projects) => projects)

$selectedProject.on(projectSelected, (_, project) => project)

$selectedTask.on(taskSelected, (_, task) => task)
$selectedTask.reset(projectSelected)

$taskNameFilter.on(filterChanged, (_, name) => name)

$addProjectModalIsOpened.on(addProjectModalOpened, () => true)
$addProjectModalIsOpened.reset(addProjectModalClosed)

$addTaskModalIsOpened.on(addTaskModalOpened, () => true)
$addTaskModalIsOpened.reset(addTaskModalClosed)

$newProjectName.on(newProjectNameChanged, (_, name) => name)
$newProjectName.reset(refetchProjectsFx.done)

const $canAddTask = $selectedProject.map((project) => project !== null)

forward({ from: gate.open, to: init })
forward({ from: init, to: getAllProjectsFx })
forward({ from: destroy, to: getAllProjectsFx.cancel })

forward({ from: createProjectFx.done, to: refetchProjectsFx })
forward({ from: refetchProjectsFx.done, to: addProjectModalClosed })

sample({
  source: $newProjectName,
  clock: addProjectClicked,
  target: createProjectFx,
  fn: (name) => ({ title: name }),
})

export const todoModel = {
  gate,
  init,
  destroy,
  projectSelected,
  taskSelected,
  filterChanged,
  addProjectModalOpened,
  addProjectModalClosed,
  newProjectNameChanged,
  addProjectClicked,
  addTaskClicked,
  $store: combine({
    projects: $projects,
    selectedProject: $selectedProject,
    selectedTask: $selectedTask,
    taskNameFilter: $taskNameFilter,
    isLoading: getAllProjectsFx.pending,
    addProjectModalIsOpened: $addProjectModalIsOpened,
    addTaskModalIsOpened: $addTaskModalIsOpened,
    newProjectName: $newProjectName,
    projectCreating: createProjectFx.pending,
    canAddTask: $canAddTask,
  }),
}
