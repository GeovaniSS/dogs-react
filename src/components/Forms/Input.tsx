import { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string | null
}

export const Input = ({ id, label, error, ...props }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input 
        type="text" 
        id={id} 
        name={id}
        className={styles.input}
        {...props} 
      />
      { error && <small className={styles.error}>{error}</small> }
    </div>
  )
}
