import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, loginUser } from '../redux/slices/users/userSlice'

const Login = ({ pathName = '' }: { pathName: string }) => {
  const { users, userData } = useSelector((state: RootState) => state.usersReducer)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  useEffect(() => {
    if (userData) {
      navigate(
        pathName ? pathName : `/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`
      )
    }
  }, [userData, navigate, pathName])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      dispatch(loginUser(user))
      // toast.success('Successful login')
      // navigate(`/dashboard/${userData?.isAdmin ? 'admin' : 'user'}`)
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="login-input"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="login-input"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="login-button text-black-50 bg-gray-300 rounded-lg hover:bg-pink-100">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
