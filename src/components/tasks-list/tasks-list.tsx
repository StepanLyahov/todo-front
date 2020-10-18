import React from 'react'
import { TaskDto } from '../../api/todo-api'
import { Task } from '../task'

type TasksListProps = {
  tasks: TaskDto[]
}

export const TasksList = (props: TasksListProps) => {
  const isEmpty = !props.tasks.length

  return (
    <div>
      {isEmpty ? (
        <div>Задач нет</div>
      ) : (
        props.tasks.map((t) => <Task key={t.id} task={t} />)
      )}
    </div>
  )
}
