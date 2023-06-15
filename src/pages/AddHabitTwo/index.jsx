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

  function handleInput(e) {
    setInputValue(e.target.value)
  }

  const saveData = () => {
    if (inputValue !== '') {
      const getDatasFromLocalStorage = JSON.parse(localStorage.getItem('todos'))
      if (getDatasFromLocalStorage) {
        console.log('je log getdata : ' + getDatasFromLocalStorage)
        const newDatas = [...getDatasFromLocalStorage, inputValue]
        console.log(' je log newdatas : ' + newDatas)
        localStorage.setItem('todos', JSON.stringify(newDatas))
        setInputValue('')
      } else {
        const newData = [inputValue]
        console.log('je log newData : ' + newData)
        localStorage.setItem('todos', JSON.stringify(newData))
        setInputValue('')
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
