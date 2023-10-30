import React from 'react'
import { toast } from 'react-toastify'

const Contact = () => {
  const handleClick = () => {
    toast.success('Message sent successfully')
  }
  return (
    <>
      <div className="product">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="product-card">
          <form>
            <div className="form my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="input-group__input"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="form my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="input-group__input"
                id="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="form  my-3">
              <label htmlFor="message">Message</label>
              <textarea
                rows={5}
                className="input-group__input"
                id="message"
                placeholder="Enter your message"
              />
            </div>
            <div className="text-center">
              <button
                className="text-black-50 bg-gray-300 rounded-lg hover:bg-pink-100 "
                type="button"
                onClick={handleClick}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact
