import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { AppDispatch, RootState } from '../redux/store'
import { fetchData, searchProduct } from '../redux/slices/products/productsSlice'
import SortProduct from '../components/SortProduct'
import { Link } from 'react-router-dom'

const Home = () => {
  const { items, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
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
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }

  const filterProducts = searchTerm
    ? items.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : items

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

        <SortProduct />
      </div>
      <section className="products">
        {filterProducts.length > 0 &&
          filterProducts.map((items) => {
            const { id, name, image, price } = items
            return (
              <article key={id} className="product">
                <div className="product-card">
                  <img src={image} alt={name} />
                  <h1 className="product-title">{name}</h1>
                  <h2 className="product-description">{price} SR</h2>
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
