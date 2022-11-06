import { FormEvent } from 'react'
import { PASSWORD_LOST_POST } from '../../api'
import { useAxios } from '../../hooks/useAxios'

import { useForm } from '../../hooks/useForm'

import { Button } from '../Forms/Button'
import { Input } from '../Forms/Input'
import { Error } from '../Helper/Error'

export const LoginPasswordLost = () => {
  const login = useForm("login")
  const { data, error, loading, request } = useAxios()

  async function handlePasswordLostSubmit(event: FormEvent) {
    event.preventDefault()

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST_POST({ login: login.value, 
      url: `${window.location.origin}/login/reset`})
      await request(url, options)
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      { data ? <p style={{ color: "#4c1" }}>{data}</p> : 
        <form onSubmit={handlePasswordLostSubmit}>
          <Input 
            label="Email / Usuário" 
            id="login"
            value={login.value}
            onChange={login.onChange}
            error={login.error}
            onBlur={login.onBlur}
          />
          <Button disabled={loading}>
            { loading ? "Enviando" : "Enviar email" }
          </Button>
          <Error error={error} />
        </form>
      }
    </section>
  )
}
