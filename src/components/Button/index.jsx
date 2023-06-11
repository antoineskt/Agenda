import './button.css'

function Button({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}
export default Button
