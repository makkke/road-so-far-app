import React, { Component, PropTypes } from 'react'
import { Textfield, Button } from 'react-mdl'
import { Link } from 'react-router'

import AuthService from '../utils/auth'

class LoginPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
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
      this.props.auth.login(email, password)
      // await this.props.actions.login(this.state.email, this.state.password)
      const redirect = this.props.location.query.next || '/'
      this.context.router.push(redirect)
    } catch (err) {
      this.setState({ errors: { login: true }, loading: false })
    }
  }

  signup = () => {
    const { email, password } = this.state
    this.props.auth.signup(email, password)
  }

  loginWithGoogle = () => {
    this.props.auth.loginWithGoogle()
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Textfield
          name="email"
          label="Email"
          floatingLabel
          onChange={this.handleInputChange}
        />
        <Textfield
          name="password"
          label="Password"
          type="password"
          floatingLabel
          onChange={this.handleInputChange}
        />
        <Button raised onClick={this.login}>Log In</Button>
        <Button raised onClick={this.loginWithGoogle}>Login with Google</Button>
        <div>
          <span>{'Don\'t have an account?'}</span>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    )
  }
}

export default LoginPage
