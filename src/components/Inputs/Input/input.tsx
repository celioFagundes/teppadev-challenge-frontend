import { ChangeEventHandler, FocusEventHandler } from 'react'
import styles from './input.module.css'
interface IInput {
  id: string
  type?: string
  label: string
  name: string
  value: string
  placeholder: string
  errorMessage?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
}
function Input(props: IInput) {
  const { id,type, label, name, value, placeholder, errorMessage, onChange, onBlur } = props
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <input
        id={id}
        type = {type || 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
      />
      {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  )
}
export { Input }
