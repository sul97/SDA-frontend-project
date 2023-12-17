import axios from 'axios'

export const baseUrl = 'http://localhost:5050'

// export const deleteUser = async (id: string) => {
//   const response = await axios.delete(`${baseUrl}/users/${id}`)
//   return response.data
// }

// export const banUser = async (id: string) => {
//   const response = await axios.put(`${baseUrl}/users/ban/${id}`)
//   return response.data
// }

// export const unbanUser = async (id: string) => {
//   const response = await axios.put(`${baseUrl}/users/unban/${id}`)
//   return response.data
// }

export const createUser = async (newUser: FormData) => {
  const response = await axios.post(`${baseUrl}/users/process-register`, newUser)
  return response.data
}

export const activateUser = async (token: string) => {
  const response = await axios.post(`${baseUrl}/users/activate`, { token })
  return response.data
}
