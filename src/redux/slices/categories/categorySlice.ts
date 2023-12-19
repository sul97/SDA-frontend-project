import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL

export type Category = {
  _id: string
  name: string
  slug: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  status: string
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  status: ''
}
export const fetchCategory = createAsyncThunk('categories/fetchCategory', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
})

export const deletetCategory = createAsyncThunk(
  'categories/deletetCategory',
  async (_id: string) => {
    await axios.delete(`${API_BASE_URL}/categories/${_id}`)
    return _id
  }
)
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (name: string) => {
    const response = await axios.post(`${API_BASE_URL}/categories`, { name: name })
    return response.data
  }
)
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: Partial<Category>) => {
    await axios.put(`${API_BASE_URL}/categories/${category._id}`, {
      name: category.name
    })
    return category
  }
)
export const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      // state.status = action.payload.meassge
      console.log(action.payload)
      state.isLoading = false
      state.categories = action.payload.payload
    })
    builder.addCase(deletetCategory.fulfilled, (state, action) => {
      console.log(action.payload)
      const filterCategory = state.categories.filter((category) => category._id !== action.payload)
      state.categories = filterCategory
      state.isLoading = false
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      console.log(action.payload)
      state.categories.push(action.payload.payload)
      state.isLoading = false
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { _id, name } = action.payload
      const foundCategory = state.categories.find((category) => category._id === _id)
      if (foundCategory && name) {
        foundCategory.name = name
      }
      state.isLoading = false
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
// export const {  } = categoryReducer.actions
export default categoryReducer.reducer
