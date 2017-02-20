import React from 'react'
import { Provider } from 'react-redux'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Import Routes
import routes from './routes'

// Base stylesheet
require('./app.css')

const networkInterface = createNetworkInterface({ uri: `${process.env.ROAD_SO_FAR_API}/graphql` })
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {} // eslint-disable-line
    }

    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('id_token')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL21ha2trZS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NThhYTJiMTg4MmIwY2EwNzc0NjNkOGQ5IiwiYXVkIjoidndxZVNtZEdnZTZqZFh6RHdUblRRRTNLN0tPUzNuMEgiLCJleHAiOjE0ODc1ODMxNjEsImlhdCI6MTQ4NzU0NzE2MSwiYXRfaGFzaCI6IkNrbkJYSTFqRzFqN283cXBfcllucEEifQ.4rbtTRxC-obLzfbRFomfSD7yOPlxL6G1Dk_QsCya8fk'
    req.options.headers.authorization = token ? `Bearer ${token}` : null // eslint-disable-line
    next()
  },
}])
const client = new ApolloClient({ networkInterface })

function App(props) {
  return (
    <MuiThemeProvider>
      <ApolloProvider client={client}>
        <Provider store={props.store}>
          <Router history={browserHistory}>
            {routes}
          </Router>
        </Provider>
      </ApolloProvider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  store: React.PropTypes.object.isRequired, // eslint-disable-line
}

export default App
