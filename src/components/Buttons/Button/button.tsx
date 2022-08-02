import React, { MouseEventHandler } from 'react'
import styles from './button.module.css'

interface IButtonProps {
  type?: 'button' | 'submit'
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  outline?: boolean
  disabled?: boolean
}
function Button(props: IButtonProps) {
  const { type, children, onClick, outline, disabled } = props
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${disabled && styles.disabled} ${outline && styles.outline}`}
    >
      {children}
    </button>
  )
}
export { Button }
