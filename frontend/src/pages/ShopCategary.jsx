import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import Items from '../components/Items/Items'
import './CSS/Shopcategory.css' 

const ShopCategary = (props) => {
   const {all_product} = useContext(ShopContext)
  // console.log(all_products.image)

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategoryindex">
        <p>
          <span>Sowing 1-12</span>
          out of 36 products
        </p>
      <div className="shopcategory-shopcategory">
        Sort by <img src={dropdown_icon} alt="" />
      </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,index) => {
          if(props.category===item.category){
            return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{ 
            return null
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategary
