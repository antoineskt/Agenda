import './style.css'
import styled from 'styled-components'

const StyledSection = styled.section`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
`

export default function CongratsCard({
  serie,
  totalTaskDone,
  name,
  setisCongratsPage,
  isCongratsPage,
}) {
  return (
    <StyledSection
      onClick={() => setisCongratsPage(false)}
      className="container"
    >
      <div className={'card-container'}>
        <div className="card-content">
          <div className="card-title">
            <span className="title">Bravo !</span>
          </div>
          <div className="card-body">
            <div className="svg-card">{name}</div>
            <div className="svg-card">🔥{serie}</div>
            <div className="svg-card">Total: {totalTaskDone}</div>
          </div>
          <div className="card-footer">
            <button
              onClick={() => setisCongratsPage(false)}
              className="buttonClose"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </StyledSection>
  )
}
