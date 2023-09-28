import React, { useContext } from 'react'
import DaysOfWeek from '../DaysOfWeek'
import { formattedDateOfToday, weekdays } from '../../utils/functionDate'
import { HabitContext } from '../../context/HabitContext'

const DateSelectorHome = ({
  setselectedDateFormatted,
  selectedDateFormatted,
}) => {
  const { setItems, items, isAdateFuture, setitsAfutureDate } =
    useContext(HabitContext)

  const handleDayClick = (day) => {
    const formattedDate = day.format('dddd D MMMM') //date selectionné formaté
    setselectedDateFormatted(formattedDate)

    const formattedDataForCompair = day.format('YYYY-MM-DD')

    // Vérifiez si la date est future
    const isFutureDate = isAdateFuture(formattedDataForCompair)
    setitsAfutureDate(isFutureDate)

    const isAserie = items.map((task) => {
      //si l'on clique sur un date future, cela retourne rien
      if (
        task.date.indexOf(formattedDateOfToday) <
        task.date.indexOf(formattedDate)
      ) {
        return task
      } else {
        //vérification si c'est une série ou pas ?
        if (task.dateIsDone.length >= 1 && task.date.includes(formattedDate)) {
          const indexDateOfTheDay = task.date.indexOf(formattedDateOfToday)
          const arrayOfDateWithoutFuturDate = task.date.slice(
            0,
            indexDateOfTheDay + 1
          )
          console.log(arrayOfDateWithoutFuturDate)
          if (
            task.totalTaskDone >= 2 &&
            task.totalTaskDone === arrayOfDateWithoutFuturDate.length
          ) {
            return { ...task, serie: task.totalTaskDone }
          } else {
            const indexDateBefore = task.date.indexOf(formattedDate) - 1

            const indexDateAfter = task.date.indexOf(formattedDate) + 1

            const serieOrNot =
              // est ce que le jour d'avant celui cliqué ds task.date est égal à la derniere date de task.dateIsDone ?
              task.dateIsDone.includes(task.date[indexDateBefore]) ||
              // OU si le jour d'après celui cliqué ds task.date est égal au jour d'après selectedate de task.dateIsDone ?
              task.dateIsDone.includes(task.date[indexDateAfter])
                ? task.serie
                : (task.serie = 0)

            return { ...task, serie: serieOrNot }
          }
        }
      }

      return task
    })
    setItems(isAserie)
    localStorage.setItem('todos', JSON.stringify(isAserie))
  }

  return (
    <DaysOfWeek
      weekdays={weekdays}
      handleDayClick={handleDayClick}
      selectedDateFormatted={selectedDateFormatted}
      items={items}
    />
  )
}

export default DateSelectorHome
