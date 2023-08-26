import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Roboto Mono', monospace;
    
    }

    body {
      margin: 0;
      padding: 0;
      background: black;
      color: rgb(237, 230, 218)

    }
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
