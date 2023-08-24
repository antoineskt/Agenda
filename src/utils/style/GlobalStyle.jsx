import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Roboto Mono', monospace;
    
    }

    body {
     
    }
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
