import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link, useParams } from 'react-router-dom'

import { fetchData, findProductById } from '../redux/slices/products/productsSlice'

export const SingleProduct = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const { singlePoduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categories } = useSelector((state: RootState) => state.categoryReducer)

  useEffect(() => {
    dispatch(fetchData()).then(() => dispatch(findProductById(Number(id))))
  }, [id])

  if (isLoading) {
    return <p>Loading the data</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name + ' - ' : 'not Found'
  }

  return (
    <div className="">
      <div className="centered-content">
        {singlePoduct && (
          <article key={singlePoduct.id} className="product">
            <div className="product-card">
              <img src={singlePoduct.image} alt={singlePoduct.name} width="500" height="300" />
              <h3 className="product-title">{singlePoduct.name}</h3>
              <p className="product-description">{singlePoduct.description}</p>
              <p className="product-description">
                {singlePoduct.variants && singlePoduct.variants.join(' - ')}
              </p>
              <p className="product-description">
                {singlePoduct.categories &&
                  singlePoduct.categories.map((categoryId) => getCategoryNameById(categoryId))}
              </p>
              <h3 className="product-title">{singlePoduct.price} SAR</h3>
              <br></br>
              <button className="product-button">Add</button>
              <Link to={'/'}>
                <button className="product-button show-more-button">Back</button>
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}

export default SingleProduct
