import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false
}
export const fetchOrders = createAsyncThunk('orders/fetchCategory', async () => {
  try {
    const response = await api.get('./mock/e-commerce/orders.json')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
})

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Failed to fetch data'
      })
  }
})

export default orderReducer.reducer
