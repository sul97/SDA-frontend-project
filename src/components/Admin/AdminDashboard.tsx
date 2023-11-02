import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { updateUser } from '../../redux/slices/users/userSlice'

import AdminSidebar from './AdminSidebar'

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || ''
  })

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    let isValid = true

    if (user.firstName.length < 2) {
      setFirstNameError('First name must be at least 2 characters')
      isValid = false
    }

    if (user.lastName.length < 2) {
      setLastNameError('Last name must be at least 2 characters')
      isValid = false
    }

    if (!isValid) {
      return
    }
    const updatUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updatUserData))
    console.log(updatUserData)
  }
  return (
    <div className="container">
      <AdminSidebar />
      <div className=" main-content">
        <div className="card grid gap-4">
          <div className="p-7 w-full">
            {userData && (
              <div className="product">
                <br></br>
                <p className="user-name">{`${userData.firstName} ${userData.lastName}`}</p>
                <br></br>
                <p className="user-email">{`${userData.email}`}</p>
                <br></br>
                <div className="center-button">
                  <button
                    className="px-10 text-black-50 bg-gray-200 rounded-lg hover:bg-pink-100"
                    onClick={handleFormOpen}>
                    Edit Profile
                  </button>
                </div>
                <br></br>
                {isFormOpen && (
                  <div className="product-card ">
                    <form action="" onSubmit={handleSubmit}>
                      <label>firstName</label>
                      <input
                        type="text"
                        name="firstName"
                        className="input-product "
                        value={user.firstName}
                        onChange={handleChange}
                        required
                      />
                      <p>{firstNameError}</p>
                      <label>lastName</label>
                      <input
                        type="text"
                        name="lastName"
                        className="input-product"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                      />
                      <p>{lastNameError}</p>
                      <br></br>
                      <button className="px-10 text-black-50 bg-gray-200 rounded-lg hover:bg-pink-100 show-more-button">
                        Update
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
