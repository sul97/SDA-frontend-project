import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AppDispatch } from '../redux/store'
import { createUser } from '../redux/slices/users/userSlice'

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    address: '',
    phone: ''
  })

  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: fileInput.files?.[0] }
      })
    } else {
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: event.target.value }
      })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('address', user.address)
    formData.append('phone', user.phone)
    formData.append('image', user.image)

    if (user.name.length < 2) {
      setNameError('must be at least 2 characters')
      return
    }
    if (user.password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }
    if (!/[A-Z]/.test(user.password)) {
      setPasswordError('Password must contain at least one uppercase letter')
      return
    }
    if (!/[@#$%^&+=]/.test(user.password)) {
      setPasswordError('Password must contain at least one special character')
      return
    }

    try {
      const response = await createUser(formData)
      toast.success(`${response.message}`)
      navigate('/login')
    } catch (error: any) {
      toast.error(`Error adding user ${error.response.data.message}`)
    }
  }

  return (
    <>
      <div className="product">
        <h1 className="text-center">Register</h1>
        <div className="product-card">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  value={user.name}
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
                <p>{nameError}</p>
              </div>
              <div className="form my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={user.email}
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
              </div>
              <div className="form  my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
                <p>{passwordError}</p>
              </div>
              <div className="form my-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="0500000000"
                  value={user.phone}
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="aaa - bbb - ddd"
                  value={user.address}
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="image">Profile image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
              </div>
              <div className="my-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button
                  className="text-black-50 bg-gray-300 rounded-lg hover:bg-pink-100 "
                  type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
