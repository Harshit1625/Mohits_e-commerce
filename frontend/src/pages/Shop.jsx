import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers' 
import Collections from '../components/Collections/Collections'
import News_latter from '../components/News_latter/News_latter' 

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers /> 
      <Collections />
      <News_latter />  
    </div>
  )
}

export default Shop
