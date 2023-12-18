import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseUrl } from '../../../services/UserService'

export type User = {
  _id: string
  name: string
  email: string
  password: string
  image: string
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
}

export type UsersState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  ban: boolean
}
const data =
  localStorage.getItem('loginData') != null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UsersState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  ban: false
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>(`${baseUrl}/users`)
  return response.data
})
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await axios.delete<User[]>(`${baseUrl}/users/${id}`)
  return id
})
export const banUser = createAsyncThunk('users/banUser', async (id: string) => {
  await axios.put<User[]>(`${baseUrl}/users/ban/${id}`)
  return id
})
export const unbanUser = createAsyncThunk('users/unbanUser', async (id: string) => {
  await axios.put<User[]>(`${baseUrl}/users/unban/${id}`)
  return id
})

// export const logInUser = async (newUser: {}) => {
//   const response = await axios.post(`${baseUrl}/auth/login`, newUser)
//   return response.data
// }

export const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    deleteSingleUser: (state, action) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action) => {
      const { id, name } = action.payload
      const foundUser = state.users.find((user) => user._id == id)
      if (foundUser) {
        foundUser.name = name

        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.payload.users
      state.isLoading = false
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload)
      state.isLoading = false
    })
    builder.addCase(banUser.fulfilled, (state, action) => {
      state.isLoading = false
      const foundUser = state.users.find((user) => user._id === action.payload)
      if (foundUser) {
        foundUser.isBanned = true
      }
    })
    builder.addCase(unbanUser.fulfilled, (state, action) => {
      state.isLoading = false
      const foundUser = state.users.find((user) => user._id === action.payload)
      if (foundUser) {
        foundUser.isBanned = false
      }
    })

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'an error occured'
      }
    )
  }
})
export const { login, logout, updateUser, addUser } = usersReducer.actions
export default usersReducer.reducer
