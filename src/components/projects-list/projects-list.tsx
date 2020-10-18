import React from 'react'
import { ProjectDto } from '../../api/todo-api'
import { todoModel } from '../../todo-model'

type ProjectsListProps = {
  projects: ProjectDto[]
}

export const ProjectsList = (props: ProjectsListProps) => {
  return (
    <div>
      <p>Проекты</p>
      <ul>
        {props.projects.map((p) => (
          <li key={p.id} onClick={() => todoModel.projectSelected(p.id)}>
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
