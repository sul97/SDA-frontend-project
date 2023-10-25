import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link, useParams } from 'react-router-dom'
import { fetchData, findProductById } from '../redux/slices/products/productsSlice'

export const SingleProduct = () => {
  const { id } = useParams()
  const { singlePoduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData()).then(() => dispatch(findProductById(Number(id))))
  }, [])

  if (isLoading) {
    return <p>Loading the data</p>
  }
  if (error) {
    return <p>{error}</p>
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
              <p className="product-description">{singlePoduct.variants}</p>
              <h3 className="product-title">{singlePoduct.price}</h3>
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
