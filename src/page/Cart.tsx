import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { FaTrashAlt } from 'react-icons/fa'

import { deletetAllCart, deletetCart } from '../redux/slices/cart/cartSlice'
import Payment from '../components/Payment'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const { isLoggedIn } = useSelector((state: RootState) => state.usersReducer)
  const handelRemoveFromCart = (_id: string) => {
    dispatch(deletetCart(_id))
  }

  const handelRemoveAllCart = () => {
    dispatch(deletetAllCart())
  }

  const cartTotal = () => {
    return cartItems.reduce((totalAmount, cartItem) => totalAmount + cartItem.price, 0)
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
            const { _id, title, image, price, description } = cartItem
            return (
              <article key={_id} className="product-card">
                <div className="product">
                  <img src={image} alt={title} />
                  <div className="cart-item-info">
                    <h2 className="product-title">{title}</h2>
                    <p className="product-description">Price: {price} SAR</p>
                    <p className="product-description">
                      Discription:{description.substring(0, 13)}...
                    </p>
                  </div>
                  <button
                    className="text-red-400"
                    onClick={() => {
                      handelRemoveFromCart(cartItem._id)
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
      <div>
        {isLoggedIn ? (
          <div className="flex justify-center">
            {cartItems.length > 0 ? (
              <Payment cartItems={cartItems} amount={cartTotal()} />
            ) : (
              <h1>Your cart is empty.</h1>
            )}
          </div>
        ) : (
          <h1>Please log in first</h1>
        )}
      </div>
    </div>
  )
}

export default Cart
