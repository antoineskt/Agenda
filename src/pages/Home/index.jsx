import { useContext } from 'react'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import { useData } from '../../utils/Datas'
import TaskList from '../../components/TaskList'
import DateSelector from '../../components/DateSelector'
import { HabitContext } from '../../context/HabitContext'

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

const StyledDivOfCurrentDay = styled.div`
  text-align: center;
  margin: 1em;
  font-size: 1.5em;
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 1em;
  }
`

export default function Home() {
  const { addDateIsDone } = useData()
  const { items, selectedDate, setSelectedDate } = useContext(HabitContext)

  return (
    <div>
      <HomeContainer>
        {items.length >= 1 && (
          <StyledDivContainerNoData>
            <DateSelector setSelectedDate={setSelectedDate} isHome={true} />
            <StyledDivOfCurrentDay>{selectedDate}</StyledDivOfCurrentDay>
            <TaskList //Affiché uniquement si une des dates correspond a la date selectionné
              selectedDate={selectedDate}
              showSlideButton={true}
              shouldBeFilteredByDate={true}
              addDateIsDone={addDateIsDone}
              showCountToOne={true}
              showTotal={false}
            />
          </StyledDivContainerNoData>
        )}
        {items.length < 1 && (
          <MainStyled>
            <StyledDivHomeWithNoData>
              Créer une habitude personnalisée dès maintenant afin
              <br /> de suivre et d'accomplir tes objectifs :
            </StyledDivHomeWithNoData>

            <Link to="/AddHabitOne">
              <Button>Click me!</Button>
            </Link>
          </MainStyled>
        )}
      </HomeContainer>
    </div>
  )
}
