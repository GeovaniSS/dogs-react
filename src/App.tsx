import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import { NotFound } from './components/NotFound'

import { Login } from './components/Login/Login'
import { LoginForm } from './components/Login/LoginForm'
import { LoginCreate } from './components/Login/LoginCreate'
import { LoginPasswordLost } from './components/Login/LoginPasswordLost'
import { LoginPasswordReset } from './components/Login/LoginPasswordReset'

import { User } from './components/User/User'
import { UserStats } from './components/User/UserStats'
import { UserPhotoPost } from './components/User/UserPhotoPost'
import { UserProfile } from './components/User/UserProfile'

import { Feed } from './components/Feed/Feed'
import { Photo } from './components/Photo/Photo'

import { ProtectedRoutes } from './components/Helper/ProtectedRoutes'
import UserContext from './UserContext'

export const App = () => {
  const { login, user } = React.useContext(UserContext)
  return (
    <div className="App">
      <Header />
      <main className="AppBody">
        <Routes>
          <Route path='/' element={<Home />} />

          <Route element={<ProtectedRoutes redirectPath='/account' isAllowed={login === false} />}>
            <Route path="login" element={<Login />}>
              <Route index path="" element={<LoginForm />} />
              <Route path="create" element={<LoginCreate />} />
              <Route path="lost" element={<LoginPasswordLost />}/>
              <Route path="reset" element={<LoginPasswordReset />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoutes redirectPath='/login' isAllowed={login === true}/>}>
            <Route path="account" element={<User />}>
              <Route index path="" element={<Feed user={user?.id} />} /> 
              <Route path="stats" element={<UserStats />} />
              <Route path="post" element={<UserPhotoPost />} />
            </Route>
          </Route>

          <Route path="photo/:id" element={<Photo />} />
          
          <Route path="profile/:user" element={<UserProfile />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
