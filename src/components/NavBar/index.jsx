import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react'

const svgLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height="50"
    viewBox="0 0 49 50"
    width="49"
  >
    <path d="m0 0h49v49.0559h-49z" fill="#fff" fillOpacity=".01" />
    <g
      stroke="#f0e7e7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <ellipse
        cx="17.6777"
        cy="17.6777"
        rx="9"
        ry="16"
        transform="matrix(.70710678 -.70710678 .70710678 .70710678 -7.322343 17.6777)"
      />
      <ellipse
        rx="9"
        ry="16"
        transform="matrix(.707107 .707107 .707107 -.707107 17.6777 31.3783)"
      />
      <ellipse
        rx="9"
        ry="16"
        transform="matrix(-.707107 -.707107 -.707107 .707107 31.3223 17.6777)"
      />
      <ellipse
        cx="31.3223"
        cy="31.3783"
        rx="9"
        ry="16"
        transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 75.658319 31.417898)"
      />
    </g>
  </svg>
)

const Header = styled.header`
  background-color: black;
  display: flex;
  height: 80px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  color: white;
`
const DivLogo = styled.div`
  padding-left: 40px;
`
const Nav = styled.nav`
  @media screen and (max-width: 900px) {
    display: none;
  }
`
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding-right: 25px;
  &:hover {
    color: grey;
  }
  @media screen and (max-width: 900px) {
    padding-right: 0px;
    padding-top: 10px;
    padding-bottom: 5px;
  }
`

const SvgMenu = styled.svg`
  display: none;
  margin-right: 20px;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    display: ${({ $click }) => ($click === true ? 'none' : 'block')};
  }
`
const SvgCross = styled.svg`
  color: white;
  margin-right: 20px;
  cursor: pointer;
  @media screen and (min-width: 900px) {
    display: none;
  }
`

const NavMenuInBurger = styled.nav`
  display: ${({ $click }) => ($click === true ? 'flex' : 'flex')};
  position: absolute;
  transform: ${({ $click }) => ($click === true ? 'scaleY(1)' : 'scaleY(0)')};
  transition: 200ms all ease;
  transform-origin: top;
  right: 0;
  width: 100%;
  top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1em;
  background-color: rgba(15, 15, 15, 0.92);
  z-index: 10;

  @media screen and (min-width: 900px) {
    display: none;
  }
`

function NavBar() {
  const [click, setClick] = useState(false)
  const closeNavbar = () => setClick(false)
  return (
    <Header>
      <DivLogo>
        <a href="/">{svgLogo}</a>
      </DivLogo>

      <Nav>
        <StyledLink to="/">Accueil</StyledLink>

        <StyledLink to="/AddHabitOne">Créer un objectif</StyledLink>

        <StyledLink to="/Stats">Statistiques</StyledLink>

        <StyledLink to="/CalendarPage">Calendrier</StyledLink>
      </Nav>

      {!click ? (
        <SvgMenu
          $click={click}
          onClick={() => setClick(true)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="34"
          viewBox="0 0 24 24"
          width="34"
        >
          <g stroke="#ffffff" strokeLinecap="round" strokeWidth="2">
            <path d="m4 18h16" />
            <path d="m4 12h16" />
            <path d="m4 6h16" />
          </g>
        </SvgMenu>
      ) : (
        <SvgCross
          onClick={() => setClick(false)}
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 20L4 4.00003M20 4L4.00002 20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </SvgCross>
      )}

      <NavMenuInBurger $click={click}>
        <StyledLink onClick={() => closeNavbar()} to="/">
          Accueil
        </StyledLink>

        <StyledLink onClick={() => closeNavbar()} to="/AddHabitOne">
          Créer un objectif
        </StyledLink>

        <StyledLink onClick={() => closeNavbar()} to="/Stats">
          Statistiques
        </StyledLink>

        <StyledLink onClick={() => closeNavbar()} to="/CalendarPage">
          Calendrier
        </StyledLink>
      </NavMenuInBurger>
    </Header>
  )
}

export default NavBar
