import React, { ChangeEvent, FormEvent, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { restPassword } from '../redux/slices/users/userSlice'

const ActivatePasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const decoded = jwtDecode(String(token))

  const dispatch = useDispatch<AppDispatch>()
  const [password, setPassword] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(restPassword({ password, token }))
    console.log('password updated successfully')
    navigate('/login')
  }
  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="login-card">
            <h2 className="login-title">Login</h2>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="login-input"
                placeholder="Enter your New password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="login-button text-black-50 bg-gray-300 rounded-lg hover:bg-pink-100">
              resate password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ActivatePasswordPage
