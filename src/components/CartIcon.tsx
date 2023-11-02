import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const CartIcon = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <FaShoppingCart />
      <span className="span-icon">{value}</span>
    </div>
  )
}

export default CartIcon
