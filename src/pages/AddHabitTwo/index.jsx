import { useState, useEffect } from 'react'
import { createPath, useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'

dayjs.locale({
  ...fr,
  weekStart: 1,
})

const StyledContaineur = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledH1 = styled.h1`
  font-size: 3em;
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`

const StyledInput = styled.input`
  font-size: 2em;
  border-radius: 7px;
  border: 4px solid black;
`

const StyledContainerDaysButton = styled.div`
  font-size: 1.5em;
  margin-bottom: 2em;
`

const StyledDaysButton = styled.button`
  color: white;
  font-size: 1em;
  margin: 5px;
  width: 70px;
  height: 70px;
  border-radius: 30%;
  &:hover {
    background-color: #faca21;
  }
  background-color: ${({ isActive }) => (isActive ? 'hotpink' : 'black')};
`

function AddHabitTwo() {
  const [name, setName] = useState('')
  const [selectedDate, setSelectedDate] = useState([])
  const [selectedDuration, setSelectedDuration] = useState(null)

  // Read the URL parameters on page load
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const habitName = params.get('habit')
    if (habitName) {
      setName(habitName)
    }
  }, [location])

  const startOfWeek = dayjs().startOf('week')
  //semaine actuelle
  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  let formattedStateDay = []
  if (selectedDate.length >= 1) {
    formattedStateDay = selectedDate.map((day) => day.format('dddd D MMMM'))
    console.log('selected date formatted : ' + formattedStateDay)
  } else {
    console.log('pas encore')
  }
  console.log(formattedStateDay)

  const handleDayClick = (day) => {
    console.log('log de day : ' + day)
    console.log('log de selectedate.length : ' + selectedDate.length)
    const formattedClickDay = day.format('dddd D MMMM')

    console.log(formattedClickDay)

    if (
      selectedDate.length >= 1 &&
      formattedStateDay.includes(formattedClickDay)
    ) {
      console.log('deja des données et le MEME jour')
      setSelectedDate(
        selectedDate.filter(
          (day) => day.format('dddd D MMMM') !== formattedClickDay
        )
      ) //renvoie un tablo sans le jour séléctionné
    } else if (selectedDate.length >= 1) {
      console.log('deja des donnés mais pas le même jour')
      setSelectedDate([...selectedDate, day])
    } else {
      console.log('pas encore de donné dans le state')
      setSelectedDate([day])
    }
  }

  function handleInput(e) {
    setName(e.target.value)
  }

  function handleRepeatClick(numberOfWeek) {
    setSelectedDuration(numberOfWeek)
    console.log('click')
    // Capture the value of selectedDuration in a local variable
    const duration = numberOfWeek

    if (selectedDate.length !== 0) {
      const repeatedDates = []
      console.log('inside first condition')
      for (let i = 0; i < duration; i++) {
        console.log('inside boucle')
        console.log(selectedDate)
        console.log(typeof selectedDate)
        repeatedDates.push(
          ...selectedDate.map(
            (day) => dayjs(day).add(i, 'week') //ici il va falloir deformater la date avant
          )
        )
      }

      setSelectedDate(repeatedDates)
    }
  }

  function saveData() {
    if (name !== '') {
      console.log('le name est ' + name)
      const formattedData = selectedDate.map((day) => day.format('dddd D MMMM'))
      const newDatas = {
        id: `todo-${nanoid()}`,
        name: name,
        date: formattedData,
        serie: 0,
        total: 0,
      }
      const getDataFromLS = JSON.parse(localStorage.getItem('todos'))
      if (getDataFromLS) {
        const newDatasForLS = [...getDataFromLS, newDatas]
        console.log('log de newdatasForLS : ' + newDatasForLS)
        localStorage.setItem('todos', JSON.stringify(newDatasForLS))
        setName('')
      } else {
        console.log('log de newDatas : ' + JSON.stringify(newDatas))
        localStorage.setItem('todos', JSON.stringify([newDatas])) //je mets un tableau ici pr créer un tableau d'objets
        setName('')
      }
    } else return console.log('pas de data entrée')
  }

  return (
    <div>
      <Header />
      <StyledContaineur>
        <StyledH1>Quel est votre objectif ? </StyledH1>
        <StyledInput
          type="text"
          placeholder="écrivez ici"
          onChange={handleInput}
          value={name}
          id="new-todo-input"
          autoComplete="off"
        />
        <h2>Quel jours allez vous réaliser votre objectif ? </h2>
        <StyledContainerDaysButton>
          {weekdays.map((day) => (
            <StyledDaysButton
              type="button"
              onClick={() => handleDayClick(day)}
              key={day}
              isActive={
                selectedDate.length >= 1 &&
                formattedStateDay.includes(day.format('dddd D MMMM'))
              }
            >
              {day.format('ddd')}
            </StyledDaysButton>
          ))}
        </StyledContainerDaysButton>
        <div>
          <h2>
            Pendant combien de temps voulez vous réaliser votre objectif ?
          </h2>
          <button onClick={() => handleRepeatClick(1)}>Une semaine</button>
          <button onClick={() => handleRepeatClick(2)}>Deux semaines</button>
          <button onClick={() => handleRepeatClick(4)}>Un mois</button>
          <button onClick={() => handleRepeatClick(8)}>Deux mois</button>
        </div>

        <Link to="/">
          <Button onClick={saveData}>VALIDER</Button>
        </Link>
      </StyledContaineur>
    </div>
  )
}

export default AddHabitTwo
