import styled from 'styled-components'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Todo from '../../components/Todo'

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

  function toggleTaskCompleted(id) {
    const updatedTasks = items.map((task) => {
      // si cette tâche possède le même identifiant que la tâche éditée
      if (id === task.id) {
        // on utilise la décomposition objet afin
        // de construire un nouvel objet dont la
        // propriété `completed` est l'inverse
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setItems(updatedTasks)
    localStorage.setItem('todos', JSON.stringify(updatedTasks))
  }

  function TodoHomePage() {
    if (isLoading) {
      return <div>Loading...</div> // Display a loading message while data is being fetched
    }

    if (items.length < 1) {
      return <div>No items found.</div>
    }
    console.log(typeof items) // ici items est un object mais il map qd mm ?
    const taskLists = items.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        key={task.id}
        deleteTask={deleteTask}
        editTask={editTask}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
      />
    ))

    return (
      <div>
        <ul>{taskLists}</ul>
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

          <TodoHomePage />
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
