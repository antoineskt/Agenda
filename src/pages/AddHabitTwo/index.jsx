import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  const handleDayClick = (day) => {
    const formattedDate = day.format('dddd D MMMM')

    if (selectedDate.length > 0) {
      console.log(selectedDate.length)
      if (selectedDate.length > 10) {
        console.log('length1 : ' + selectedDate)
        const multipleDate = [...[selectedDate], formattedDate]
        setSelectedDate(multipleDate)
      } else {
        const multipleDate = [...selectedDate, formattedDate]
        console.log(multipleDate)
        setSelectedDate(multipleDate)
      }
    } else {
      setSelectedDate(formattedDate)
    }
  }

  function handleInput(e) {
    setName(e.target.value)
  }

  function saveData() {
    if (name !== '') {
      console.log('le name est ' + name)
      const newDatas = {
        id: `todo-${nanoid()}`,
        name: name,
        date: selectedDate,
        serie: 0,
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
        <h2>Quand voulez vous suivre votre objectif ? </h2>
        <StyledContainerDaysButton>
          {weekdays.map((day) => (
            <StyledDaysButton
              type="button"
              onClick={() => handleDayClick(day)}
              key={day}
              isActive={
                selectedDate.length > 0 &&
                selectedDate.includes(day.format('dddd D MMMM'))
              }
            >
              {day.format('ddd')}
            </StyledDaysButton>
          ))}
        </StyledContainerDaysButton>

        <Link to="/">
          <Button onClick={saveData}>VALIDER</Button>
        </Link>
      </StyledContaineur>
    </div>
  )
}

export default AddHabitTwo
