import axiosInstance from './axiosInstance'

export const loginUser = (credentials) =>
  axiosInstance.post('/auth/login', credentials)

export const registerUser = (data) =>
  axiosInstance.post('/auth/register', data)

export const getMe = () =>
  axiosInstance.get('/auth/me')

export const healthCheck = () =>
  axiosInstance.get('/')
