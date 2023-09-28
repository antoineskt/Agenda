import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import styled from 'styled-components'

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`

const StyledDivModele = styled.div`
  font-size: 1.5em;
  margin-top: 0.2em;
  margin-bottom: 20px;
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`

const Div = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`

function AddHabitOne() {
  return (
    <div>
      <MainStyled>
        <Link to="/AddHabitTwo">
          <Button>Objectif personnalisé</Button>
        </Link>
        <StyledDivModele>Ou utilise un modèle :</StyledDivModele>
        <Div>
          <Link to="/AddHabitTwo?habit=Running">
            <Button>Running</Button>
          </Link>
          <Link to="/AddHabitTwo?habit=Workout">
            <Button>Workout</Button>
          </Link>
          <Link to="/AddHabitTwo?habit=Arrêter%20de%20fumer">
            <Button>Arrêter de fumer</Button>
          </Link>
        </Div>
      </MainStyled>
    </div>
  )
}

export default AddHabitOne
