import { Outlet, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Login from '../page/Login'

const AdminRoute = () => {
  const location = useLocation()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  return isLoggedIn && userData.role === 'admin' ? (
    <Outlet />
  ) : (
    <Login pathName={location.pathname} />
  )
}

export default AdminRoute
