import React from 'react'
import { useGate, useStore } from 'effector-react'
import { todoModel } from './todo-model'
import { ProjectsList } from './components/projects-list'
import { Header } from './components/header'
import { Modal } from './components/modal'
import { AddProjectForm } from './components/add-project-form'
import { TasksList } from './components/tasks-list'
import styles from './app.module.css'

export const App = () => {
  useGate(todoModel.gate)

  const {
    projects,
    selectedProject,
    taskNameFilter,
    isLoading,
    addProjectModalIsOpened,
    newProjectName,
    projectCreating,
    canAddTask,
  } = useStore(todoModel.$store)

  const projectNotSelected = selectedProject === null

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="App">
      <Header
        filterDisabled={projectNotSelected}
        filter={taskNameFilter}
        canAddTask={canAddTask}
        filterChanged={(name) => todoModel.filterChanged(name)}
        addProjectClicked={() => todoModel.addProjectModalOpened()}
        addTaskClicked={() => todoModel.addTaskClicked()}
      />
      <Modal
        isOpened={addProjectModalIsOpened}
        modalClosed={() => todoModel.addProjectModalClosed()}
      >
        <AddProjectForm
          creating={projectCreating}
          name={newProjectName}
          nameChanged={(name) => todoModel.newProjectNameChanged(name)}
          addClicked={() => todoModel.addProjectClicked()}
        />
      </Modal>
      <div className={styles.main}>
        <ProjectsList
          projects={projects}
          projectSelected={(project) => todoModel.projectSelected(project)}
          selectedProject={selectedProject}
        />
        {projectNotSelected ? (
          <div>Выберите проект из списка слева</div>
        ) : (
          <div>
            <div>{selectedProject?.title}</div>
            <TasksList tasks={selectedProject?.taskDtos ?? []} />
          </div>
        )}
      </div>
    </div>
  )
}
