import './style.css'

export default function CongratsCard({
  serie,
  totalTaskDone,
  name,
  setisCongratsPage,
  isCongratsPage,
}) {
  return (
    <section class="container">
      <div class={'card-container'}>
        <div class="card-content">
          <div class="card-title">
            <span class="title">Bravo !</span>
          </div>
          <div class="card-body">
            <div class="svg-card">{name}</div>
            <div class="svg-card">🔥{serie}</div>
            <div class="svg-card">Total: {totalTaskDone}</div>
          </div>
          <div class="card-footer">
            <button
              onClick={() => setisCongratsPage(false)}
              class="buttonClose"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
