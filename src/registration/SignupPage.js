import React, { Component, PropTypes } from 'react'
import { Textfield, Button } from 'react-mdl'
import { Link } from 'react-router'

import { signup } from '../utils/auth'

class SignupPage extends Component {
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

  signup = () => {
    // TODO: add validation

    // signup
    try {
      const { email, password } = this.state
      this.setState({ loading: true })
      signup(email, password)
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
        <h1>Sign Up</h1>
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
        <Button raised onClick={this.signup}>Sign Up</Button>
        <div>
          <span>{'Already have an account?'}</span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    )
  }
}

export default SignupPage
