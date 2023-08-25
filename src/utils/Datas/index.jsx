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
  const currentDate = dayjs() //date actuelle
  const currentYear = dayjs().year() // gets current year
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

  const taskDoneCount = (id, selectedDate) => {
    const countTaskList = items.map((task) => {
      if (id === task.id) {
        // Créer un objet associant les noms des mois à leurs indices numériques
        var correspondanceMois = {
          janvier: 1,
          février: 2,
          mars: 3,
          avril: 4,
          mai: 5,
          juin: 6,
          juillet: 7,
          août: 8,
          septembre: 9,
          octobre: 10,
          novembre: 11,
          décembre: 12,
        }

        //on recupere le chiffre du jour dans selectedDate
        const recupchiffre = selectedDate.match(/\d+/)[0]
        const chiffreJour = `${recupchiffre}`

        //récup le mois
        let texte = selectedDate
        var mots = texte.split(' ')
        var troisiemeMot = mots[2]

        //récup le chiffre du mois
        const chiffreMois = correspondanceMois[troisiemeMot]

        const response = `${currentYear}-${chiffreMois}-${chiffreJour}`
        console.log(response)

        //si la date selectionné est après la date du jour, on retourne une alert
        if (!currentDate.isAfter(response)) {
          alert('vous ne pouvez pas valider une date futur')
        } else {
          alert('la date est antérieur, ok')
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
            alert('Félicitations vous avez accompli votre objectif')
          } else alert('Objectif déjà validé')

          return {
            ...task,
            totalTaskDone: newCount,
            dateIsDone: newDateIsDone,
            serie: countSerie,
          }
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
    taskDoneCount,
    setItems,
  }
}
