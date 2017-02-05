import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Auth from './utils/auth'
import Container from './app/Container'
import Dashboard from './dashboard'
import LoginPage from './registration/LoginPage'
import SignupPage from './registration/SignupPage'

const auth = new Auth()

/**
 * Validates authentication in private routes
 */
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const parseAuthHash = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.parseHash(nextState.location.hash)
  }
}

export default (
  <Route path="/" component={Container} auth={auth}>
    <IndexRedirect to="/dashboard" />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="login" component={LoginPage} onEnter={parseAuthHash} />
    <Route path="signup" component={SignupPage} onEnter={parseAuthHash} />
  </Route>
)
