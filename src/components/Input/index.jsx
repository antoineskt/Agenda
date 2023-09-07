import './input.css'

export default function Input({ onChange, value }) {
  return (
    <div className="container">
      <input
        required=""
        type="text"
        name="text"
        className="input"
        placeholder="écrivez ici"
        id="new-todo-input"
        autoComplete="off"
        onChange={onChange}
        value={value}
      />
      <label className="label"></label>
    </div>
  )
}
