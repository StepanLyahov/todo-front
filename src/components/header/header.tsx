import React from 'react'
import styles from './styles.module.css'

type HeaderProps = {
  filter: string
  filterChanged: (filter: string) => void
  addProjectClicked: () => void
  filterDisabled?: boolean
  canAddTask: boolean
  addTaskClicked: () => void
}

export const Header = (props: HeaderProps) => {
  const placeholderText = props.filterDisabled
    ? 'Выберите проект'
    : 'Название задачи'

  return (
    <header className={styles.appHeader}>
      <button type="button" onClick={props.addProjectClicked}>
        Добавить проект
      </button>
      <input
        disabled={props.filterDisabled}
        placeholder={placeholderText}
        value={props.filter}
        onChange={(e) => props.filterChanged(e.target.value)}
      />
      <div />
      <button disabled={!props.canAddTask} onClick={props.addTaskClicked}>
        +
      </button>
    </header>
  )
}
