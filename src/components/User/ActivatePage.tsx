import React from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { activateUser } from '../../redux/slices/users/userSlice'

const ActivatePage = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const decoded = jwtDecode(String(token))

  const handleActivate = async () => {
    try {
      const response = await activateUser(String(token))
      toast.success(`${response.message}`)
      navigate('/login')
    } catch (error: any) {
      toast.error(`${error.response.data.message}`)
    }
  }
  return (
    <div>
      <h1>Hello {decoded.name} !!</h1>
      <h2>click the button for activating your account</h2>
      <br></br>
      <div className="text-center">
        <button
          onClick={handleActivate}
          className="text-black-50 bg-gray-300 rounded-lg hover:bg-pink-100 ">
          Activate Your Account
        </button>
      </div>
      <br></br>
    </div>
  )
}

export default ActivatePage
