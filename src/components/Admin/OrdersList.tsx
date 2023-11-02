import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { fetchOrders } from '../../redux/slices/orders/orderSlice'

import AdminSidebar from './AdminSidebar'

const OrdersList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orderReducer)
  const { items } = useSelector((state: RootState) => state.productsReducer)
  const { users } = useSelector((state: RootState) => state.usersReducer)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading the data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  const getProductNameById = (producttId: number) => {
    const product = items.find((product) => product.id == producttId)
    return product ? product.name : ''
  }
  const getUserNameById = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    return user ? user.firstName : '- User -'
  }
  return (
    <div className="container">
      <AdminSidebar />
      <div className=" main-content">
        <div className="card grid gap-4">
          <div className="p-10 w-full">
            <section className="products">
              {orders.length > 0 &&
                orders.map((orders) => {
                  return (
                    <article key={orders.id} className="product">
                      <div className="product-card">
                        <h3 className="product-title">
                          {orders.productId && getProductNameById(orders.productId)}
                        </h3>

                        <h3 className="product-description">
                          {orders.userId && getUserNameById(orders.userId)}
                        </h3>
                        <h3 className="product-description">{orders.purchasedAt}</h3>
                      </div>
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
