import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'
import { useParams } from 'react-router-dom'

const ProductDisplay = ({product}) => { 

    const {addtocart} = useContext(ShopContext)  

  return (
    <div className='product-display'>
      <div className="product-display-left">
        <div className="product-display-imgList">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" /> 
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
            <img className='product-display-mainImg' src={product.image} alt="" />
        </div>
      </div>
      <div className="product-dispaly-right">
        <h1>{product.name}</h1>
        <div className="product-display-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="product-display-right-prices">
            <div className="product-display-right-priceOld">
                ${product.old_price}
            </div>
            <div className="product-dispaly-right-priceNew">
                ${product.new_price}
            </div>
        </div>
            <div className="product-display-right-desc">
              A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garments.
            </div>
            <div className="product-display-right-size">
                <h1>Select Size</h1>
                <div className="product-display-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={() => {addtocart(product.id)}} className='product-display-right-button'>ADD TO CART</button>
            <p className="product-display-right-category">
                <span>Category :</span>
                Women, T_Shirt, Crop TOp
            </p>
            <p className="product-display-right-category">
                <span>Tags :</span>
                Modern, Latest
            </p>
        </div>
    </div>
  )
}

export default ProductDisplay
