import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import DateSelectorTwo from '../../components/DateSelectorTwo'
import Input from '../../components/Input'
import ButtonDuray from '../../components/ButtonDuray'

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

  // Read the URL parameters on page load
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const habitName = params.get('habit')
    if (habitName) {
      setName(habitName)
    }
  }, [location])

  function handleInput(e) {
    setName(e.target.value)
  }

  function handleRepeatClick(numberOfWeek) {
    console.log('click')

    setSelectedDuration(numberOfWeek)
    const duration = numberOfWeek

    //si le state contient deja le chiffre du btn cliqué renvoyer 0 pour désactiver la couleur du btn
    if (selectedDuration && selectedDuration === numberOfWeek) {
      setSelectedDuration(0)
      setListOfRepeatedDate(null)
    }
    // si il y a bien une des dates séléctionnés et une durée :
    else if (selectedDate.length !== 0 && duration >= 1) {
      const repeatedDates = []
      console.log('repeteadates débuit : ' + repeatedDates)
      console.log('inside first condition')
      for (let i = 0; i < duration; i++) {
        console.log('inside boucle')
        repeatedDates.push(
          ...selectedDate.map(
            (day) => dayjs(day).add(i, 'week') //créer une répétion des dates sélectionnés
          )
        )
      }
      //on met dans le state final les dates répétés
      console.log('repeteddata : ' + repeatedDates)
      setListOfRepeatedDate(repeatedDates)
      console.log(repeatedDates.length)
    }
  }

  function saveData() {
    if (name !== '') {
      console.log('le name est ' + name)
      const formattedData = listOfRepeatedDate
        ? listOfRepeatedDate.map((day) => day.format('dddd D MMMM'))
        : selectedDate.map((day) => day.format('dddd D MMMM'))
      const newDatas = {
        id: `todo-${nanoid()}`,
        name: name,
        date: formattedData,
        totalDate: formattedData.length, //nombre de dates total pour cet objectif
        totalTaskDone: 0,
        serie: 0,
        dateIsDone: [], //tableau boolean pr chaque jour, si une date validé, true
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
      <NavBar />
      <StyledContaineur>
        <H2>Quel est votre objectif ? </H2>
        <Input onChange={handleInput} value={name} />
        <H2>Quels jours allez vous réaliser votre objectif ? </H2>
        <DateSelectorTwo
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

        <Link to="/">
          <Button onClick={saveData}>VALIDER</Button>
        </Link>
      </StyledContaineur>
    </div>
  )
}

export default AddHabitTwo
