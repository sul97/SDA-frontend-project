import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import productsSlice from './slices/products/productsSlice'
import categorySlice from './slices/categories/categorySlice'
import userSlice from './slices/users/userSlice'
import orderSlice from './slices/orders/orderSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productsReducer: productsSlice,
    categoryReducer: categorySlice,
    usersReducer: userSlice,
    orderReducer: orderSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
