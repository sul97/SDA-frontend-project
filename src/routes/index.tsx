import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import AdminDashboard from '../components/Admin/AdminDashboard'
import ProductDetails from '../page/ProductDetails'
import Category from '../components/Admin/Category'
import Error from '../page/Error'
import UserDashboard from '../components/User/UserDashboard'
import Navbar from '../layout/Navbar'
import Contact from '../page/Contact'
import Footer from '../layout/Footer'
import UserProfile from '../components/User/UserProfile'
import UsersList from '../components/Admin/UsersList'
import Login from '../page/Login'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import Register from '../page/Register'
import Products from '../components/Admin/Products'
import OrdersList from '../components/Admin/OrdersList'
import UserOrders from '../components/User/UserOrders'
import Cart from '../page/Cart'

export const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserDashboard />}></Route>
          <Route path="user/profile" element={<UserProfile />}></Route>
          <Route path="user/orders" element={<UserOrders />}></Route>
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="admin/category" element={<Category />}></Route>
          <Route path="admin/products" element={<Products />}></Route>
          <Route path="admin/userslist" element={<UsersList />}></Route>
          <Route path="admin/ordersList" element={<OrdersList />}></Route>
        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
