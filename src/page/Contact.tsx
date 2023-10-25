import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="product">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="product-card">
          <form>
            <div className="form my-3">
              <label htmlFor="Name">Name</label>
              <input
                type="email"
                className="input-group__input"
                id="Name"
                placeholder="Enter your name"
              />
            </div>
            <div className="form my-3">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                className="input-group__input"
                id="Email"
                placeholder="name@example.com"
              />
            </div>
            <div className="form  my-3">
              <label htmlFor="Password">Message</label>
              <textarea
                rows={5}
                className="input-group__input"
                id="Password"
                placeholder="Enter your message"
              />
            </div>
            <div className="text-center">
              <button
                className="text-black-50 bg-gray-300 rounded-lg hover:bg-pink-100 "
                type="submit"
                disabled>
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
