import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  items: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  items: [],
  error: null,
  isLoading: false
}
export const fetchCategory = createAsyncThunk('categories/fetchCategory', async () => {
  try {
    const response = await api.get('./mock/e-commerce/categories.json')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
})

export const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    deletetCategory: (state, action) => {
      const filterCategory = state.items.filter((category) => category.id != action.payload)
      state.items = filterCategory
    }
  },
  extraReducers: (builder) => {
    builder
      //all
      .addCase(fetchCategory.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })

      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Failed to fetch data'
      })
  }
})
export const { deletetCategory } = categoryReducer.actions
export default categoryReducer.reducer
