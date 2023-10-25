import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { addNewProduct, Product } from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

const initialProductState: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0
}

const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('New product data:', product)
    product.id = +new Date()
    console.log('product:', product)

    dispatch(addNewProduct({ product }))
    setProduct(initialProductState)
    navigate('/dashboard/admin/products')
  }

  const labelStyle = 'block text-sm font-medium text-gray-600'

  return (
    <div className="product">
      <br></br>
      <h1 className="text-center">Add a new product</h1>
      <form onSubmit={handleSubmit} className="product-card">
        <div className="mb-4">
          <label htmlFor="name" className={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input-group__input"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className={labelStyle}>
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={product.image}
            onChange={handleChange}
            className="input-group__input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className={labelStyle}>
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            className="input-group__input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className={labelStyle}>
            Categories: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="categories"
            id="categories"
            value={product.categories.join(',')}
            onChange={handleChange}
            className="input-group__input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="variants" className={labelStyle}>
            Variants: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="variants"
            id="variants"
            value={product.variants.join(',')}
            onChange={handleChange}
            className="input-group__input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sizes" className={labelStyle}>
            Sizes: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="sizes"
            id="sizes"
            value={product.sizes.join(',')}
            onChange={handleChange}
            className="input-group__input"
          />
        </div>
        <button type="submit" className="product-button text-blue-900 bg-gray-300 ">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
