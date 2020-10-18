import React from 'react'

type AddProjectFormProps = {
  name: string
  nameChanged: (name: string) => void
  addClicked: () => void
  creating: boolean
}

export const AddProjectForm = (props: AddProjectFormProps) => {
  const formSubmitted = (e: React.FormEvent) => {
    if (props.creating) {
      return
    }

    e.preventDefault()
    props.addClicked()
  }

  return (
    <form onSubmit={formSubmitted}>
      <input
        disabled={props.creating}
        value={props.name}
        onChange={(e) => props.nameChanged(e.target.value)}
      />
      <button disabled={props.creating}>Добавить</button>
    </form>
  )
}
