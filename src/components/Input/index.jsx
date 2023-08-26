import './input.css'

export default function Input({ onChange, value }) {
  return (
    <div class="container">
      <input
        required=""
        type="text"
        name="text"
        class="input"
        placeholder="écrivez ici"
        id="new-todo-input"
        autoComplete="off"
        onChange={onChange}
        value={value}
      />
      <label class="label"></label>
    </div>
  )
}
