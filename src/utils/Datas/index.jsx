import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/fr' // Importez le module de localisation française
import utc from 'dayjs/plugin/utc' // Importez le plugin pour le fuseau horaire UTC
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(utc) // Ajoutez le plugin UTC à Day.js
dayjs.extend(customParseFormat)

// Utilisez la localisation française
dayjs.locale('fr')

export function useData() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = () => {
    const datas = JSON.parse(localStorage.getItem('todos'))

    if (datas) {
      setItems(datas)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteTask = (id) => {
    const remainingTasks = items.filter((task) => id !== task.id)
    setItems(remainingTasks)
    localStorage.setItem('todos', JSON.stringify(remainingTasks))
  }

  const editTask = (id, newName) => {
    const editedTaskList = items.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    })
    setItems(editedTaskList)
    localStorage.setItem('todos', JSON.stringify(editedTaskList))
  }

  const FormattedDateOfToday = dayjs().format('dddd D MMMM')

  const slideDone = (id, selectedDate) => {
    console.log('datas ici')
    const countTaskList = items.map((task) => {
      if (id === task.id) {
        //est ce que dateIsone inclut deja la date selectionné ? si oui retourné serie, sinon retourné serie + 1
        const countSerie = task.dateIsDone.includes(selectedDate)
          ? task.serie
          : (task.serie += 1)

        const newCount = task.dateIsDone.includes(selectedDate)
          ? task.totalTaskDone
          : task.totalTaskDone + 1

        const newDateIsDone = !task.dateIsDone.includes(selectedDate)
          ? [...task.dateIsDone, selectedDate]
          : task.dateIsDone
        if (!task.dateIsDone.includes(selectedDate)) {
        } else alert('Objectif déjà validé')

        const isValidated = task.dateIsDone.includes(selectedDate)
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

    setItems(countTaskList)
    localStorage.setItem('todos', JSON.stringify(countTaskList))
  }

  return {
    items,
    isLoading,
    getData,
    deleteTask,
    editTask,
    slideDone,
    setItems,
    FormattedDateOfToday,
  }
}
