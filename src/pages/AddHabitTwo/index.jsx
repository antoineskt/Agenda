import { useState } from 'react'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { nanoid } from 'nanoid'

const StyledContaineur = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function AddHabitTwo() {
  const [name, setName] = useState()

  function handleInput(e) {
    setName(e.target.value)
  }

  function saveData() {
    if (name !== '') {
      const newDatas = { id: `todo-${nanoid()}`, name, completed: false }
      const getDataFromLS = JSON.parse(localStorage.getItem('todos'))
      if (getDataFromLS) {
        const newDatasForLS = [...getDataFromLS, newDatas]
        localStorage.setItem('todos', JSON.stringify(newDatasForLS))
        setName('')
      } else {
        localStorage.setItem('todos', JSON.stringify(newDatas))
        setName('')
      }
    } else return console.log('pas de data entrée')
  }

  return (
    <div>
      <Header />
      <StyledContaineur>
        <h1>Quel est votre habitude ? </h1>
        <input
          placeholder="écrivez ici"
          onChange={handleInput}
          value={name}
          id="new-todo-input"
        />
        <Link to="/">
          <Button onClick={saveData}>VALIDER</Button>
        </Link>
      </StyledContaineur>
    </div>
  )
}

export default AddHabitTwo
