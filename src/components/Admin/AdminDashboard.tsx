import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import AdminSidebar from './AdminSidebar'
import { updateUser } from '../../redux/slices/users/userSlice'

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({
    name: userData?.name
  })

  const [firstNameError, setFirstNameError] = useState('')
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
    console.log(user)
    let isValid = true

    if (user.name.length < 2) {
      setFirstNameError('First name must be at least 2 characters')
      isValid = false
    }
    if (!isValid) {
      return
    }
    const updatUserData = { _id: userData?._id, ...user }
    dispatch(updateUser(updatUserData))
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
                <p className="user-name">{`${userData.name}`}</p>
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
                        name="name"
                        className="input-product "
                        value={user.name}
                        onChange={handleChange}
                        required
                      />
                      <p>{firstNameError}</p>
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
