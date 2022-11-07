import React, { FormEvent } from 'react';

import { useForm } from '../../hooks/useForm';
import { useAxios } from '../../hooks/useAxios';

import { Button } from '../Forms/Button';
import { Input } from '../Forms/Input';
import { Error } from '../Helper/Error';

import { USER_POST } from '../../api';

import UserContext from '../../UserContext';

export const LoginCreate = () => {
  const username = useForm('username');
  const email = useForm('email');
  const password = useForm('password');
  
  const { error, loading, request } = useAxios()
  const { userLogin } = React.useContext(UserContext)

  async function userRegister() {
    const { url, options } = USER_POST({ 
      username: username.value, 
      email: email.value, 
      password: password.value 
    })
    const { response } = await request(url, options)
    if (response.status) userLogin(username.value, password.value)
  }

  function handleUserRegister(event: FormEvent) {
    event.preventDefault();
    if (username.validate() && email.validate() && password.validate()) {
      userRegister()
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleUserRegister}>
        <Input
          label="Usuário"
          id="username"
          value={username.value}
          onChange={username.onChange}
          error={username.error}
          onBlur={username.onBlur}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          value={email.value}
          onChange={email.onChange}
          error={email.error}
          onBlur={email.onBlur}
        />
        <Input
          label="Senha"
          id="password"
          type="password"
          value={password.value}
          onChange={password.onChange}
          error={password.error}
          onBlur={password.onBlur}
        />
        <Button disabled={loading}>
          { loading ? 'Cadastrando...': 'Cadastrar' }
        </Button>
        <Error error={error} />
      </form>
    </section>
  );
};
