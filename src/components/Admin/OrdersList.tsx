import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { deleteOrder, fetchOrders } from '../../redux/slices/orders/orderSlice'

import AdminSidebar from './AdminSidebar'
import { toast } from 'react-toastify'

const OrdersList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { orders } = useSelector((state: RootState) => state.orderReducer)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])
  console.log(orders)
  const handleDeleteProduct = (_id: string) => {
    dispatch(deleteOrder(_id))
    toast.success('Successful Delete Product')
  }
  return (
    <div className="container">
      <AdminSidebar />
      <div className=" main-content">
        <div className="card grid gap-4">
          <div className="p-10 w-full">
            <section className="products">
              {orders.length > 0 &&
                orders.map((order) => {
                  return (
                    <article key={order._id} className="product">
                      <div
                        className="product-card"
                        style={{ display: 'grid', placeItems: 'center' }}>
                        <h2>{order.user.name}</h2>
                        <h2>Amount :</h2>
                        <p>{order.payment.transaction.amount}</p>
                        <h2>Status:</h2>
                        <p>{order.status}</p>
                        <h2>created At:</h2>
                        <p>{order.createdAt}</p>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="text-red-500 product-button show-more-button"
                          onClick={() => {
                            handleDeleteProduct(order._id)
                          }}>
                          Delete
                        </button>
                      </div>
                      <br></br>
                    </article>
                  )
                })}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersList
