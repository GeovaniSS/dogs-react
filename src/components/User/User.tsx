import { Outlet } from 'react-router-dom'
import { UserHeader } from './UserHeader'

export const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Outlet />
    </section>
  )
}
