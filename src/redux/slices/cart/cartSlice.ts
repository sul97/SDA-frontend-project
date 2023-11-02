import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../products/productsSlice'

const data =
  localStorage.getItem('cart') != null ? JSON.parse(String(localStorage.getItem('cart'))) : []

type cartState = {
  cartItems: Product[]
}

const initialState: cartState = {
  cartItems: data
}
export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    deletetCart: (state, action) => {
      state.cartItems = state.cartItems.filter((cart) => cart.id != action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    deletetAllCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cart')
    }
  }
})

export const { addToCart, deletetCart, deletetAllCart } = cartReducer.actions
export default cartReducer.reducer
