import { useState } from 'react'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import { useData } from '../../utils/Datas'
import TaskList from '../../components/TaskList'

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
  margin-top: 50px;
`
const StyledDivHomeWithNoData = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
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

export default function Home() {
  const { items, isLoading, deleteTask, editTask, serieCount } = useData()

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

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : items.length !== 0 ? (
        <HomeContainer>
          <Header />
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
            <UlTaskList>
              <TaskList
                items={items}
                selectedDate={selectedDate}
                deleteTask={deleteTask}
                editTask={editTask}
                serieCount={serieCount}
              />
            </UlTaskList>
          </StyledDivContainerNoData>
        </HomeContainer>
      ) : (
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
      )}
    </div>
  )
}
