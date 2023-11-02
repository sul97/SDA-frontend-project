import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { addUser } from '../redux/slices/users/userSlice'
import { AppDispatch } from '../redux/store'

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
  })

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newUser = { id: new Date().getTime(), ...user }
    if (user.firstName.length < 2) {
      setFirstNameError('must be at least 2 characters')
      return
    }
    if (user.lastName.length < 2) {
      setLastNameError('must be at least 2 characters')
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
    dispatch(addUser(newUser))
    toast.success('Successful Register')
    navigate('/login')
  }

  return (
    <>
      <div className="product">
        <h1 className="text-center">Register</h1>
        <div className="product-card">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  value={user.firstName}
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
                <p>{firstNameError}</p>
              </div>
              <div className="form my-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  value={user.lastName}
                  onChange={handleChange}
                  className="input-group__input"
                  required
                />
                <p>{lastNameError}</p>
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