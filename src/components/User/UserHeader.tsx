import React from 'react'
import styles from './UserHeader.module.css'

import { useLocation } from 'react-router-dom'
import { UserHeaderNav } from './UserHeaderNav'

export const UserHeader = () => {
  const [title, setTitle] = React.useState("Minha Conta")
  const location = useLocation()

  React.useEffect(() => {
    switch(location.pathname) {
      case "/account":
        setTitle("Minha Conta")
        break
      case "/account/stats":
        setTitle("Estatísticas")
        break
      case "/account/post": 
        setTitle("Poste sua foto")
        break
    }
  }, [location])

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  )
}
