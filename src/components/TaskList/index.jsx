import React, { useContext } from 'react'
import Todo from '../../components/Todo'
import { HabitContext } from '../../context/HabitContext'

function TaskList({
  selectedDateFormatted,
  shouldBeFilteredByDate,
  showSlideButton,
  dontShowCounterToOne,
  showTotal,
}) {
  const { items } = useContext(HabitContext)
  //retourne un nv tablo d'une ou pls taches ayant la mm date que celle selectionné
  //on vérifie pr chaque tache si elle contient la date
  const filteredTasks = shouldBeFilteredByDate //Si on affiche sur la page home, on filtre par date, si other, non
    ? items.filter(
        (task) => task.date.includes(selectedDateFormatted) //Une des dates des taches inclut elle la date selectionné ?
      )
    : items
  //on map ce tableau d'une ou plusieurs taches filtrés en fonction de la date selectionné
  const taskLists = filteredTasks.map((task) => (
    <Todo
      serie={task.serie}
      id={task.id}
      name={task.name}
      totalTaskDone={task.totalTaskDone}
      showTotal={showTotal}
      dateIsDone={task.dateIsDone}
      showSlideButton={showSlideButton}
      dontShowCounterToOne={dontShowCounterToOne}
    />
  ))

  return <>{taskLists}</>
}

export default TaskList
