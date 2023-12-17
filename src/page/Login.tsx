import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, login } from '../redux/slices/users/userSlice'
import axios from 'axios'
import { baseUrl } from '../services/UserService'

const Login = ({ pathName }: { pathName: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { users } = useSelector((state: RootState) => state.usersReducer)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await axios.post(`${baseUrl}/auth/login`, user)
      navigate(`/`)
      // const foundUser = users.find((userData) => userData.email === user.email)

      // if (!foundUser) {
      //   toast.error('User not found')
      //   return
      // }
      // if (foundUser.password != user.password) {
      //   toast.error('Password does not match')
      //   return
      // }
      // if (foundUser.isBanned) {
      //   toast.error('You are blocked')
      //   return
      // }

      // if (foundUser && foundUser.password === user.password) {
      //   dispatch(login(foundUser))
      //   navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
      // } else {
      //   toast.error('somthing wrong ')
      // }
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
