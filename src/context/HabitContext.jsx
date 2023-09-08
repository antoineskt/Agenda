import { useState, useEffect } from 'react'
import { createContext } from 'react'
import dayjs from 'dayjs'
export const HabitContext = createContext()

const HabitProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('dddd D MMMM')
  )

  const getData = () => {
    const datas = JSON.parse(localStorage.getItem('todos'))
    if (datas) setItems(datas)
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteTask = (id) => {
    const remainingTasks = items.filter((task) => id !== task.id)
    setItems(remainingTasks)
    localStorage.setItem('todos', JSON.stringify(remainingTasks))
    getData()
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
  const createTask = (task, dataFromLs) => {
    if (dataFromLs) {
      const newDatasForLS = [...dataFromLs, task]
      localStorage.setItem('todos', JSON.stringify(newDatasForLS))
      setItems(newDatasForLS)
    } else {
      localStorage.setItem('todos', JSON.stringify([task]))
      setItems([task])
    }
  }

  const contextValues = {
    items,
    deleteTask,
    editTask,
    setItems,
    isLoading,
    setIsLoading,
    getData,
    selectedDate,
    setSelectedDate,
    createTask,
  }

  return (
    <HabitContext.Provider value={contextValues}>
      {children}
    </HabitContext.Provider>
  )
}

export default HabitProvider
