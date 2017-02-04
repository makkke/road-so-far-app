import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Container from './app/Container'
import Dashboard from './dashboard'

export default (
  <Route path="/" component={Container}>
    <IndexRoute component={Dashboard} />
  </Route>
)
