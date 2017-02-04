import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Auth from './utils/auth'
import Container from './app/Container'
import Dashboard from './dashboard'
import Login from './login'

const auth = new Auth('vwqeSmdGge6jdXzDwTnTQE3K7KOS3n0H', 'makkke.auth0.com')

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export default (
  <Route path="/" component={Container} auth={auth}>
    <IndexRedirect to="/dashboard" />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="login" component={Login} />
  </Route>
)
