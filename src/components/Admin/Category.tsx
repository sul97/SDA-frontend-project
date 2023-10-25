import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { deletetCategory, fetchCategory } from '../../redux/slices/categories/categorySlice'

export type Category = {
  id: number
  name: string
}

const Category = () => {
  const { items, isLoading, error } = useSelector((state: RootState) => state.categoryReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading the data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  const handleDeleteCategory = (id: number) => {
    dispatch(deletetCategory(id))
  }
  const labelStyle = 'block text-sm font-medium text-gray-600'
  return (
    <div className="container">
      <AdminSidebar />
      <div className="py-2 p-20  w-full">
        <label htmlFor="name" className={labelStyle}></label>
        <input
          type="text"
          name="name"
          id="name"
          className="input-group__input"
          placeholder="Add Category Name"
        />
        <button
          type="submit"
          className="w-30 text-black-50 bg-gray-200 rounded-lg hover:bg-pink-100 show-more-button">
          Add Category +
        </button>

        <div className="card grid gap-4">
          <section className="products">
            {items.length > 0 &&
              items.map((items) => {
                return (
                  <article key={items.id} className="product">
                    <div className="product-card">
                      <h3 className="product-title">{items.name}</h3>
                      <button className="text-green-800 product-button"> Edit</button>
                      <button
                        className="text-red-400 product-button show-more-button"
                        onClick={() => {
                          handleDeleteCategory(items.id)
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

export default Category
