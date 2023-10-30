import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'

import UserSidebar from './UserSidebar'

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

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
    const updatUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updatUserData))
  }
  return (
    <div className="container">
      <UserSidebar />
      <div className="py-2 p-20  w-full">
        <div className="card grid gap-4">
          <div className="py-10 p-5  w-full">
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
                      <input
                        type="text"
                        name="firstName"
                        className="input-group__input "
                        value={user.firstName}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="lastName"
                        className="input-group__input"
                        value={user.lastName}
                        onChange={handleChange}
                      />
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

export default UserProfile
