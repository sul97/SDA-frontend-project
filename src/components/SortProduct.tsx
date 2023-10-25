import { useDispatch } from 'react-redux'
import { ChangeEvent } from 'react'

import { sortProducts } from '../redux/slices/products/productsSlice'

const SortProduct = () => {
  const dispatch = useDispatch()

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }
  return (
    <div>
      <label htmlFor="sort">Sorrt By : </label>
      <select name="sort" id="sort" onChange={handleOptionChange}>
        <option defaultValue="price">price</option>
        <option value="name">name</option>
      </select>
    </div>
  )
}

export default SortProduct
