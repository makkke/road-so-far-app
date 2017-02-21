import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { TextField, RaisedButton } from 'material-ui'

import { login, loginWithGoogle } from '../utils/auth'

class LoginPage extends Component {
  static contextTypes = {
    router: PropTypes.object // eslint-disable-line
  }

  static propTypes = {
    location: PropTypes.object, // eslint-disable-line
  }

  state = {
    email: '',
    password: '',
    loading: false,
    errors: {},
  }

  handleInputChange = (event) => {
    const { errors } = this.state
    const value = event.target.value.trim()
    const field = event.target.name

    errors[field] = null
    errors.login = null

    this.setState({ [field]: value, errors })
  }

  login = () => {
    // TODO: add validation

    // login
    try {
      const { email, password } = this.state
      this.setState({ loading: true })
      login(email, password)
      // await this.props.actions.login(this.state.email, this.state.password)
      const redirect = this.props.location.query.next || '/dashboard'
      this.context.router.push(redirect)
    } catch (err) {
      this.setState({ errors: { login: true }, loading: false })
    }
  }

  render() {
    return (
      <div>
        <div style={{ margin: 24 }}>
          <h1>Login</h1>
          <TextField
            name="email"
            floatingLabelText="Email"
            onChange={this.handleInputChange}
          />
          <TextField
            name="password"
            floatingLabelText="Password"
            type="password"
            onChange={this.handleInputChange}
          />
          <RaisedButton fullWidth onClick={this.login}>Log In</RaisedButton>
          <RaisedButton fullWidth onClick={() => loginWithGoogle}>Login with Google</RaisedButton>
          <div>
            <span>Dont have an account?</span>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
