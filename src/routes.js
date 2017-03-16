import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import * as auth from './utils/auth'
import Container from './app/Container'
import Dashboard from './dashboard'
import FuelPurchases from './fuelPurchases'
import CreateFuelPurchase from './fuelPurchases/CreateFuelPurchasePage'
import LoginPage from './registration/LoginPage'
import SignupPage from './registration/SignupPage'

/**
 * Validates authentication in private routes
 */
const requireAuth = (nextState, replace) => {
  if (!auth.isLoggedIn()) {
    replace({ pathname: '/login' })
  }
}

const parseAuthHash = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.parseHash(nextState.location.hash)
  }
}

export default (
  <Route path="/" component={Container}>
    <IndexRedirect to="/dashboard" />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="fuel-purchases" component={FuelPurchases} onEnter={requireAuth} />
    <Route path="fuel-purchases/create" component={CreateFuelPurchase} onEnter={requireAuth} />

    <Route path="login" component={LoginPage} onEnter={parseAuthHash} />
    <Route path="signup" component={SignupPage} onEnter={parseAuthHash} />
  </Route>
)
