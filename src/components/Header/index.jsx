import './header.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;
  font-size: 1.25rem;
`

function Header() {
  return (
    <nav>
      <input
        type="checkbox"
        role="button"
        aria-label="Ouvrir le menu"
        aria-expanded="false"
        aria-controls="menu"
      />
      <ul id="menu">
        <li>
          <StyledLink to="/">Accueil</StyledLink>
        </li>
        <li>
          <StyledLink to="/AddHabitOne">Ajoute une habitude</StyledLink>
        </li>
        <li>
          <StyledLink to="/Stats">Statistiques</StyledLink>
        </li>
        <li>
          <StyledLink to="/CalendarPage">Calendrier</StyledLink>
        </li>
      </ul>
    </nav>
  )
}

export default Header
