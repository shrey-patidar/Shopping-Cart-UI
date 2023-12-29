import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import CartItemTile from "../components/CartItemTile";
import "../styles/Cart.css";

const Cart = () => {
  const myState = useSelector((state) => state.updateUser);
  const CART_URL = `/cart/${myState}/getCart`;
  const [cartitems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState();
  const [total, setTotal] = useState();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const cart = () => {
    axios
      .get(CART_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setTotal(res.data.totalPrice);
        setCartItems(res.data.products);
      });
  };

  // useEffect(() => {
  //   cart();
  //   // setIsOrderPlaced(false)
  // }, []);

  useEffect(() => {
    const updateQuantity = () => {
      if (productId != undefined && quantity == 0) {
        axios
          .post(`/cart/${myState}/remove/${productId}`, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            console.log(res.data);
            const cart = () => {
              axios
                .get(CART_URL, {
                  headers: { "Content-Type": "application/json" },
                })
                .then((res) => {
                  console.log(res.data);
                  setTotal(res.data.totalPrice);
                  setCartItems(res.data.products);
                });
            };
            cart();
          });
      }

      if (productId != undefined && quantity > 0) {
        axios
          .post(
            `/cart/${myState}/changeQuantity/${productId}`,
            { quantity: quantity },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            console.log(res.data);
            const cart = () => {
              axios
                .get(CART_URL, {
                  headers: { "Content-Type": "application/json" },
                })
                .then((res) => {
                  console.log(res.data);
                  setTotal(res.data.totalPrice);
                  setCartItems(res.data.products);
                });
            };
            cart();
          });
      }
    };
    updateQuantity();
  }, [quantity, productId]);

  const placeOrder = (e) => {
    e.preventDefault();
    axios
      .get(`/order/${myState}/createOrder`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setIsOrderPlaced(true);
      });
  };

  useEffect(() => {
    cart();
  }, [isOrderPlaced]);

  return (
    <div className="main-cart-div">
      <div className="header-div">
        <div className="mycart-div">My Cart</div>

        {cartitems.length > 0 ? (
          <div className="num-div">
            You have {cartitems.length} items in your Cart
          </div>
        ) : (
          <div className="num-div">Cart Empty</div>
        )}
      </div>
      <div className="item-list-div">
        {cartitems.length > 0 ? (
          <CartItemTile
            cartItems={cartitems}
            quantity={quantity}
            setQuantity={setQuantity}
            productId={productId}
            setProductId={setProductId}
          />
        ) : (
          <div>It's lonely in here. Add some products to your cart.</div>
        )}
      </div>
      <div className="footer-div">
        <button className="place-order-btn" onClick={placeOrder}>
          Checkout
        </button>
        <div className="total-amt-div">Total Amout = ₹ {total}</div>
      </div>
    </div>
  );
};

export default Cart;
