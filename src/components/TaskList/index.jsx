import React from 'react'
import Todo from '../../components/Todo'

function TaskList({ items, selectedDate, deleteTask, editTask, serieCount }) {
  //retourne un nv tablo d'une ou pls taches ayant la mm date que celle selectionné
  //on vérifie pr chaque tache si elle contient la date
  const filteredTasks = items.filter(
    (task) => task.date.includes(selectedDate) //Une des dates des taches inclut elle la date selectionné ?
  )
  //on map ce tableau d'une ou plusieurs taches
  const taskLists = filteredTasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      key={task.id}
      deleteTask={deleteTask}
      editTask={editTask}
      serieCount={serieCount}
      serie={task.serie}
    />
  ))

  return <>{taskLists}</>
}

export default TaskList
