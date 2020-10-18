import React from 'react'

type HeaderProps = {
  filter: string
  filterChanged: (filter: string) => void
  filterDisabled?: boolean
}

export const Header = (props: HeaderProps) => {
  const placeholderText = props.filterDisabled
    ? 'Выберите проект'
    : 'Название задачи'

  return (
    <header>
      <input
        disabled={props.filterDisabled}
        placeholder={placeholderText}
        value={props.filter}
        onChange={(e) => props.filterChanged(e.target.value)}
      />
    </header>
  )
}
