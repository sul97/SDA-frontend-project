import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../redux/store'

const UserSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  return (
    <aside className="sidebar">
      <Link to="/dashboard/user" className="user-profile-link">
        <div className="user-profile">
          <h2>User Profile</h2>
          <p className="user-name">{`${userData?.firstName} ${userData?.lastName}`}</p>
          <p className="user-email">{`${userData?.email}`}</p>
        </div>
      </Link>

      <ul>
        <li>
          <Link to="/dashboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders">My Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default UserSidebar
