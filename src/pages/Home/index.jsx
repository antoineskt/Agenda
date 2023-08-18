import styled from 'styled-components'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Todo from '../../components/Todo'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'

dayjs.locale({
  ...fr,
  weekStart: 1,
})

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
  font-size: 3em;
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`
const StyledDivContainerNoData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledDaysButton = styled.button`
  color: white;
  background-color: black;
  font-size: 1.5em;
  margin: 5px;
  width: 70px;
  height: 70px;
  border-radius: 30%;
  &:hover {
    background-color: #faca21;
  }
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 0.8em;
    margin: 3px;
    width: 40px;
    height: 40px;
  }
`

const StyledDivOfCurrentDay = styled.div`
  text-align: center;
  margin: 1em;
  font-size: 1.5em;
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const UlTaskList = styled.div`
  text-align: center;
`

function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true) // New state variable
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('dddd D MMMM')
  ) // Initialize with the current date)

  const startOfWeek = dayjs().startOf('week')

  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  const handleDayClick = (day) => {
    const formattedDate = day.format('dddd D MMMM')

    setSelectedDate(formattedDate)
  }

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

  function serieCount(id) {
    alert('Félicitations vous avez accomplis votre objectif')
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

  function TodoHomePage() {
    if (isLoading) {
      return <div>Loading...</div> // Display a loading message while data is being fetched
    }

    if (items.length < 1) {
      return <div>No items found.</div>
    }
    console.log(typeof items) // ici items est un object mais il map qd mm ?

    //retourne un nv tablo d'une ou pls taches ayant la mm date que celle selectionné
    //on vérifie pr chaque tache si elle contient la date
    const filteredTasks = items.filter(
      (task) => task.date.includes(selectedDate) //Une des dates des taches inclut elle la date selectionné ?
    )
    //on map ce tableau d'une ou plusieurs taches
    const taskLists = filteredTasks.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        key={task.id}
        deleteTask={deleteTask}
        editTask={editTask}
        serieCount={serieCount}
        serie={task.serie}
      />
    ))

    return (
      <div>
        <StyledDivContainerNoData>
          <div>
            {weekdays.map((day) => (
              <StyledDaysButton onClick={() => handleDayClick(day)} key={day}>
                {day.format('ddd')}
              </StyledDaysButton>
            ))}
          </div>
          {selectedDate && (
            <StyledDivOfCurrentDay>{selectedDate}</StyledDivOfCurrentDay>
          )}
          <UlTaskList>{taskLists}</UlTaskList>
        </StyledDivContainerNoData>
      </div>
    )
  }

  if (isLoading) {
    return <div>is loading..</div>
  } else {
    if (items.length !== 0) {
      return (
        <HomeContainer>
          <Header />

          <TodoHomePage />
        </HomeContainer>
      )
    } else {
      return (
        <HomeContainer>
          <Header />
          <MainStyled>
            <StyledDivHomeWithNoData>
              Créer une habitude personnalisée dès maintenant afin
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

export default Home
