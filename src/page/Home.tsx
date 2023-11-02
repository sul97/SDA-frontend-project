import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { fetchData, searchProduct, Product } from '../redux/slices/products/productsSlice'
import { addToCart } from '../redux/slices/cart/cartSlice'

import SortProduct from '../components/SortProduct'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const [selectCategory, setSelectCategory] = useState<number | ''>('')

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading the data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  //addCart
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success('Successful Add To Cart')
  }
  //search
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchProductName = event.target.value
    dispatch(searchProduct(searchProductName))
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

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const buttonElements = []
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(
      <button
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </button>
    )
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  return (
    <div>
      <br></br>
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
        {currentItems.length > 0 &&
          currentItems.map((items) => {
            const { id, name, image, price } = items
            return (
              <article key={id} className="product">
                <div className="product-card">
                  <img src={image} alt={name} />
                  <h1 className="product-title">{name}</h1>
                  <h2 className="product-description">{price} SAR</h2>
                  <button
                    className="product-button"
                    onClick={() => {
                      handleAddToCart(items)
                    }}>
                    Add to Cart
                  </button>
                  <Link to={`/product/${id}`}>
                    <button className="product-button show-more-button">show more</button>
                  </Link>
                </div>
              </article>
            )
          })}
      </section>
      <br></br>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {buttonElements}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <br></br>
    </div>
  )
}

export default Home
