import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 0.12em 0.28em;
  width: 15.6em;
  height: 4.72em;
  background-color: #212121;
  border: 0.1em solid #fff;
  border-radius: 0.45em;
  font-size: 14.4px;
  margin: 0.72em;
  z-index: 1;
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    padding: 0.1em 0.25em;
    width: 13em;
    height: 4.2em;
    background-color: #212121;
    border: 0.08em solid #fff;
    border-radius: 0.3em;
    font-size: 12px;
    margin: 1.2em;
  }
`

const StyledSpan = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0.48em;
  width: 10em;
  height: 2.9em;
  background-color: #212121;
  border-radius: 0.3em;
  font-size: 1.48em;
  color: #fff;
  border: 0.01em solid #fff;
  box-shadow: 0 0.4em 0.11em 0.02em #fff;
  z-index: 1;
  &:hover {
    transition: all 0.5s;
    transform: translate(0, 0.48em);
    box-shadow: 0 0 0 0 #fff;
  }
  &:not(hover) {
    transition: all 1s;
  }
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    bottom: 0.4em;
    width: 8.25em;
    height: 2.5em;
    border-radius: 0.2em;
    font-size: 1.48em;
    border: 0.01em solid #fff;
    box-shadow: 0 0.35em 0.1em 0.019em #fff;
    &:hover {
      transition: all 0.5s;
      transform: translate(0, 0.4em);
      box-shadow: 0 0 0 0 #fff;
    }
  }
`

function Button({ children, onClick }) {
  return (
    <StyledButton type="button" onClick={onClick}>
      <StyledSpan>{children}</StyledSpan>
    </StyledButton>
  )
}
export default Button
