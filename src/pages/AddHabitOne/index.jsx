import { Link } from 'react-router-dom'

import Header from '../../components/Header'
import Button from '../../components/Button'
import styled from 'styled-components'

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

function AddHabitOne() {
  return (
    <div>
      <Header />
      <MainStyled>
        <Link to="/AddHabitTwo">
          <Button>Crée une habitude personnalisée</Button>
        </Link>
        <div>Ou utilise un modèle :</div>
        <Link to="/AddHabitTwo">
          <Button>Running</Button>
        </Link>
        <Link to="/AddHabitTwo">
          <Button>Workout</Button>
        </Link>
        <Link to="/AddHabitTwo">
          <Button>Arrête de fumer</Button>
        </Link>
      </MainStyled>
    </div>
  )
}

export default AddHabitOne
