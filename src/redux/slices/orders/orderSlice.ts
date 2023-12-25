import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { User } from '../users/userSlice'
import { Product } from '../products/productsSlice'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL

export type Order = {
  _id: string
  products: Product
  payment: string
  user: User
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
export const fetchOrders = createAsyncThunk('orders/fetchOrder', async () => {
  const response = await axios.get(`${API_BASE_URL}/orders/all-orders`)
  return response.data
})
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id: string) => {
  await axios.delete(`${API_BASE_URL}/orders/${id}`)
  return id
})

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders = action.payload.payload.orders
    })
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter((order) => order._id !== action.payload)
      state.isLoading = false
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false
      state.error = 'Failed to fetch data'
    })
  }
})

export default orderReducer.reducer
