import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { logout } from '../redux/slices/users/userSlice'

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    // navigate('/')
  }
  return (
    <nav className="navbar">
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
              <Link to={`/dashboard/${userData.role}`}>
                {userData.role}
                Dashboard
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
    </nav>
  )
}

export default Navbar
