import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setcartItems] = useState(getDefaultCart());
  const [all_product, setall_products] = useState([]);

  const productFetcher = async () => {
    fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => setall_products(data));
    const cartResponse = await fetch("http://localhost:4000/getcart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
        "Content-Type": "application/json",
      },
    });
    const cartData = await cartResponse.json();
    console.log("Get cart response:", cartData);
    setcartItems(cartData);
  };

  useEffect(() => {
    productFetcher();
  }, []);

  const addtocart = async (itemId) => {
    try {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      if (localStorage.getItem("auth-token")) {
        const response = await fetch("http://localhost:4000/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });
        const data = await response.json();
        console.log("Add to cart response:", data);

        const cartResponse = await fetch("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        });
        const cartData = await cartResponse.json();
        console.log("Get cart response:", cartData);
        setcartItems(cartData);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removetocart = async (itemId) => {
    console.log(itemId);
    try {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if (localStorage.getItem("auth-token")) {
        const response = await fetch("http://localhost:4000/removeproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove from cart");
        }
        
        console.log(response)
        const data = await response.json();
        console.log(data);

        const cartResponse = await fetch("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!cartResponse.ok) {
          throw new Error("Failed to fetch cart");
        }

        const cartData = await cartResponse.json();
        console.log("Get cart response:", cartData);
        setcartItems(cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const gettotalcartamount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const gettotalcartItems = () => {
    let totlaItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totlaItem += cartItems[item];
      }
    }
    return totlaItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addtocart,
    removetocart,
    gettotalcartamount,
    gettotalcartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
