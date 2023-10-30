import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { AppDispatch, RootState } from '../redux/store'
import { fetchData, searchProduct, Product } from '../redux/slices/products/productsSlice'
import { Link } from 'react-router-dom'

import SortProduct from '../components/SortProduct'

const Home = () => {
  const { items, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const [selectCategory, setSelectCategory] = useState<number | ''>('')

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
  //search
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }

  const filterProducts = searchTerm
    ? items.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : items

  //category
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value
    setSelectCategory(selectedCategory === '' ? '' : Number(selectedCategory))
  }

  const filterProductsByCategory = (products: Product[], category: number | '') => {
    if (category === '') {
      return products
    }
    return products.filter((product) => product.categories.includes(category))
  }

  const filteredProducts = filterProductsByCategory(filterProducts, selectCategory)

  return (
    <div>
      <h1>Products</h1>
      <div className="action">
        <input
          type="text"
          className="input-group__input"
          placeholder="Enter product Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <label htmlFor="sort">Selecte Category: </label>
          <select value={selectCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <SortProduct />
      </div>
      <section className="products">
        {filteredProducts.length > 0 &&
          filteredProducts.map((items) => {
            const { id, name, image, price } = items
            return (
              <article key={id} className="product">
                <div className="product-card">
                  <img src={image} alt={name} />
                  <h1 className="product-title">{name}</h1>
                  <h2 className="product-description">{price} SAR</h2>
                  <button className="product-button">Add</button>
                  <Link to={`/product/${id}`}>
                    <button className="product-button show-more-button">show more</button>
                  </Link>
                </div>
              </article>
            )
          })}
      </section>
    </div>
  )
}

export default Home
