import React from 'react'
import { Router } from '@reach/router'
import {
  Login,
  Auth,
  Dashboard,
  NotFound,
  CreateCharacter,
  Character
} from './pages'

const Routes = () => (
  <Router>
    <Login path="/" />
    <Auth path="auth" />
    <Dashboard path="dashboard" />
    <NotFound path="forbidden" />
    <CreateCharacter path="character/new" />
    <Character path="character" />
  </Router>
)

export default Routes
