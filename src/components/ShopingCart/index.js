import React from "react";
import "./index.css";

const ShopingCart = () => {
  const PRODUCTS = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Smartphone", price: 300 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Smartwatch", price: 150 },
  ];

  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
  const THRESHOLD = 1000;

  return (
    <div className="shoping_cart_container">
      <h1>shoping cart</h1>
      <h2>Products</h2>
      <ul className="ul_carts">
        {PRODUCTS.map((eachProduct) => {
          return (
            <li>
              <h3>{eachProduct.name}</h3>
              <p>₹{eachProduct.price}</p>
              <button>Add to Cart</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShopingCart;
