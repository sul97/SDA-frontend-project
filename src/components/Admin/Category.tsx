import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState, AppDispatch } from '../../redux/store'

import {
  updateCategory,
  deletetCategory,
  fetchCategory,
  createCategory
} from '../../redux/slices/categories/categorySlice'

import AdminSidebar from './AdminSidebar'

const Category = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categoryReducer)
  const [category, setCategory] = useState('')
  const [categoryEdit, setCategoryEdit] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [categoryNameError, setCategoryNameError] = useState('')

  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  // if (isLoading) {
  //   return <p>Loading the data...</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCategoryNameError('')

    let isValid = true

    if (category.length < 3) {
      setCategoryNameError('category name must be at least 3 characters')
      isValid = false
    }
    if (!isValid) {
      return
    }
    if (!categoryEdit) {
      dispatch(createCategory(category))
      setCategory('')
      toast.success('Successful Add Category')
    } else {
      dispatch(updateCategory({ _id: categoryId, name: category }))
      setCategory('')
      setCategoryEdit(false)
      toast.success('Successful Update Category')
    }
  }

  const handleEdit = (_id: string, name: string) => {
    setCategoryId(_id)
    setCategoryEdit(!categoryEdit)
    setCategory(categoryEdit ? '' : name)
  }

  const handleDeleteCategory = (_id: string) => {
    dispatch(deletetCategory(_id))
    toast.success('Successful Delete Category')
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className=" main-content">
        <div className="card grid gap-4">
          <div className="p-10 w-full">
            <div className="product">
              <br></br>
              <h1 className="text-center">Add a new Category</h1>
              <form onSubmit={handleSubmit} className="product-card">
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input-product"
                    placeholder="Enter Category Name"
                    value={category}
                    onChange={handleChange}
                    required
                  />
                  <p>{categoryNameError}</p>
                </div>
                <button
                  type="submit"
                  className="w-30 text-black-50 bg-gray-200 rounded-lg hover:bg-pink-100 show-more-button">
                  {categoryEdit ? 'Update' : 'Add Category +'}
                </button>
              </form>
            </div>
          </div>
          <section className="products">
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <article key={category._id} className="product">
                    <div className="product-card">
                      <h3 className="product-title">{category.name}</h3>
                      <br></br>
                      <button
                        className="text-green-800 product-button"
                        onClick={() => {
                          handleEdit(category._id, category.name)
                        }}>
                        Edit
                      </button>
                      <button
                        className="text-red-400 product-button show-more-button"
                        onClick={() => {
                          handleDeleteCategory(category._id)
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
