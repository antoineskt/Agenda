import React, { useState } from 'react'

export default function ToDo(props) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.editTask(props.id, newName)
    setNewName('')
    setEditing(false)
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={props.id}> New name for {props.name}</label>
        <input
          id={props.id}
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="button" onClick={() => setEditing(false)}>
          Cancel{' '}
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  )

  const normalTemplate = (
    <div>
      <div>
        <input
          type="checkbox"
          id="props.id"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label htmlFor={props.id}>{props.name}</label>
      </div>
      <div>
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button onClick={() => props.deleteTask(props.id)}>Delete</button>
      </div>
    </div>
  )
  return (
    <li className="todo">{isEditing ? editingTemplate : normalTemplate}</li>
  )
}
