import React, { useEffect, useState } from 'react'
import './Collection.css'
import Items from '../Items/Items' 

const Collections = () => {
   const [new_collection, setnew_Collection] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
    .then((resp) => resp.json())
    .then((data) => setnew_Collection(data))
  }, []) 

  return (
    <div className='new-collection'>
        <h1>New Collection</h1>
      <hr />
      <div className="collection">
        {new_collection.map((item,index) => {
            return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Collections
