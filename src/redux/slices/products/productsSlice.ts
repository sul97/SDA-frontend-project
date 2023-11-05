import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singlePoduct: Product
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singlePoduct: {} as Product
}
export const fetchData = createAsyncThunk('products/fetchData', async () => {
  try {
    const response = await api.get('./mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
})

export const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((product) => product.id === id)
      if (foundProduct) {
        state.singlePoduct = foundProduct
      }
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload

      if (sortingCriteria == 'name') {
        state.items.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria == 'price') {
        state.items.sort((a, b) => a.price - b.price)
      }
    },
    addNewProduct: (state, action) => {
      state.items.push(action.payload)
    },
    deleteProduct: (state, action) => {
      const filterProducts = state.items.filter((product) => product.id != action.payload)
      state.items = filterProducts
    },
    updateProduct: (state, action) => {
      const { id, name, image, description, categories, variants, sizes, price } = action.payload
      const foundProduct = state.items.find((product) => product.id == id)
      if (foundProduct) {
        foundProduct.name = name
        foundProduct.image = image
        foundProduct.description = description
        foundProduct.categories = categories
        foundProduct.variants = variants
        foundProduct.sizes = sizes
        foundProduct.price = price
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })

      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Failed to fetch data'
      })
  }
})
export const {
  sortProducts,
  searchProduct,
  addNewProduct,
  deleteProduct,
  updateProduct,
  findProductById
} = productsReducer.actions
export default productsReducer.reducer
