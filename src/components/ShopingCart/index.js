import React, { useState } from "react";
import "./index.css";

const ShopingCart = () => {
  const [addedCarts, setAddedCartds] = useState([]);
  const [totalBuy, setTotalBuy] = useState(0);
  const PRODUCTS = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Smartphone", price: 300 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Smartwatch", price: 150 },
  ];
  console.log(totalBuy);

  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
  const THRESHOLD = 1000;
  const percentage = (totalBuy / THRESHOLD) * 100;

  const clickAddToCart = (e) => {
    const cart = addedCarts.find(
      (eachItem) => eachItem.id.toString() === e.target.value
    );
    if (!cart) {
      const cart = PRODUCTS.find(
        (eachItem) => eachItem.id.toString() === e.target.value
      );
      setAddedCartds([...addedCarts, { ...cart, quantity: 1 }]);
      setTotalBuy(totalBuy + cart.price);
    }
  };

  const clickRemoveCartQuantity = (e) => {
    const cart = addedCarts.find(
      (eachItem) => eachItem.id.toString() === e.target.value
    );
    setTotalBuy(totalBuy - cart.price);

    if (cart.quantity === 1) {
      const remainingCartItems = addedCarts.filter(
        (eachItem) => eachItem.id.toString() !== e.target.value
      );
      setAddedCartds([...remainingCartItems]);
    } else {
      const remainingCartItems = addedCarts.map((eachItem) => {
        if (eachItem.id.toString() === e.target.value) {
          return { ...eachItem, quantity: eachItem.quantity - 1 };
        } else {
          return eachItem;
        }
      });
      setAddedCartds([...remainingCartItems]);
    }
  };
  const clickAddCartQuantity = (e) => {
    const remainingCartItems = addedCarts.map((eachItem) => {
      if (eachItem.id.toString() === e.target.value) {
        setTotalBuy(totalBuy + eachItem.price);
        return { ...eachItem, quantity: eachItem.quantity + 1 };
      } else {
        return eachItem;
      }
    });
    setAddedCartds([...remainingCartItems]);
  };

  return (
    <div className="shoping_cart_container">
      <h1>shoping cart</h1>
      <h2>Products</h2>
      <ul className="ul_carts">
        {PRODUCTS.map((eachProduct) => {
          return (
            <li key={eachProduct.id}>
              <h3>{eachProduct.name}</h3>
              <p>₹{eachProduct.price}</p>
              <button value={eachProduct.id} onClick={clickAddToCart}>
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
      <h2>Cart Summary</h2>
      <div className="subtotal_container">
        <div className="subtotal_amount">
          <p>Subtotal</p>
          <p>₹{totalBuy}</p>
        </div>
        <hr />
        {totalBuy < THRESHOLD ? (
          <div className="progress_bar">
            <div className="progress_wrapper">
              <p>
                Add ₹{THRESHOLD - totalBuy} more to get a FREE Wireless Mouse!
              </p>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <p className="free_gift_mouse">You got a free Wireless Mouse!</p>
        )}
      </div>
      <h2>Cart Items</h2>
      {addedCarts.length === 0 ? (
        <div className="empty_cartlist_container">
          <h3>Your cart is empty</h3>
          <p>Add some products to see them here!</p>
        </div>
      ) : (
        <ul className="carts_ul_list">
          {addedCarts.map((eachCart) => {
            return (
              <li key={eachCart.id}>
                <div>
                  <h3>{eachCart.name}</h3>
                  <p>
                    ₹{eachCart.price} x {eachCart.quantity}=₹
                    {eachCart.quantity * eachCart.price}
                  </p>
                </div>
                <div className="buttons_container">
                  <button
                    className="minus_btn"
                    value={eachCart.id}
                    onClick={clickRemoveCartQuantity}
                  >
                    -
                  </button>
                  <p>{eachCart.quantity}</p>
                  <button
                    className="plus_btn"
                    value={eachCart.id}
                    onClick={clickAddCartQuantity}
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {totalBuy >= THRESHOLD && (
        <div className="free_gift_container">
          <div>
            <h3>{FREE_GIFT.name}</h3>
            <p>₹0x1=₹0</p>
          </div>
          <button>FREE GIFT</button>
        </div>
      )}
    </div>
  );
};

export default ShopingCart;
