import React from 'react'
import { ProjectDto } from '../../api/todo-api'
import styles from './styles.module.css'

type ProjectsListProps = {
  projects: ProjectDto[]
  projectSelected: (project: ProjectDto) => void
  selectedProject: ProjectDto | null
}

export const ProjectsList = (props: ProjectsListProps) => {
  return (
    <div className={styles.list}>
      <p>Проекты</p>
      <ul>
        {props.projects.map((p) => (
          <li
            key={p.id}
            className={
              p.id === props.selectedProject?.id
                ? styles.selected
                : styles.project
            }
            onClick={() => props.projectSelected(p)}
          >
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
