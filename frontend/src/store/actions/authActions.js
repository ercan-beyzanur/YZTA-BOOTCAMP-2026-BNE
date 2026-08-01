import { loginUser, registerUser } from '../../api/authApi'
import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT,
} from '../index'

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST })
  try {
    const { data } = await loginUser(credentials)
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email }))
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: { user: { username: data.username, email: data.email }, token: data.access_token } })
    return true
  } catch (error) {
    const message = error.response?.data?.detail || 'Giris basarisiz'
    dispatch({ type: AUTH_LOGIN_FAILURE, payload: message })
    return false
  }
}

export const register = (userData) => async (dispatch) => {
  dispatch({ type: AUTH_REGISTER_REQUEST })
  try {
    await registerUser(userData)
    dispatch({ type: AUTH_REGISTER_SUCCESS })
    return true
  } catch (error) {
    const message = error.response?.data?.detail || 'Kayit basarisiz'
    dispatch({ type: AUTH_REGISTER_FAILURE, payload: message })
    return false
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  dispatch({ type: AUTH_LOGOUT })
}

export const restoreSession = () => (dispatch) => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  if (token && user) {
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: { user: JSON.parse(user), token } })
  }
}
