import { ToastContainer } from 'react-toastify'
import { Index } from './routes'
import { useEffect } from 'react'
import { fetchData } from './redux/slices/products/productsSlice'
import { fetchUsers } from './redux/slices/users/userSlice'
import { fetchCategory } from './redux/slices/categories/categorySlice'
import { AppDispatch } from './redux/store'
import { useDispatch } from 'react-redux'
import { fetchOrders } from './redux/slices/orders/orderSlice'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'
function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchUsers())
    dispatch(fetchCategory())
    dispatch(fetchOrders())
  }, [])

  return (
    <div className="App">
      <Index />
      <ToastContainer />
    </div>
  )
}

export default App
