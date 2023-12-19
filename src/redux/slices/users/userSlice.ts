import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL
import { toast } from 'react-toastify'

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
  localStorage.getItem('loginData') !== null
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
  const response = await axios.get<User[]>(`${API_BASE_URL}/users`)
  return response.data
})
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete<User[]>(`${API_BASE_URL}/users/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
export const banUser = createAsyncThunk('users/banUser', async (id: string) => {
  await axios.put<User[]>(`${API_BASE_URL}/users/ban/${id}`)
  return id
})
export const unbanUser = createAsyncThunk('users/unbanUser', async (id: string) => {
  await axios.put<User[]>(`${API_BASE_URL}/users/unban/${id}`)
  return id
})

export const createUser = async (newUser: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/users/process-register`, newUser)
  return response.data
}

export const activateUser = async (token: string) => {
  const response = await axios.post(`${API_BASE_URL}/users/activate`, { token })
  return response.data
}
export const loginUser = createAsyncThunk('users/loginUser', async (user: object) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, user)
  toast.success(response.data.message)
  return response.data
})
export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`)
  return response.data
})

export const updateUser = createAsyncThunk('users/updateUser', async (userData: Partial<User>) => {
  await axios.put(`${API_BASE_URL}/users/${userData._id}`, userData)
  return userData
})
export const forgetPassword = createAsyncThunk('users/forgetPassword', async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/users/forget-password`, { email: email })
  return response.data
})

export const restPassword = createAsyncThunk('users/restPassword', async (data: Partial<User>) => {
  const response = await axios.post(`${API_BASE_URL}/users//reset-password`, {
    password: data.password,
    token: data.token
  })
  return response.data
})

export const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
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
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload)
      state.isLoggedIn = true
      state.userData = action.payload.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    })

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (state.userData) {
        state.userData.name = action.payload.name
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
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
        state.error = action.payload || 'an error occured'
      }
    )
  }
})
export const { clearError } = usersReducer.actions
export default usersReducer.reducer
