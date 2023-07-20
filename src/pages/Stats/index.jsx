import styled from 'styled-components'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TodoStat from '../../components/TodoStat'

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
const StyledDivHomeWithNoData = styled.div`
  text-align: center;
  margin: 1em;
  font-size: 1.5em;
`

const StyledDivContainerNoData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UlTaskList = styled.div`
  text-align: center;
`

function Stats() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true) // New state variable

  const getData = () => {
    const datas = JSON.parse(localStorage.getItem('todos'))
    console.log('je log les datas(homepage) : ' + JSON.stringify(datas))
    if (datas) {
      setItems(datas)
    }
    setIsLoading(false) // Mark data loading as complete
  }

  useEffect(() => {
    getData()
  }, [])

  function deleteTask(id) {
    const remainingTasks = items.filter((task) => id !== task.id)
    setItems(remainingTasks)
    localStorage.setItem('todos', JSON.stringify(remainingTasks))
  }

  function editTask(id, newName) {
    const editedTaskList = items.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task
    })
    setItems(editedTaskList)
    localStorage.setItem('todos', JSON.stringify(editedTaskList))
  }

  function TodoStatPage() {
    if (isLoading) {
      return <div>Loading...</div> // Display a loading message while data is being fetched
    }

    if (items.length < 1) {
      return <div>No items found.</div>
    }
    console.log(typeof items) // ici items est un object mais il map qd mm ?

    const taskLists = items.map((task) => (
      <TodoStat
        id={task.id}
        name={task.name}
        key={task.id}
        deleteTask={deleteTask}
        editTask={editTask}
        serie={task.serie}
      />
    ))

    return (
      <div>
        <StyledDivContainerNoData>
          <UlTaskList>{taskLists}</UlTaskList>
        </StyledDivContainerNoData>
      </div>
    )
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

          <TodoStatPage />
        </HomeContainer>
      )
    } else {
      console.log(
        "pas d'items dans le local storage, on affiche la page d'accueil avec le bouton"
      )
      return (
        <HomeContainer>
          <Header />
          <MainStyled>
            <StyledDivHomeWithNoData>
              Il n'y a pas encore de statistiques, crée une habitude
              personnalisée dès maintenant afin
              <br /> de suivre et d'accomplir tes objectifs :
            </StyledDivHomeWithNoData>

            <Link to="/AddHabitOne">
              <Button>Click me!</Button>
            </Link>
          </MainStyled>
        </HomeContainer>
      )
    }
  }
}

export default Stats
