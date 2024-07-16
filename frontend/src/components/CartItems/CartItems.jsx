import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
    const {all_product, cartItems, removetocart, gettotalcartamount} = useContext(ShopContext)
    const navigate = useNavigate()

  return (
    <div className='cartItems'>
      <div className="cartItem-format-main">
        <p>Products</p>
        <p>Titles</p>
        <p>Prices</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
     {all_product.map((e, index) => {
        if(cartItems[e.id] > 0){
            return <div>
            <div className="cartItem-format cartItem-format-main">
                <img key={index} className='cart_icon' src={e.image} alt="" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartItems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price*cartItems[e.id]}</p>
                <img className='caretItem-remove-icon' src={remove_icon} onClick={() => {removetocart(e.id)}} alt="" />
            </div>
            <hr />
          </div>
        }
        return null
     })}
     <div className="cartItem-dowm">
        <div className="cartItem-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartItem-total-item">
                    <p>Subtotal</p>
                    <p>${gettotalcartamount()}</p>
                </div>
                <hr />
                <div className="cartItem-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartItem-total-item">
                    <h3>Total</h3>
                    <h3>${gettotalcartamount()}</h3>
                </div>
            </div>
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartItem-promo-code">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartItem-promo-box">
                <input type="text" placeholder='Promo Code'/>
                <button>Submit</button>
            </div>
        </div>
     </div>
    </div>
  )
}

export default CartItems
