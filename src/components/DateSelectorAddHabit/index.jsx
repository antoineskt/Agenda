import React, { useContext } from 'react'
import DaysOfWeek from '../DaysOfWeek'
import { weekdays } from '../../utils/functionDate'
import { HabitContext } from '../../context/HabitContext'

export function DateSelectorAddHabit({ setSelectedDate, selectedDate }) {
  const { items } = useContext(HabitContext)
  //tableau de date sélectionné au bon format lors de l'ajouts d'objectifs (pas utile ds home du coup)
  let arrayOfSelectedDateRightFormat = []
  if (selectedDate && selectedDate.length >= 1) {
    arrayOfSelectedDateRightFormat = selectedDate.map((day) =>
      day.format('dddd D MMMM')
    )
  }
  console.log(arrayOfSelectedDateRightFormat)

  const handleDayClick = (day) => {
    const formattedClickDay = day.format('dddd D MMMM')

    if (
      selectedDate.length >= 1 &&
      arrayOfSelectedDateRightFormat.includes(formattedClickDay)
    ) {
      //renvoie un tableau sans le jour séléctionné
      //permet la deselection d'une date
      setSelectedDate(
        selectedDate.filter(
          (day) => day.format('dddd D MMMM') !== formattedClickDay
        )
      )
    } //sinon on ajoute normalement la nouvelle date cliqué au dates existantes
    else if (selectedDate.length >= 1) {
      setSelectedDate([...selectedDate, day])
    } //on ajoute simplement la date selectionné car il n'y en a pas encore
    else {
      setSelectedDate([day])
    }
  }

  return (
    <DaysOfWeek
      weekdays={weekdays}
      handleDayClick={handleDayClick}
      selectedDate={selectedDate}
      arrayOfSelectedDateRightFormat={arrayOfSelectedDateRightFormat}
      items={items}
    />
  )
}
