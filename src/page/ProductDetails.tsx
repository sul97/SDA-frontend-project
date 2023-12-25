import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link, useParams } from 'react-router-dom'

import { Product, fetchData, findProductBySlug } from '../redux/slices/products/productsSlice'
import { toast } from 'react-toastify'
import { addToCart } from '../redux/slices/cart/cartSlice'

export const SingleProduct = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { slug } = useParams()
  const { singlePoduct } = useSelector((state: RootState) => state.productsReducer)

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success('Successful Add To Cart')
  }
  useEffect(() => {
    dispatch(fetchData()).then(() => dispatch(findProductBySlug(String(slug))))
  }, [])

  const getCategoryName = (categoryId: string) => {
    return categoryId ? categoryId.name : 'Category not found'
  }

  return (
    <div className="">
      <div className="centered-content">
        {singlePoduct && (
          <article key={singlePoduct._id} className="product">
            <div className="product-card">
              <img src={singlePoduct.image} alt={singlePoduct.title} width="500" height="300" />
              <h3 className="product-title">{singlePoduct.title}</h3>
              <p className="product-description">{singlePoduct.description}</p>

              <p className="product-description">
                <span>Category : {getCategoryName(singlePoduct.category)}</span>
              </p>

              <h3 className="product-title">{singlePoduct.price} SAR</h3>
              <br></br>
              <button
                className="product-button"
                onClick={() => {
                  handleAddToCart(singlePoduct)
                }}>
                Add to Cart
              </button>
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
