import React, { useEffect, useState } from 'react'
import DropIn from 'braintree-web-drop-in-react'
import { useDispatch } from 'react-redux'
import {
  Product,
  fetchBrainTreeToken,
  payWithBraintree
} from '../redux/slices/products/productsSlice'
import { AppDispatch } from '../redux/store'
import { toast } from 'react-toastify'

const Payment = ({ cartItems, amount }: { cartItems: Product[]; amount: number }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [braintreeClientToken, setBraintreeClientToken] = useState(null)
  const [instance, setInstance] = useState()

  const getBraintreeClientToken = async () => {
    try {
      const res = await dispatch(fetchBrainTreeToken())
      setBraintreeClientToken(res.payload.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBraintreeClientToken()
  }, [])
  const handlePayment = async () => {
    const { nonce } = await instance.requestPaymentMethod()
    const response = await dispatch(payWithBraintree({ nonce, cartItems, amount }))
    toast.success(response.payload.message)
  }

  return (
    <div>
      {braintreeClientToken && (
        <DropIn
          options={{ authorization: braintreeClientToken }}
          onInstance={(instance) => setInstance(instance)}
        />
      )}
      <div className="flex justify-center">
        <button className="text-green-800 product-button show-more-button" onClick={handlePayment}>
          Make the Bayment
        </button>
      </div>
      <br></br>
    </div>
  )
}

export default Payment
