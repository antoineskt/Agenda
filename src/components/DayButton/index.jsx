import './DayButton.css'

export default function DaysButton({ children, onClick, isActive, items }) {
  return (
    <button
      type="button"
      items={items}
      //on affiche le bouton supprimer uniquement si il n'a pas deja été cliqué (permet le désélection)
      className={`date-button ${isActive ? 'active' : 'inactive'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
