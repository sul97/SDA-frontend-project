import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteProduct, fetchData } from '../../redux/slices/products/productsSlice'
import { RootState, AppDispatch } from '../../redux/store'

import AdminSidebar from './AdminSidebar'
import { Link } from 'react-router-dom'

const Products = () => {
  const { items, isLoading, error } = useSelector((state: RootState) => state.productsReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading the data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id))
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="py-2 p-2 w-full">
        <Link to="/dashboard/admin/addproduct">
          <button className="product-button text-pink-800 ">Add New Product +</button>
        </Link>
        <div className="card grid gap-4">
          <section className="products">
            {items.length > 0 &&
              items.map((items) => {
                return (
                  <article key={items.id} className="product">
                    <div className="product-card">
                      <img src={items.image} alt={items.name} width="300" />
                      <h3 className="product-title">{items.name}</h3>

                      <button className="text-green-800 product-button"> Edit</button>
                      <button
                        className="text-red-500 product-button show-more-button"
                        onClick={() => {
                          handleDeleteProduct(items.id)
                        }}>
                        Delete
                      </button>
                    </div>
                  </article>
                )
              })}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Products
