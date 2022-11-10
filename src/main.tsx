import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserStorage } from './UserContext'
import { App } from './App'
import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserStorage>
        <App />
      </UserStorage>
    </BrowserRouter>
  </React.StrictMode>
)
