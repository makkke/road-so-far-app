import { browserHistory } from 'react-router'
import auth0 from 'auth0-js'

import { isTokenExpired } from './jwt'

export default class AuthService {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      clientID: 'vwqeSmdGge6jdXzDwTnTQE3K7KOS3n0H',
      domain: 'makkke.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:8080/login',
    })

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
  }

  login(username, password) {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password,
    }, (err, result) => {
      if (err) {
        console.error(new Error(err.description))
        return
      }
      if (result && result.idToken && result.accessToken) {
        this.setToken(result.accessToken, result.idToken)
        browserHistory.replace('/dashboard')
      }
    })
  }

  signup(email, password) {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, (err) => {
      if (err) {
        console.error(new Error(err.description))
      }
    })
  }

  loginWithGoogle() {
    this.auth0.authorize({ connection: 'google-oauth2' })
  }

  parseHash(hash) {
    this.auth0.parseHash({ hash }, (err, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setToken(result.accessToken, result.idToken)
        browserHistory.replace('/dashboard')
        this.auth0.client.userInfo(result.accessToken, (error, profile) => {
          if (error) {
            console.error('Error loading the Profile', error)
            return
          }

          this.setProfile(profile)
        })
      } else if (result && result.error) {
        console.error(new Error(result.error))
      }
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}
