import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { addNewProduct, fetchData } from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevProduct) => {
      return { ...prevProduct, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newProduct = { id: new Date().getTime(), ...product }

    dispatch(fetchData()).then(() => dispatch(addNewProduct(newProduct)))
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
          <input
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
            value={product.categories}
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
            value={product.variants}
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
            value={product.sizes}
            onChange={handleChange}
            className="input-group__input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sizes" className={labelStyle}>
            Price:
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={product.price}
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
