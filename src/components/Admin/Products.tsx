import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  addNewProduct,
  deleteProduct,
  fetchData,
  updateProduct
} from '../../redux/slices/products/productsSlice'
import { RootState, AppDispatch } from '../../redux/store'

import AdminSidebar from './AdminSidebar'

const Products = () => {
  const { items, isLoading, error } = useSelector((state: RootState) => state.productsReducer)
  const [productEdit, setProductEdit] = useState(false)
  const [productId, setProductId] = useState(0)
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    categories: [0],
    variants: [''],
    sizes: [''],
    price: 0
  })

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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!productEdit) {
      const newProduct = { id: new Date().getTime(), ...product }
      dispatch(addNewProduct(newProduct))
      toast.success('Successful Add Product')
    } else {
      const updateProducts = {
        id: productId,
        name: product.name,
        image: product.image,
        description: product.description,
        categories: product.categories,
        variants: product.variants,
        sizes: product.sizes,
        price: product.price
      }
      dispatch(updateProduct(updateProducts))
      toast.success('Successful Update Product')
    }
  }
  const handleEdit = (
    id: number,
    name: string,
    image: string,
    description: string,
    categories: number[],
    variants: string[],
    sizes: string[],
    price: number
  ) => {
    setProductId(id)
    setProductEdit(!productEdit)
    if (!productEdit) {
      setProduct({
        name,
        image,
        description,
        categories,
        variants,
        sizes,
        price
      })
    } else {
      setProduct({
        name: '',
        image: '',
        description: '',
        categories: [],
        variants: [],
        sizes: [],
        price: 0
      })
    }
  }
  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id))
  }
  const labelStyle = 'block text-sm font-medium text-gray-800'
  return (
    <div className="container">
      <AdminSidebar />
      <div className=" main-content">
        <div className="card grid gap-4">
          <div className="py-2 p-20 w-full">
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
                    className="input-product"
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
                    className="input-product"
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
                    className="input-product"
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
                    value={product.categories.join(' - ')}
                    onChange={handleChange}
                    className="input-product"
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
                    value={product.variants.join(' - ')}
                    onChange={handleChange}
                    className="input-product"
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
                    value={product.sizes.join(' - ')}
                    onChange={handleChange}
                    className="input-product"
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
                    className="input-product"
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
                  <article key={items.id} className="product">
                    <div className="product-card">
                      <img src={items.image} alt={items.name} width="300" />
                      <h3 className="product-title">{items.name}</h3>
                      <p className="product-description">{items.description}</p>
                      <p className="product-description">{items.variants}</p>
                      <p className="product-description">{items.categories}</p>
                      <p className="product-description">{items.sizes}</p>
                      <h3 className="product-title">{items.price} SAR</h3>
                      <button
                        className="text-green-800 product-button"
                        onClick={() => {
                          handleEdit(
                            items.id,
                            items.name,
                            items.image,
                            items.description,
                            items.categories,
                            items.variants,
                            items.sizes,
                            items.price
                          )
                        }}>
                        Edit
                      </button>
                      <button
                        className="text-red-500 product-button show-more-button"
                        onClick={() => {
                          handleDeleteProduct(items.id)
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
