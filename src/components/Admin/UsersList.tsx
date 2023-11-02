import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteUser, fetchUsers, blockUser } from '../../redux/slices/users/userSlice'
import { RootState, AppDispatch } from '../../redux/store'

import AdminSidebar from './AdminSidebar'

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, isLoading, error } = useSelector((state: RootState) => state.usersReducer)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading the data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }
  const handleBlock = (id: number) => {
    dispatch(blockUser(id))
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className=" main-content">
        <div className="card grid gap-4">
          <div className="p-10 w-full">
            <section className="products">
              {users.length > 0 &&
                users.map((user) => {
                  if (user.role != 'admin') {
                    return (
                      <article key={user.id} className="product">
                        <div className="product-card">
                          <h3 className="product-title">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="product-description">{user.email}</p>
                          <p className="product-description">{user.role}</p>
                          <button
                            className="text-red-800 product-button"
                            onClick={() => {
                              handleBlock(user.id)
                            }}>
                            {user.ban ? 'unblock' : 'block'}
                          </button>
                          <button
                            className="text-red-400 product-button show-more-button"
                            onClick={() => {
                              handleDelete(user.id)
                            }}>
                            Delete
                          </button>
                        </div>
                      </article>
                    )
                  }
                })}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList
