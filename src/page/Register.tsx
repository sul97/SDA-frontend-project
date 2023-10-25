import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addUser, fetchUsers } from '../redux/slices/users/userSlice'
import { AppDispatch } from '../redux/store'

const Register = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newUser = { id: new Date().getTime(), ...user }

    dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
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
                <label htmlFor="FirstName">First Name</label>
                <input
                  type="text"
                  className="input-group__input"
                  id="FirstName"
                  placeholder="Enter Your First Name"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form my-3">
                <label htmlFor="LastName">Last Name</label>
                <input
                  type="text"
                  className="input-group__input"
                  id="LastName"
                  placeholder="Enter Your Last Name"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="input-group__input"
                  id="Email"
                  placeholder="name@example.com"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form  my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="input-group__input"
                  id="Password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
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
                  type="submit"
                  disabled>
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
