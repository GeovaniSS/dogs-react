import { Outlet } from 'react-router-dom'
import { Head } from '../Helper/Head'
import { UserHeader } from './UserHeader'

export const User = () => {
  return (
    <section className="container">
      <Head title='Minha Conta' description='Página do perfil do usuário' />
      <UserHeader />
      <Outlet />
    </section>
  )
}
