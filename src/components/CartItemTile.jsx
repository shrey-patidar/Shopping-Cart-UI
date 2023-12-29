import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import { GrTrash } from "react-icons/gr";

const CartItemTile = ({
  cartItems,
  quantity,
  setQuantity,
  productid,
  setProductId,
}) => {
  return (
    <React.Fragment>
      {cartItems.map((item) => {
        return (
          <div key={item.cartItemId} className="item-div">
            <img
              src={item.product.image}
              alt="Item Image"
              className="item-img"
            />
            <div className="item-info">
              <div className="item-name">{item.product.name}</div>
              <div className="item-price">₹ {item.product.price}</div>
            </div>
            <div className="item-update">
              <div className="item-quantity">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={item.quantity}
                  onChange={(e) => {
                    setProductId(item.product.productid);
                    setQuantity(e.target.value);
                    console.log(quantity);
                  }}
                />
              </div>
              <button
                className="item-remove"
                onClick={(e) => {
                  e.preventDefault();
                  setProductId(item.product.productid);
                  setQuantity(0);
                }}
              >
                <GrTrash />
              </button>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CartItemTile;
