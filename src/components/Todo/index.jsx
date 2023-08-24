import React, { useState } from 'react'
import SlideButton from 'react-slide-button'
import styled from 'styled-components'
import './todo.css' //For set the black bg of swipe button

const StyledDiv = styled.div`
  margin: 20px;
  border: solid black 2px;
  text-align: center;
  @media (max-width: 768px) {
  }
`

const StyledLabel = styled.label`
  margin: 0px;
  padding: 0px;
  font-size: 3em;
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`

const StyledDivCount = styled.div`
  font-size: 1.2em;
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`

const StyledInputEditTemplate = styled.input`
  font-size: 3em;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const StyledButton = styled.button`
  margin: 20px;
  font-size: 2em;
  color: white;
  background-color: black;
  @media (max-width: 768px) {
    font-size: 1em;
  }
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
      <div>{props.selectedDate} </div>
      <StyledDivEditDeleteButton>
        <StyledButton type="button" onClick={() => setEditing(true)}>
          Edit
        </StyledButton>
        <StyledButton onClick={() => props.deleteTask(props.id)}>
          Delete
        </StyledButton>
      </StyledDivEditDeleteButton>
      {props.showSlideButton && (
        <SlideButton
          mainText="Swipe me"
          overlayText="Bravo"
          classList="my-class"
          caretClassList="my-caret-class"
          overlayClassList="my-overlay-class"
          reset={props.selectedDate}
          onSlideDone={() => {
            props.taskDoneCount(props.id, props.selectedDate)
          }}
        />
      )}
    </StyledDiv>
  )
  return (
    <div className="todo">{isEditing ? editingTemplate : normalTemplate}</div>
  )
}
