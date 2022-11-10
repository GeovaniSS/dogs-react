import React, { FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAxios } from '../../hooks/useAxios'
import { useForm } from '../../hooks/useForm'
import { PASSWORD_RESET_POST } from '../../api'

import { Button } from '../Forms/Button'
import { Input } from '../Forms/Input'
import { Error } from '../Helper/Error'
import { Head } from '../Helper/Head'

export const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState("")
  const [key, setKey] = React.useState("")
  const [searchParams] = useSearchParams()
  const password = useForm('password')
  const { loading, error, request } = useAxios()
  const navigate = useNavigate()

  React.useEffect(() => {
    const key = searchParams.get('key')
    const login = searchParams.get('login')
    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])
  
  async function handlePasswordResetSubmit(event: FormEvent) {
    event.preventDefault()
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET_POST({ 
        login, 
        password: password.value, 
        key 
      })
      const { response } = await request(url, options)
      if (response.status) navigate("/login")
    }
  }

  return (
    <section className="animeLeft">
      <Head title='Resete a senha' description='Página para resetar senha do site Dogs'/>

      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handlePasswordResetSubmit}>
        <Input 
          label='Nova Senha'
          id='password'
          type="password"
          value={password.value}
          onChange={password.onChange}
          error={password.error}
          onBlur={password.onBlur}
        />
        <Button disabled={loading}>
           { loading ? "Resetando..." : "Resetar" }
        </Button>
        <Error error={error} />
      </form>
    </section>
  )
}
