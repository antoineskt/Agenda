import React, { useState } from 'react'

import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 20px;
  border: solid black 2px;
`

const StyledLabel = styled.label`
  margin: 20px;
  font-size: 3em;
`

const StyledDivCount = styled.div`
  font-size: 1.2em;
`

const StyledInputEditTemplate = styled.input`
  font-size: 3em;
`

const StyledButton = styled.button`
  margin: 20px;
  font-size: 2em;
  color: white;
  background-color: black;
`

const StyledDivEditDeleteButton = styled.div`
  display: flex;
  justify-content: center;
`

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
      <StyledDiv>
        <StyledLabel htmlFor={props.id}>
          Nouveau nom pour "{props.name}" :
        </StyledLabel>
        <StyledInputEditTemplate
          id={props.id}
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledButton type="button" onClick={() => setEditing(false)}>
          Cancel{' '}
        </StyledButton>
        <StyledButton type="submit">Save</StyledButton>
      </StyledDiv>
    </form>
  )

  const normalTemplate = (
    <StyledDiv>
      <StyledDivCount>🔥 {props.serie} Jours</StyledDivCount>

      <StyledLabel htmlFor={props.id}>{props.name}</StyledLabel>

      <StyledDivEditDeleteButton>
        <StyledButton type="button" onClick={() => setEditing(true)}>
          Edit
        </StyledButton>
        <StyledButton onClick={() => props.deleteTask(props.id)}>
          Delete
        </StyledButton>
      </StyledDivEditDeleteButton>
    </StyledDiv>
  )
  return (
    <div className="todo">{isEditing ? editingTemplate : normalTemplate}</div>
  )
}
