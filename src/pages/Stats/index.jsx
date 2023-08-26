import styled from 'styled-components'
import NavBar from '../../components/NavBar'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useData } from '../../utils/Datas'
import TaskList from '../../components/TaskList'

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
  const { items, isLoading, deleteTask, editTask, serieCount } = useData()

  return (
    <div>
      {isLoading ? (
        <div>Loading..</div>
      ) : items.length !== 0 ? (
        <HomeContainer>
          <NavBar />
          <StyledDivContainerNoData>
            <UlTaskList>
              <TaskList
                items={items}
                deleteTask={deleteTask}
                editTask={editTask}
                serieCount={serieCount}
                showSlideButton={false}
                shouldBeFilteredByDate={false}
              />
            </UlTaskList>
          </StyledDivContainerNoData>
        </HomeContainer>
      ) : (
        <HomeContainer>
          <NavBar />
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
      )}
    </div>
  )
}

export default Stats
