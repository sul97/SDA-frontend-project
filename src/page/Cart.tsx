import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { FaTrashAlt } from 'react-icons/fa'

import { deletetAllCart, deletetCart } from '../redux/slices/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const handelRemoveFromCart = (id: number) => {
    dispatch(deletetCart(id))
  }

  const handelRemoveAllCart = () => {
    dispatch(deletetAllCart())
  }

  const cartTotal = () => {
    let totalAmount = 0
    cartItems.length > 0 &&
      cartItems.map((cartItem) => (totalAmount = totalAmount + cartItem.price))
    return totalAmount
  }
  return (
    <div>
      <h1> You have - {cartItems.length > 0 ? cartItems.length : 0} - items in the cart</h1>
      <div className="action">
        <button
          className="remov-button p-3 text-red-700 bg-gray-200 rounded-lg hover:bg-pink-100 show-more-button"
          onClick={() => {
            handelRemoveAllCart()
          }}>
          Remove All Items
          <FaTrashAlt />
        </button>
        <div>
          <label className="product p-3">Total: {cartTotal()}</label>
        </div>
      </div>
      <section className="products">
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => {
            const { id, name, image, price, description } = cartItem
            return (
              <article key={id} className="product-card">
                <div className="product">
                  <img src={image} alt={name} />
                  <div className="cart-item-info">
                    <h2 className="product-title">{name}</h2>
                    <p className="product-description">Price: {price} SAR</p>
                    <p className="product-description">
                      Discription:{description.substring(0, 13)}...
                    </p>
                  </div>
                  <button
                    className="text-red-400"
                    onClick={() => {
                      handelRemoveFromCart(cartItem.id)
                    }}>
                    <FaTrashAlt />
                  </button>
                  <br></br>
                  <br></br>
                </div>
              </article>
            )
          })}
      </section>
    </div>
  )
}

export default Cart
