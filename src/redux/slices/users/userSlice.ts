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

export const fetchUsers = createAsyncThunk('users/fetchUser', async () => {
  const response = await axios.get(`${baseUrl}/users`)
  return response.data.payload.users
})

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
    updateUser: (state, action) => {
      const { id, firstName } = action.payload
      const foundUser = state.users.find((user) => user._id == id)
      if (foundUser) {
        foundUser.name = firstName

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
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Failed to fetch data'
      })
  }
})
export const { login, logout, updateUser } = usersReducer.actions
export default usersReducer.reducer
