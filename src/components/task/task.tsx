import React from 'react'
import { TaskDto } from '../../api/todo-api'

type TaskProps = {
  task: TaskDto
}

export const Task = (props: TaskProps) => {
  return (
    <div>
      <div>{props.task.title}</div>
      <div>{props.task.description}</div>
    </div>
  )
}
