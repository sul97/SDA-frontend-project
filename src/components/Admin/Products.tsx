import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'

import {
  createProduct,
  deleteproduct,
  fetchProducts,
  updateProduct
} from '../../redux/slices/products/productsSlice'

import AdminSidebar from './AdminSidebar'
import { fetchCategory } from '../../redux/slices/categories/categorySlice'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items } = useSelector((state: RootState) => state.productsReducer)
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const [productEdit, setProductEdit] = useState(false)
  const [productId, setProductId] = useState('')
  const [product, setProduct] = useState({
    title: '',
    slug: '',
    image: '',
    description: '',
    category: '',
    quantity: 0,
    sold: 0,
    shipping: 0,
    price: 0
  })
  const [productNameError, setProductNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [categoriesError, setCategoriesError] = useState([''])
  const [priceErrorMessage, setPriceErrorMessage] = useState('')
  const [priceError, setPriceError] = useState(0)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      setProduct((prevProduct) => {
        return { ...prevProduct, [event.target.name]: fileInput.files?.[0] }
      })
    } else {
      setProduct((prevProduct) => {
        return { ...prevProduct, [event.target.name]: event.target.value }
      })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('price', product.price.toString())
    formData.append('image', product.image)
    formData.append('category', product.category.toString())
    formData.append('description', product.description)
    formData.append('quantity', product.quantity.toString())
    formData.append('sold', product.sold.toString())
    formData.append('shipping', product.shipping.toString())
    // let isValid = true

    // if (product.title.length < 2) {
    //   setProductNameError('Product name  must be at least 3 characters')
    //   isValid = false
    // }

    // if (product.description.length < 5) {
    //   setDescriptionError('Description must be at least 5 characters')
    //   isValid = false
    // }

    // if (product.category.length === 0) {
    //   setCategoriesError(['At least one category is required'])
    //   isValid = false
    // }

    // if (product.price <= 0) {
    //   setPriceError(0)
    //   setPriceErrorMessage('Price must be a positive number')
    //   isValid = false
    // }

    // if (!isValid) {
    //   return
    // }
    if (!productEdit) {
      dispatch(createProduct(formData))
      setProduct({
        title: '',
        slug: '',
        image: '',
        description: '',
        category: '',
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0
      })
    } else {
      dispatch(updateProduct({ slug: product.slug, formData: formData }))
      toast.success('Successful Update Product')
      setProduct({
        title: '',
        slug: '',
        image: '',
        description: '',
        category: '',
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0
      })
    }
  }
  const handleEdit = (
    _id: string,
    slug: string,
    title: string,
    image: string,
    description: string,
    category: string,
    quantity: number,
    sold: number,
    shipping: number,
    price: number
  ) => {
    setProductId(_id)
    setProductEdit(!productEdit)
    if (!productEdit) {
      setProduct({
        title,
        slug,
        image,
        description,
        category: category ? category._id : '',
        quantity,
        sold,
        shipping,
        price
      })
    } else {
      setProduct({
        title: '',
        slug: slug,
        image: '',
        description: '',
        category: '',
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0
      })
    }
  }

  const handleDeleteProduct = (slug: string) => {
    dispatch(deleteproduct(slug))
    toast.success('Successful Delete Product')
  }
  const labelStyle = 'block text-sm font-medium text-gray-800'
  return (
    <div className="container">
      <AdminSidebar />
      <div className=" main-content">
        <div className="card grid gap-4">
          <div className="py-2  w-full">
            <div className="product">
              <br></br>
              <h1 className="text-center">Add a new product</h1>
              <form onSubmit={handleSubmit} className="product-card">
                <div className="mb-4">
                  <label htmlFor="title" className={labelStyle}>
                    title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="input-product"
                    value={product.title}
                    onChange={handleChange}
                    required
                  />
                  <p>{productNameError}</p>
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
                    className="input-product"
                    required
                  />
                  <p>{descriptionError}</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className={labelStyle}>
                    Categories: (use comma , to create multiple)
                  </label>
                  <select
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={product.category}>
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <p>{categoriesError}</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity" className={labelStyle}>
                    quantity: (use comma , to create multiple)
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    className="input-product"
                    required
                  />
                  {/* <p>{variantsError}</p> */}
                </div>
                <div className="mb-4">
                  <label htmlFor="sold" className={labelStyle}>
                    sold: (use comma , to create multiple)
                  </label>
                  <input
                    type="text"
                    name="sold"
                    id="sold"
                    value={product.sold}
                    onChange={handleChange}
                    className="input-product"
                    required
                  />
                  {/* <p>{sizesError}</p> */}
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className={labelStyle}>
                    Price:
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    className="input-product"
                    required
                  />
                  <p>{priceErrorMessage}</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className={labelStyle}>
                    Image URL:
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="input-group__input"
                    // required
                  />
                </div>
                <button type="submit" className="product-button text-blue-900 bg-gray-300 ">
                  {productEdit ? 'Update' : 'Add Product +'}
                </button>
              </form>
            </div>
          </div>
          <section className="products">
            {items.length > 0 &&
              items.map((items) => {
                return (
                  <article key={items._id} className="product">
                    <div className="product-card">
                      <img src={items.image} alt={items.title} width="300" />
                      <h3 className="product-title">{items.title}</h3>
                      <p className="product-description">{items.description}</p>
                      <p className="product-description">quantity: {items.quantity}</p>
                      <p className="product-description">sold: {items.sold}</p>
                      <h3 className="product-title">{items.price} SAR</h3>
                      <button
                        className="text-green-800 product-button"
                        onClick={() => {
                          handleEdit(
                            items._id,
                            items.slug,
                            items.title,
                            items.image,
                            items.description,
                            items.category,
                            items.quantity,
                            items.sold,
                            items.shipping,
                            items.price
                          )
                        }}>
                        Edit
                      </button>
                      <button
                        className="text-red-500 product-button show-more-button"
                        onClick={() => {
                          handleDeleteProduct(items.slug)
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

export default Products
