import React, { FormEvent } from 'react';

import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css'

import { Button } from '../Forms/Button';
import { Input } from '../Forms/Input';
import { Error } from '../Helper/Error'

import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';

import UserContext from '../../UserContext';
import { Head } from '../Helper/Head';

export const LoginForm = () => {
  const username = useForm('username');
  const password = useForm('password');
  const { loading, error, userLogin } = React.useContext(UserContext);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title='Login' description='Página de Login do site Dogs'/>
      
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Usuário"
          id="user"
          value={username.value}
          onChange={username.onChange}
          error={username.error}
          onBlur={username.onBlur}
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
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
        <Error error={error} />
      </form>

      <Link to="lost" className={styles.lost}>
        Perdeu a senha?
      </Link>

      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link to="create" className={stylesBtn.button}>
          Cadastro
        </Link>
      </div>
    </section>
  );
};
