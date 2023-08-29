import React from 'react'
import Todo from '../../components/Todo'

function TaskList({
  items,
  selectedDate,
  deleteTask,
  editTask,
  slideDone,
  showSlideButton,
  shouldBeFilteredByDate,
  addDateIsDone,
  FormattedDateOfToday,
  showCountToOne,
  showTotal,
}) {
  //retourne un nv tablo d'une ou pls taches ayant la mm date que celle selectionné
  //on vérifie pr chaque tache si elle contient la date
  const filteredTasks = shouldBeFilteredByDate //Si on affiche sur la page home, on filtre par date, si other, non
    ? items.filter(
        (task) => task.date.includes(selectedDate) //Une des dates des taches inclut elle la date selectionné ?
      )
    : items
  //on map ce tableau d'une ou plusieurs taches filtrés en fonction de la date selectionné
  const taskLists = filteredTasks.map((task) => (
    <Todo
      serie={task.serie}
      id={task.id}
      name={task.name}
      key={task.id}
      deleteTask={deleteTask}
      editTask={editTask}
      slideDone={slideDone}
      totalTaskDone={task.totalTaskDone}
      showSlideButton={showSlideButton}
      selectedDate={selectedDate}
      addDateIsDone={addDateIsDone}
      FormattedDateOfToday={FormattedDateOfToday}
      items={items}
      date={task.date}
      dateIsDone={task.dateIsDone}
      showCountToOne={showCountToOne}
      showTotal={showTotal}
    />
  ))

  return <>{taskLists}</>
}

export default TaskList
