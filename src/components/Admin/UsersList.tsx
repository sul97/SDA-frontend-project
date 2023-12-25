import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import {
  banUser,
  unbanUser,
  deleteUser,
  fetchUsers,
  clearError,
  roleUser
} from '../../redux/slices/users/userSlice'
import { RootState, AppDispatch } from '../../redux/store'

import AdminSidebar from './AdminSidebar'

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, error } = useSelector((state: RootState) => state.usersReducer)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      const toastId = toast.error(error, {
        onClose: () => {
          dispatch(clearError())
        }
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 1000)
    }
  }, [error])

  const handleDelete = async (id: string) => {
    await dispatch(deleteUser(id))
    toast.success('Successful Delete User')
  }
  const handleBlockAndUnBlock = async (id: string, isBanned: boolean) => {
    try {
      const response = isBanned ? dispatch(unbanUser(id)) : dispatch(banUser(id))
      toast.success(`User ${isBanned ? 'Unblocked' : 'Blocked'} successfully`)
    } catch (error) {
      toast.error('Error Blocking')
    }
  }
  const handleUserRole = async (id: string) => {
    try {
      dispatch(roleUser(id))
      toast.success('successfully changed role')
    } catch (error) {
      toast.error('Error updating role')
    }
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
                  if (!user.isAdmin) {
                    return (
                      <article key={user._id} className="product">
                        <div className="product-card">
                          <img src={user.image} alt={user.image} />
                          <h3 className="product-title">{user.name}</h3>
                          <p className="product-description">{user.email}</p>
                          <button
                            className="text-red-800 product-button"
                            onClick={() => {
                              handleBlockAndUnBlock(user._id, user.isBanned)
                            }}>
                            {user.isBanned ? 'unblock' : 'block'}
                          </button>
                          <button
                            className="text-red-400 product-button show-more-button"
                            onClick={() => {
                              handleDelete(user._id)
                            }}>
                            Delete
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="text-green-800 product-button show-more-button"
                            onClick={() => {
                              handleUserRole(user._id)
                            }}>
                            change role to Admin
                          </button>
                        </div>
                        <br></br>
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
