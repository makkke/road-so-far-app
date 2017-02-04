import React, { Component, PropTypes } from 'react'

import Auth from '../utils/auth'

export class LoginPage extends Component {
  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(Auth)
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <h2>Login</h2>
        <button onClick={() => auth.login()}>Login</button>
      </div>
    )
  }
}

export default LoginPage
