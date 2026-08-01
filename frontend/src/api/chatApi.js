import axiosInstance from './axiosInstance'

export const sendMessage = (question) =>
  axiosInstance.post('/chat/', { question })

export const getMe = () =>
  axiosInstance.get('/auth/me')
