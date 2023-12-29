import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/Product.css";

const Product = ({ products, isDeleted, setIsDeleted }) => {
  const myState = useSelector((state) => state.updateUser);
  const navigate = useNavigate();

  const addToCart = (e) => {
    if (myState == null || myState === 1) {
      navigate("/login");
    } else {
      axios
        .get(`/cart/${myState}/add/${e.target.value}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => console.log(res.data));
    }
  };

  const deleteProduct = (e) => {
    axios
      .post(`/products/deleteProduct`, { productid: e.target.value })
      .then((res) => {
        console.log(res);
        setIsDeleted((prev) => !prev);
      });
  };

  return (
    <div className="product-section">
      {myState === 1
        ? products.map((p) => {
            return (
              <div key={p.productid} className="product-tile">
                <img src={p.image} alt="Product Image" />
                <h3>{p.name}</h3>
                <p>{p.details}</p>
                <p>₹ {p.price}</p>

                <button
                  className="edit-product-btn"
                  value={p.productid}
                  onClick={(e) => {
                    navigate("/updateProduct", {
                      state: {
                        productid: p.productid,
                      },
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-product-btn"
                  value={p.productid}
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      deleteProduct(e);
                  }}
                  // onClick={(e) => {
                  //   addToCart(e);
                  // }}
                >
                  Delete
                </button>
              </div>
            );
          })
        : products.map((p) => {
            return (
              <div key={p.productid} className="product-tile">
                <img
                  src={p.image}
                  alt="Product Image"
                  onClick={(e) => {
                    navigate("/product", {
                      state: {
                        productid: p.productid,
                      },
                    });
                  }}
                />
                <h3>{p.name}</h3>
                <p>₹ {p.price}</p>
                <button
                  className="add-to-cart-btn"
                  value={p.productid}
                  onClick={(e) => {
                    addToCart(e);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
    </div>
  );
};

export default Product;
