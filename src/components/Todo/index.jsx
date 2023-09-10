import React, { useContext, useState } from 'react'
import SlideButton from 'react-slide-button'
import styled from 'styled-components'
import './todo.css' //For set the black bg of swipe button
import CongratsCard from '../CongratsCard'
import { HabitContext } from '../../context/HabitContext'
import { isAfutureDate } from '../../utils/functionDate/index'

const svgEdit = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="15"
    viewBox="0 0 8 8"
    width="15"
    fill="rgb(237, 230, 218)"
  >
    <path d="m6 0-1 1 2 2 1-1zm-2 2-4 4v2h2l4-4z" />
  </svg>
)

const svgTrash = (
  <svg
    height="15"
    width="15"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="rgb(237, 230, 218)"
  >
    <path d="m32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-336h-384zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm320-176h-120l-9.4-18.7a24 24 0 0 0 -21.5-13.3h-114.3a23.72 23.72 0 0 0 -21.4 13.3l-9.4 18.7h-120a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z" />
  </svg>
)

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: solid black 2px;
  text-align: center;
  background-color: #1a1a1a;
  border-radius: 24px;
  border-bottom-width: 0px;
  border-color: rgb(41, 41, 41);
  border-left-width: 0px;
  border-right-width: 0px;
  border-style: solid;
  border-top-width: 1px;
  opacity: 1;

  @media (max-width: 768px) {
  }
`
const DivTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const DivLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 250px;
  @media (max-width: 768px) {
    margin-right: 20px;
  }
`

const StyledLabel = styled.label`
  margin: 0px;
  padding: 0px;
  font-size: ${(props) => (props.editTemplate ? '1em' : '2.5em')};

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`

const DivRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const DivCountFires = styled.div`
  font-size: 0.7em;
  @media (max-width: 768px) {
    font-size: 0.5em;
  }
`

const StyledInputEditTemplate = styled.input`
  @media (max-width: 768px) {
  }
`

const StyledButton = styled.button`
  background: none;
  border: none;
  color: white;
  @media (max-width: 768px) {
  }
`

const DivCountToOne = styled.div`
  font-size: 2em;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const DivEditDeleteButton = styled.div`
  display: flex;
  justify-content: center;
`

export default function ToDo({
  id,
  date,
  dateIsDone,
  name,
  serie,
  totalTaskDone,
  showSlideButton,
}) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const [isCongratsPage, setisCongratsPage] = useState(false)
  const { items, deleteTask, setItems, editTask, selectedDateFormatted } =
    useContext(HabitContext)

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    editTask(id, newName)
    setNewName('')
    setEditing(false)
  }

  //est ce validé ?
  const isValidate = ({ dateIsDone, selectedDateFormatted }) => {
    if (dateIsDone.includes(selectedDateFormatted)) {
      return true
    } else return false
  }

  const slideDone = (id, selectedDateFormatted) => {
    console.log('datas ici')

    const countTaskList = items.map((task) => {
      //
      if (id === task.id) {
        //est ce que dateIsone inclut deja la date selectionné ? si oui retourné serie, sinon retourné serie + 1
        const countSerie = dateIsDone.includes(selectedDateFormatted)
          ? serie
          : (serie += 1)

        const newCount = dateIsDone.includes(selectedDateFormatted)
          ? totalTaskDone
          : totalTaskDone + 1

        const newDateIsDone = !dateIsDone.includes(selectedDateFormatted)
          ? [...dateIsDone, selectedDateFormatted]
          : dateIsDone
        if (!dateIsDone.includes(selectedDateFormatted)) {
        } else alert('Objectif déjà validé')

        const isValidated = dateIsDone.includes(selectedDateFormatted)
          ? true
          : false

        return {
          ...task,
          totalTaskDone: newCount,
          dateIsDone: newDateIsDone,
          serie: countSerie,
          isValidated: isValidated,
        }
      }
      return task
    })
    console.log(countTaskList)
    setItems(countTaskList)
    localStorage.setItem('todos', JSON.stringify(countTaskList))
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <StyledDiv>
        <StyledLabel editTemplate={true} htmlFor={id}>
          Nouveau nom pour "{name}" :
        </StyledLabel>
        <StyledInputEditTemplate
          id={id}
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
      <DivTop>
        <DivLeft>
          <StyledLabel htmlFor={id}>{name}</StyledLabel>
        </DivLeft>
        <DivRight>
          {/* Partout sauf dans les dates futurs */}
          {!isAfutureDate({ serie, date }) && (
            <DivCountFires>🔥{serie} Jours</DivCountFires>
          )}

          <DivCountToOne>
            {/* Juste dans la homePage */}
            {isValidate({ dateIsDone, selectedDateFormatted }) ? 1 : 0}/1
          </DivCountToOne>

          <div>
            {/* statistique et calendridren */} Total : {totalTaskDone}{' '}
          </div>

          <DivEditDeleteButton>
            <StyledButton type="button" onClick={() => setEditing(true)}>
              {svgEdit}
            </StyledButton>
            <StyledButton onClick={() => deleteTask(id)}>
              {svgTrash}
            </StyledButton>
          </DivEditDeleteButton>
        </DivRight>
      </DivTop>
      <div>
        {!isAfutureDate({ selectedDateFormatted, date }) && //Afficher le SlideButton uniquement si c pas une date future
          showSlideButton && //et que la props showButton est passe et que la date selectionné n'a pas été deja validé
          !dateIsDone.includes(selectedDateFormatted) && (
            <SlideButton
              mainText="Swipe me"
              overlayText="Bravo"
              classList="my-class"
              caretClassList="my-caret-class"
              overlayClassList="my-overlay-class"
              reset={selectedDateFormatted}
              onSlideDone={() => {
                slideDone(id, selectedDateFormatted)
                setisCongratsPage(true)
              }}
            />
          )}
      </div>
    </StyledDiv>
  )
  return (
    <div>
      {isEditing ? editingTemplate : normalTemplate}
      {isCongratsPage && (
        <CongratsCard
          serie={serie}
          totalTaskDone={totalTaskDone}
          name={name}
          setisCongratsPage={setisCongratsPage}
          isCongratsPage={isCongratsPage}
        />
      )}
    </div>
  )
}
