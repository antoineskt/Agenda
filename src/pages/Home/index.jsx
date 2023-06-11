import styled from 'styled-components'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const HomeContainer = styled.div`
  margin: 0;
  height: 100vh;
`
const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const StyledDiv = styled.div`
  text-align: center;
  margin: 1em;
  font-size: 1.5em;
`

function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true) // New state variable

  const getData = async () => {
    const datas = await JSON.parse(localStorage.getItem('todos'))
    console.log(JSON.stringify(datas))
    if (datas) {
      setItems(datas)
    }
    setIsLoading(false) // Mark data loading as complete
  }

  useEffect(() => {
    getData()
  }, [])

  function TodoHomePage() {
    if (isLoading) {
      return <div>Loading...</div> // Display a loading message while data is being fetched
    }

    if (items.length === 0) {
      return <div>No items found.</div>
    }

    return (
      <ul>
        {items.map((item, index) => (
          <div>
            <li key={index}> {item} </li>
            <button
              key={`${item}-${index}`}
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
  }

  const deleteTodo = (text) => {
    const newTodos = items.filter((item) => {
      return item !== text
    })
    setItems(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  if (isLoading) {
    return <div>is loading..</div>
  } else {
    if (items.length !== 0) {
      console.log(
        'il y a des items ds le local storage, donc on affiche la page toDo'
      )

      return (
        <HomeContainer>
          <Header />
          <div>coucou</div>
          <TodoHomePage />
        </HomeContainer>
      )
    } else {
      return (
        <HomeContainer>
          <Header />
          <MainStyled>
            <StyledDiv>
              Crée une habitude personnalisée dès maintenant afin
              <br /> de suivre et d'accomplir tes objectifs :
            </StyledDiv>

            <Link to="/AddHabitOne">
              <Button>Click me!</Button>
            </Link>
          </MainStyled>
        </HomeContainer>
      )
    }
  }
}

export default Home
