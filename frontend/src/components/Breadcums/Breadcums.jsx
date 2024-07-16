import React from 'react'
import './Breadcums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcums = ({product}) => {
  console.log(product)

  return (
    <div className='breadcums'>
      Home <img src={arrow_icon} alt="" /> Shop <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcums
