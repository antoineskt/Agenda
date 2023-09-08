import './input.css'

export default function Input({ onChange, value, id = '', ...rest }) {
  return (
    <input
      {...rest}
      required
      type="text"
      name="text"
      className="input"
      placeholder="écrivez ici"
      id={`${id}`}
      autoComplete="off"
      onChange={onChange}
      value={value}
    />
  )
}
