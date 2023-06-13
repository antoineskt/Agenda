import { useState } from 'react'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledContaineur = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function AddHabitTwo() {
  const [inputValue, setInputValue] = useState()
  const [items, setItems] = useState([])

  function handleInput(e) {
    setInputValue(e.target.value)
  }

  function saveData() {
    if (inputValue !== '') {
      const newDatas = [...items, inputValue]
      setItems([...items, inputValue])
      localStorage.setItem('todos', JSON.stringify(newDatas))
      setInputValue('')
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
          value={inputValue}
        />
        <Link to="/">
          <Button onClick={saveData}>VALIDER</Button>
        </Link>
      </StyledContaineur>
    </div>
  )
}

export default AddHabitTwo
