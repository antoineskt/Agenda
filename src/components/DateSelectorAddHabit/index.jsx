import React, { useContext } from 'react'
import DaysOfWeek from '../DaysOfWeek'
import { weekdays } from '../../utils/functionDate'
import { HabitContext } from '../../context/HabitContext'

export function DateSelectorAddHabit({
  setselectedDateFormatted,
  selectedDateFormatted,
}) {
  const { items } = useContext(HabitContext)

  //ajoute les dates cliqués sélectionnés au bon format dans un tableau
  let arrayOfselectedDateFormattedRightFormat = []
  if (selectedDateFormatted && selectedDateFormatted.length >= 1) {
    arrayOfselectedDateFormattedRightFormat = selectedDateFormatted.map((day) =>
      day.format('dddd D MMMM')
    )
  }

  const handleDayClick = (day) => {
    const formattedClickDay = day.format('dddd D MMMM')
    if (
      selectedDateFormatted.length >= 1 &&
      arrayOfselectedDateFormattedRightFormat.includes(formattedClickDay)
    ) {
      //renvoie un tableau sans le jour séléctionné
      //permet la deselection d'une date
      setselectedDateFormatted(
        selectedDateFormatted.filter(
          (day) => day.format('dddd D MMMM') !== formattedClickDay
        )
      )
    }
    //sinon on ajoute normalement la nouvelle date cliqué au dates existantes
    else if (selectedDateFormatted.length >= 1) {
      setselectedDateFormatted([...selectedDateFormatted, day])
    } //on ajoute simplement la date selectionné car il n'y en a pas encore
    else {
      setselectedDateFormatted([day])
    }
  }

  return (
    <DaysOfWeek
      weekdays={weekdays}
      handleDayClick={handleDayClick}
      selectedDateFormatted={selectedDateFormatted}
      arrayOfselectedDateFormattedRightFormat={
        arrayOfselectedDateFormattedRightFormat
      }
      items={items}
    />
  )
}
