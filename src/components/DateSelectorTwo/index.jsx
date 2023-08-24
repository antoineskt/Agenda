import React from 'react'
import dayjs from 'dayjs'
import DaysOfWeek from '../DaysOfWeek'

const DateSelectorTwo = ({
  setSelectedDate,
  selectedDate,
  isHome,
  items,
  setItems,
}) => {
  const startOfWeek = dayjs().startOf('week')

  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  let formattedStateDay = []
  if (selectedDate && selectedDate.length >= 1) {
    formattedStateDay = selectedDate.map((day) => day.format('dddd D MMMM'))
  } else {
  }

  const handleDayClick = (day) => {
    const formattedClickDay = day.format('dddd D MMMM')

    // si c'est la page home :
    if (isHome === true) {
      const formattedDate = day.format('dddd D MMMM')
      setSelectedDate(formattedDate)
      console.log(items)
      const isAserie = items.map((task) => {
        if (task.dateIsDone.length >= 1 && task.date.includes(formattedDate)) {
          const indexDateBefore = task.date.indexOf(formattedDate) - 1
          console.log(indexDateBefore)
          const indexDateIsDoneBefore =
            task.dateIsDone.indexOf(formattedDate) - 1
          console.log(indexDateIsDoneBefore)
          const indexDateAfter = task.date.indexOf(formattedDate) + 1
          console.log(indexDateAfter)
          const indexDateIsDoneAfter =
            task.dateIsDone.indexOf(formattedDate) + 1
          console.log(indexDateIsDoneAfter)
          const serieOrNot =
            // est ce que le jour d'avant celui cliqué ds task.date est égal à la derniere date de task.dateIsDone ?

            task.dateIsDone.includes(task.date[indexDateBefore]) ||
            // OU si le jour d'après celui cliqué ds task.date est égal au jour d'après selectedate de task.dateIsDone ?
            task.dateIsDone.includes(task.date[indexDateAfter])
              ? task.serie
              : (task.serie = 0)
          console.log('serie or not : ' + serieOrNot)
          return { ...task, serie: serieOrNot }
        }
        console.log("condition nn valide j'affiche task : " + task)
        return task
      })
      setItems(isAserie)
      localStorage.setItem('todos', JSON.stringify(isAserie))
    }
    //si ça n'est pas la page home(pageHabits) :
    else if (
      selectedDate.length >= 1 &&
      formattedStateDay.includes(formattedClickDay)
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
      formattedStateDay={formattedStateDay}
      items={items}
    />
  )
}

export default DateSelectorTwo
