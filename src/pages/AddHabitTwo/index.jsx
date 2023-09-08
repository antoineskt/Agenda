import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'

import ButtonDuray from '../../components/ButtonDuray'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useContext } from 'react'
import { HabitContext } from '../../context/HabitContext'
import { DateSelectorAddHabit } from '../../components/DateSelectorAddHabit'

dayjs.locale({
  ...fr,
  weekStart: 1,
})

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DivButtonDuray = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 40px;
`

const H2 = styled.h2`
  @media (max-width: 768px) {
    text-align: center;
    font-size: 1em;
  }
`

function AddHabitTwo() {
  const [name, setName] = useState('')
  const [selectedDate, setSelectedDate] = useState([])
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [listOfRepeatedDate, setListOfRepeatedDate] = useState(null)
  const { createTask } = useContext(HabitContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Read the URL parameters on page load
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const habitName = params.get('habit')
    if (habitName) {
      setName(habitName)
    }
  }, [location])

  function handleName(e) {
    setName(e.target.value)
  }

  function handleRepeatClick(numberOfWeek) {
    setSelectedDuration(numberOfWeek)
    console.log(selectedDuration)
    //si le state contient deja le chiffre du btn cliqué renvoyer 0 pour désactiver la couleur du btn
    if (selectedDuration && selectedDuration === numberOfWeek) {
      setSelectedDuration(0)
      setListOfRepeatedDate(null)
    }
    // si il y a bien une des dates séléctionnés et une durée :
    else if (selectedDate.length !== 0 && numberOfWeek >= 1) {
      const repeatedDates = []

      for (let i = 0; i < numberOfWeek; i++) {
        repeatedDates.push(
          ...selectedDate.map(
            (day) => dayjs(day).add(i, 'week') //créer une répétion des dates sélectionnés
          )
        )
      }
      //on met dans le state final les dates répétés
      setListOfRepeatedDate(repeatedDates)
    }
  }

  function saveData(e) {
    e.preventDefault()
    if (selectedDate.length < 1 || !selectedDuration)
      return alert('Veuillez indiquer des jours et une période')

    const formattedData = listOfRepeatedDate
      ? listOfRepeatedDate.map((day) => day.format('dddd D MMMM'))
      : selectedDate.map((day) => day.format('dddd D MMMM'))

    const newDatas = {
      id: `todo-${nanoid()}`,
      name,
      date: formattedData,
      totalDate: formattedData.length, //nombre de dates total pour cet objectif
      totalTaskDone: 0,
      serie: 0,
      dateIsDone: [], //tableau boolean pr chaque jour, si une date validé, true
    }
    const getDataFromLS = JSON.parse(localStorage.getItem('todos'))
    createTask(newDatas, getDataFromLS)
    navigate('/')
  }

  return (
    <div>
      <StyledForm onSubmit={(e) => saveData(e)}>
        <label htmlFor="new-todo-input">
          <H2>Quel est votre objectif ? </H2>
        </label>
        <Input
          onChange={(e) => handleName(e)}
          value={name}
          id={'new-todo-input'.toString()}
        />
        <H2>Quels jours allez vous réaliser votre objectif ? </H2>
        <DateSelectorAddHabit
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        <div>
          <H2>
            Pendant combien de temps voulez vous réaliser votre objectif ?
          </H2>
          <DivButtonDuray>
            <ButtonDuray
              isSelected={selectedDuration ? selectedDuration === 1 : false}
              onClick={() => handleRepeatClick(1)}
            >
              Une semaine
            </ButtonDuray>
            <ButtonDuray
              isSelected={selectedDuration ? selectedDuration === 2 : false}
              onClick={() => handleRepeatClick(2)}
            >
              Deux semaines
            </ButtonDuray>
            <ButtonDuray
              isSelected={selectedDuration ? selectedDuration === 4 : false}
              onClick={() => handleRepeatClick(4)}
            >
              Un mois
            </ButtonDuray>
            <ButtonDuray
              isSelected={selectedDuration ? selectedDuration === 8 : false}
              onClick={() => handleRepeatClick(8)}
            >
              Deux mois
            </ButtonDuray>
          </DivButtonDuray>
        </div>

        <Button type="submit">VALIDER</Button>
      </StyledForm>
    </div>
  )
}

export default AddHabitTwo
