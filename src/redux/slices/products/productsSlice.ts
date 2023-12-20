import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL
export type Product = {
  _id?: string
  title: string
  slug: string
  price: number
  image: string
  category: string
  description: string
  quantity: number
  sold: number
  shipping: number
  createdAt: string
  updatedAt: string
}

export type ProductState = {
  items: Product[]
  error: null | string
  pagination: {
    totalProducts: number
    totalPage: number
    currentPage: number
  }
  isLoading: boolean
  searchTerm: string
  singlePoduct: Product
  addedProduct: Product | null
}

const initialState: ProductState = {
  items: [],
  error: null,
  pagination: {
    totalProducts: 0,
    totalPage: 1,
    currentPage: 1
  },
  isLoading: false,
  searchTerm: '',
  singlePoduct: {} as Product,
  addedProduct: null
}
export const fetchData = createAsyncThunk('products/fetchData', async () => {
  const response = await axios.get(`${API_BASE_URL}/products`)
  return response.data
})

export const deleteproduct = createAsyncThunk('users/deleteProduct', async (slug: string) => {
  await axios.delete(`${API_BASE_URL}/products/${slug}`)
  return slug
})
export const createProduct = createAsyncThunk(
  'users/createProduct',
  async (newProductData: FormData) => {
    const response = await axios.post(`${API_BASE_URL}/products`, newProductData)
    console.log(response)
    return response.data
  }
)

// export const updateProduct = createAsyncThunk('users/updateProduct', async (slug: string) => {
//   try {
//     const response = await axios.put(`http://localhost:5050/products/${slug}`)
//     console.log(response)
//     return response.data.payload
//   } catch (error) {
//     console.log(error)
//   }
// })

// export const updateProduct = createAsyncThunk(
//   'users/updateProduct',
//   async (updateProductData: Product) => {
//     const { slug, ...rest } = updateProductData
//     try {
//       const response = await axios.put(`http://localhost:5050/products/${slug}`, rest)
//       return response.data.payload
//     } catch (error) {
//       console.error(error)
//       throw error
//     }
//   }
// )

// export const updateProduct = createAsyncThunk(
//   'users/updateProduct',
//   async (updateProductData: Product) => {
//     const { slug, _id, ...rest } = updateProductData
//     try {
//       const response = await axios.put(`http://localhost:5050/products/${slug}`, {
//         ...rest,
//         _id
//       })
//       return response.data.payload
//     } catch (error) {
//       console.error(error)
//       throw error
//     }
//   }
// )

export const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((product) => product._id === id)
      if (foundProduct) {
        state.singlePoduct = foundProduct
      }
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload

      if (sortingCriteria == 'name') {
        state.items.sort((a, b) => a.title.localeCompare(b.title))
      } else if (sortingCriteria == 'price') {
        state.items.sort((a, b) => a.price - b.price)
      }
    },
    // addNewProduct: (state, action) => {
    //   state.items.push(action.payload)
    // },
    // deleteProduct: (state, action) => {
    //   const filterProducts = state.items.filter((product) => product._id != action.payload)
    //   state.items = filterProducts
    // },
    updateProduct: (state, action) => {
      const { id, title, image, description, category, quantity, sold, shipping, price } =
        action.payload
      const foundProduct = state.items.find((product) => product._id == id)
      if (foundProduct) {
        foundProduct.title = title
        foundProduct.image = image
        foundProduct.description = description
        foundProduct.category = category
        foundProduct.quantity = quantity
        foundProduct.sold = sold
        foundProduct.shipping = shipping
        foundProduct.price = price
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { totalPage, currentPage, totalProducts } = action.payload.payload.pagination
      state.pagination = {
        totalProducts: totalProducts,
        totalPage: totalPage,
        currentPage: currentPage
      }
      state.items = action.payload.payload.products
      state.isLoading = false
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.items.push(action.payload.payload)
      state.isLoading = false
    })
    builder.addCase(deleteproduct.fulfilled, (state, action) => {
      state.items = state.items.filter((product) => product.slug !== action.payload)
      state.isLoading = false
    })

    // builder.addCase(updateProduct.fulfilled, (state, action) => {
    //   const { slug, title, image, description, category, quantity, sold, shipping, price } =
    //     action.payload
    //   console.log('Updating product:', slug)
    //   console.log('Before update:', state.items)
    //   const foundProduct = state.items.find((product) => product.slug === slug)
    //   if (foundProduct) {
    //     foundProduct.title = title
    //     foundProduct.image = image
    //     foundProduct.description = description
    //     foundProduct.category = category
    //     foundProduct.quantity = quantity
    //     foundProduct.sold = sold
    //     foundProduct.shipping = shipping
    //     foundProduct.price = price
    //   }
    //   console.log('After update:', state.items)
    //   state.isLoading = false
    // })

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
export const {
  sortProducts,
  searchProduct,

  findProductById
} = productsReducer.actions
export default productsReducer.reducer
