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

const StyledDivModele = styled.div`
  font-size: 2em;
  margin-top: 1em;
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 1em;
  }
`

function AddHabitOne() {
  return (
    <div>
      <Header />
      <MainStyled>
        <Link to="/AddHabitTwo">
          <Button>Créer un objectif personnalisée</Button>
        </Link>
        <StyledDivModele>Ou utilise un modèle :</StyledDivModele>
        <Link to="/AddHabitTwo?habit=Running">
          <Button>Running</Button>
        </Link>
        <Link to="/AddHabitTwo?habit=Workout">
          <Button>Workout</Button>
        </Link>
        <Link to="/AddHabitTwo?habit=Arrête%20de%20fumer">
          <Button>Arrête de fumer</Button>
        </Link>
      </MainStyled>
    </div>
  )
}

export default AddHabitOne
