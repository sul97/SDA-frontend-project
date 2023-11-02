import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../redux/store'

const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  return (
    <aside className="sidebar">
      <Link to="/dashboard/admin" className="user-profile-link">
        <div className="user-profile">
          <h2>Admin Profile</h2>
          <p className="user-name">{`${userData?.firstName} ${userData?.lastName}`}</p>
          <p className="user-email">{`${userData?.email}`}</p>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/dashboard/admin/category">Category</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/userslist">Users</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/ordersList">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
