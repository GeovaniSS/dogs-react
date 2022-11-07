import React, { ChangeEvent, FocusEvent } from 'react'

type fieldsKeys = keyof typeof fields

const fields = {
  email: {
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Preencha um email válido'
  }
}

export const useForm = (field: string) => {
  const [value, setValue] = React.useState("")
  const [error, setError] = React.useState<null | string>(null)

  function validate(value: string) {
    const validation = fields[field as fieldsKeys]

    if (!field) return true
    if (value.trim().length === 0) {
      setError("Preencha um valor")
      return false
    } else if (validation && !validation.regex.test(value)) {
      setError(validation.message)
      return false
    } else {
      setError(null)
      return true
    }
  }

  function onBlur({target}: FocusEvent<HTMLInputElement>) {
    validate(target.value)
  }

  function onChange({target}: ChangeEvent<HTMLInputElement>) {
    if (error) validate(target.value)
    setValue(target.value)
  }

  return { 
    value, 
    setValue,
    error,
    validate: () => validate(value),
    onBlur,
    onChange,
  }
}
