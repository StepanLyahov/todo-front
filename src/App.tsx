import React from 'react'
import { useGate, useStore } from 'effector-react'
import { todoModel } from './todo-model'
import { ProjectsList } from './components/projects-list'
import { Header } from './components/header'
import { Task } from './components/task'

export const App = () => {
  useGate(todoModel.gate)

  const { projects, selectedProject, taskNameFilter, isLoading } = useStore(
    todoModel.$store
  )

  const projectNotSelected = selectedProject === null

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="App">
      <Header
        filterDisabled={projectNotSelected}
        filter={taskNameFilter}
        filterChanged={(name) => todoModel.filterChanged(name)}
      />
      <ProjectsList projects={projects} />
      {projectNotSelected ? (
        <div>Выберите проект из списка слева</div>
      ) : (
        <>
          <div>{selectedProject?.title}</div>
          <div>
            {selectedProject?.taskDtos.map((t) => (
              <Task key={t.id} task={t} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
