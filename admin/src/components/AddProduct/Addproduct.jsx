import React, { useState } from 'react'
import './Adproduct.css'
import upload_area_img from '../../Assets/upload_area.svg' 

const Addproduct = () => {

    const [image, setimage] = useState(false)
    const [productdetsails, setproductdetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: '' 
    })

    const imagehandler = (e) => {
        setimage(e.target.files[0])
    }
    const changehnadler = (e) => {
        setproductdetails({...productdetsails, [e.target.name]: e.target.value})
    }
    const addproduct = async () => {
        let responseData;
        let product = productdetsails
        
        let formData = new FormData()
        formData.append('product', image)

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            header: {
                Accept: 'application/json' 
            },
            body: formData
        }).then((resp) => resp.json()).then((data) => {responseData=data})
        if(responseData.success){
            product.image = responseData.image_url
            console.log(product)
            await fetch('http://localhost:4000/addproduct', {
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }).then((resp) => resp.json()).then((data) => {
                data.success? alert("product Added") : alert("Failed")
            })
        }
    }

  return (
    <div className='addproduct'>
      <div className="appproduct-item">
        <p>Product title</p>
        <input value={productdetsails.name} onChange={changehnadler} type="text" name='name' placeholder='Type Here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input onChange={changehnadler} value={productdetsails.old_price} type="text" name='old_price' placeholder='Type Here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input onChange={changehnadler} value={productdetsails.new_price} type="text" name='new_price' placeholder='Type Here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productdetsails.category} onChange={changehnadler} name="category" className='addproduct-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfiled">
        <label htmlFor="file-input">
            <img src={image? URL.createObjectURL(image) : upload_area_img} className='addproduct-image' alt="" />
        </label>
            <input onChange={imagehandler} type="file" name='image' id='file-input' hidden/>
      </div>
            <button onClick={() => addproduct()} className='addproductbutton'>Add</button>
    </div>
  )
}

export default Addproduct
