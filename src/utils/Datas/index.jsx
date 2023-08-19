import { useState, useEffect } from 'react'

export function useData() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = () => {
    const datas = JSON.parse(localStorage.getItem('todos'))
    console.log('je log les datas(homepage) : ' + JSON.stringify(datas))
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

  const serieCount = (id) => {
    alert('Félicitations vous avez accompli votre objectif')
    const serieTaskList = items.map((task) => {
      if (id === task.id) {
        const newCount = task.serie + 1
        return { ...task, serie: newCount }
      }
      return task
    })

    setItems(serieTaskList)
    localStorage.setItem('todos', JSON.stringify(serieTaskList))
  }

  return { items, isLoading, getData, deleteTask, editTask, serieCount }
}
