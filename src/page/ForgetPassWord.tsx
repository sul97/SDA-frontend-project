import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { forgetPassword } from '../redux/slices/users/userSlice'
import { toast } from 'react-toastify'

const ForgetPassWord = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const response = await dispatch(forgetPassword(email))
    toast.success(`${response.payload.message}`)
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
              value={email}
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
  )
}

export default ForgetPassWord
