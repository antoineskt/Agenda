import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Button from '../../components/Button'

function AddHabitTwo() {
  const [inputValue, setInputValue] = useState()
  const [items, setItems] = useState([])

  function handleInput(e) {
    setInputValue(e.target.value)
  }

  function saveData() {
    if (inputValue !== '') {
      console.log('ok')
      setItems([...items, inputValue])
      localStorage.setItem('todos', JSON.stringify(items))
      setInputValue('')
    } else return console.log('pas de data entrée')
  }

  const deleteTodo = (text) => {
    const newTodos = items.filter((item) => {
      return item !== text
    })
    setItems(newTodos)
  }

  function Todo() {
    if (items.length > 0) {
      return (
        <ul>
          {items.map((item, index) => (
            <div>
              <li key={index}> {item} </li>
              <button
                onClick={() => {
                  deleteTodo(item)
                }}
              >
                delete
              </button>
            </div>
          ))}
        </ul>
      )
    } else return <div>no task again</div>
  }

  return (
    <div>
      <Header />
      <h1>Quel est votre habitude ? </h1>
      <input
        placeholder="écrivez ici"
        onChange={handleInput}
        value={inputValue}
      />
      <Button onClick={saveData}>VALIDER</Button>
      <Todo />
    </div>
  )
}

export default AddHabitTwo
