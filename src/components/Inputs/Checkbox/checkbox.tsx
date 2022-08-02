import React, { ChangeEventHandler } from 'react'
import styles from './checkbox.module.css'

interface ICheckboxProps {
  id: string
  text: string
  name: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}
function CheckboxInput(props: ICheckboxProps) {
  const { id, text, name, checked, onChange } = props
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={`${styles.label} ${checked && styles.checked}`}></label>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
      />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
export { CheckboxInput }
