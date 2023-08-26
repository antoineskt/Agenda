import NavBar from '../../components/NavBar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

const StyledContaineur = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

function Edit() {
  return (
    <div>
      <NavBar />
      <StyledContaineur>
        <h1>Modifie ton objectif : </h1>
        <input placeholder="Écris ici" />
        <Link to="/">
          <Button>Enregistrer</Button>
        </Link>
      </StyledContaineur>
    </div>
  )
}

export default Edit
