import axios from 'axios'

export const baseUrl = 'http://localhost:5050'

export const createUser = async (newUser: FormData) => {
  const response = await axios.post(`${baseUrl}/users/process-register`, newUser)
  return response.data
}

export const activateUser = async (token: string) => {
  const response = await axios.post(`${baseUrl}/users/activate`, { token })
  return response.data
}
