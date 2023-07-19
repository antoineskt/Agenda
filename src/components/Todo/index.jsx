import React, { useState } from 'react'
import SlideButton from 'react-slide-button'
import styled from 'styled-components'
import './todo.css'

const StyledDiv = styled.div`
  margin: 20px;
  border: solid black 2px;
`

const StyledLabel = styled.label`
  margin: 20px;
  font-size: 3em;
`

const StyledInput = styled.input`
  height: 0;
  width: 0;
  > * &[type='checkbox'] {
    box-sizing: border-box;
    top: 20px;
    left: 20px;
    width: 44px;
    height: 44px;
  }
  &:checked + ${StyledLabel}::after {
    opacity: 1;
  }
`
const StyledDivCheckBox = styled.div`
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.25;
  display: block;
  position: relative;
  min-height: 44px;
  padding-left: 40px;

  > ${StyledLabel} {
    &:before {
      box-sizing: border-box;
      top: 20px;
      left: 20px;
      width: 44px;
      height: 44px;

      content: '';
      position: absolute;
      border: 2px solid currentcolor;
      background: transparent;
    }
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    display: inline-block;
    margin-bottom: 0;
    padding: 8px 15px 5px;
    cursor: pointer;
    touch-action: manipulation;

    &:after {
      box-sizing: content-box;
      content: '';
      position: absolute;
      top: 33px;
      left: 33px;
      width: 18px;
      height: 7px;
      transform: rotate(-45deg);
      border: solid;
      border-width: 0 0 5px 5px;
      border-top-color: transparent;
      opacity: 0;
      background: transparent;
    }
  }

  > ${StyledInput} {
    &[type='checkbox'] {
      box-sizing: border-box;
      top: 20px;
      left: 20px;
      width: 44px;
      height: 44px;

      cursor: pointer;
      position: absolute;
      z-index: 1;
      margin: 0;
      opacity: 0;
    }
  }
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
      <StyledDivCheckBox>
        <StyledInput
          type="checkbox"
          id={props.id}
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <StyledLabel htmlFor={props.id}>{props.name}</StyledLabel>
      </StyledDivCheckBox>
      <StyledDivEditDeleteButton>
        <StyledButton type="button" onClick={() => setEditing(true)}>
          Edit
        </StyledButton>
        <StyledButton onClick={() => props.deleteTask(props.id)}>
          Delete
        </StyledButton>
      </StyledDivEditDeleteButton>
      <SlideButton
        mainText="Swipe me"
        overlayText="Bravo"
        classList="my-class"
        caretClassList="my-caret-class"
        overlayClassList="my-overlay-class"
        onSlideDone={function () {
          console.log('Done!')
        }}
      />
    </StyledDiv>
  )
  return (
    <div className="todo">{isEditing ? editingTemplate : normalTemplate}</div>
  )
}
