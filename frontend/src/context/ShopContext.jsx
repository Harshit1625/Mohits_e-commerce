import React, { createContext, useEffect, useState } from 'react' 

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0
    }
    return cart
}

const ShopContextProvider = (props) => {

    const [cartItems, setcartItems] = useState(getDefaultCart())
    const [all_product, setall_products] = useState([]) 

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
        .then((resp) => resp.json())
         .then((data) => setall_products(data)) 

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method: 'POST',
                headers:{
                    Accept: 'application-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: ""
            }) 
            .then((res) => setcartItems(res.data))
            
        }
    }, [])

    const addtocart = async (itemId) => { 
        setcartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
             await fetch("http://localhost:4000/addtocart", {
                  method: "POST",
                  headers: {
                      Accept: 'application/form-data',
                      'auth-token': `${localStorage.getItem('auth-token')}`,
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({"itemId": itemId})
              })
              .then((resp) => resp.json())
              .then((data) => console.log(data))
          }
    }
    const removetocart = (itemId) =>{
        setcartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                header: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((resp) => resp.json())
            .then((data) => console.log(data))
        }
    }
    const gettotalcartamount = () => {
        let totalAmount = 0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product) => product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount
    }
    const gettotalcartItems = () => {
        let totlaItem = 0
        for(const item in cartItems){
            if(cartItems[item]>0){
                totlaItem += cartItems[item]
            }
        }
        return totlaItem
    }
    
    const contextValue = {all_product, cartItems, addtocart, removetocart, gettotalcartamount, gettotalcartItems}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider

