import { browserHistory } from 'react-router'
import Auth0 from 'auth0-js'
import decode from 'jwt-decode'

export const getTokenExpirationDate = (token) => {
  const decoded = decode(token)
  if (!decoded.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)

  return date
}

export const isTokenExpired = (token) => {
  const date = getTokenExpirationDate(token)
  if (date === null) {
    return false
  }

  return !(date.valueOf() > new Date().valueOf())
}

/**
 * Retrieves the user token from localStorage
 * @return {[type]} [description]
 */
export const getToken = () => localStorage.getItem('id_token')

/**
 * Checks if there is a saved token and it's still valid
 * @return {[type]} [description]
 */
export const isLoggedIn = () => {
  const token = getToken()

  return !!token && !isTokenExpired(token)
}

const createAuth0 = () => (
  new Auth0.WebAuth({
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    responseType: 'token id_token',
    redirectUri: process.env.AUTH0_REDIRECT_URI,
  })
)

/**
 * Saves user access token and ID token into local storage
 * @type {[type]}
 */
const setToken = (accessToken, idToken) => {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('id_token', idToken)
}

export const parseHash = (hash) => {
  const auth0 = createAuth0()
  auth0.parseHash({ hash }, (err, result) => {
    if (result && result.accessToken && result.idToken) {
      setToken(result.accessToken, result.idToken)
      // browserHistory.replace('/dashboard')
      // auth0.client.userInfo(result.accessToken, (error, profile) => {
      //   if (error) {
      //     console.error('Error loading the Profile', error)
      //     return
      //   }
      //
      //   setProfile(profile)
      // })
    } else if (result && result.error) {
      console.error(new Error(result.error)) // eslint-disable-line
    }
  })
}

/**
 * Clears user token and profile data from localStorage
 * @return {[type]} [description]
 */
export const logout = () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
}

export const login = (username, password) => {
  const auth0 = createAuth0()
  auth0.client.login({
    realm: 'Username-Password-Authentication',
    username,
    password,
  }, (err, result) => {
    if (err) {
      console.error(new Error(err.description)) // eslint-disable-line
      return
    }
    if (result && result.idToken && result.accessToken) {
      setToken(result.accessToken, result.idToken)
      browserHistory.replace('/dashboard')
    }
  })
}

export const signup = (email, password) => {
  const auth0 = createAuth0()
  auth0.redirect.signupAndLogin({
    connection: 'Username-Password-Authentication',
    email,
    password,
  }, (err) => {
    if (err) {
      console.error(new Error(err.description)) // eslint-disable-line
    }
  })
}

export const loginWithGoogle = () => {
  const auth0 = createAuth0()
  auth0.authorize({ connection: 'google-oauth2' })
}

// setProfile(profile) {
//   // Saves profile data to localStorage
//   localStorage.setItem('profile', JSON.stringify(profile))
// }
//
// getProfile() {
//   // Retrieves the profile data from localStorage
//   const profile = localStorage.getItem('profile')
//   return profile ? JSON.parse(localStorage.profile) : {}
// }

export default {}
