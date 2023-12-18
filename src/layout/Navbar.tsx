import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'

import { logoutUser } from '../redux/slices/users/userSlice'

import CartIcon from '../components/CartIcon'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <ul>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to={`/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`}>
                  {userData && userData.isAdmin ? 'admin' : 'user'} Dashboard
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <CartIcon value={cartItems.length > 0 ? cartItems.length : 0} />
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
