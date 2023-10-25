import React from 'react'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user-profile">
        <h2>User Profile</h2>
      </div>

      <ul>
        <li>
          <Link to="/dashboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default UserSidebar
