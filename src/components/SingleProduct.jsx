import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/SingleProduct.css";

const SingleProduct = () => {
  const myState = useSelector((state) => state.updateUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [subCat, setSubCat] = useState([]);

  // console.log(location.state);
  //   console.log(product.category.category);

  const getProduct = () => {
    axios.get(`/products/getById/${location.state.productid}`).then((res) => {
      setProduct(res.data);
      setCategory(res.data.category.category);
      res.data.subcategory.map((s) =>
        setSubCat((prev) => [...prev, s.subcategory])
      );
    });
  };

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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="single-product-main">
      <div className="left-div">
        <img src={product.image} alt="Product-Image" />
        <div className="extra">
          <p>Id: {product.productid}</p>
          <p>Category: {category}</p>
          <p>
            SubCategories:{" "}
            {subCat.map((s) => (
              <span key={s}> {s} </span>
            ))}
          </p>
        </div>
      </div>
      <div className="right-div">
        <div>
          <p className="p1">{product.name}</p>
          <p className="p2">{product.details}</p>
          <p className="p3">₹ {product.price}</p>
        </div>
        <button value={product.productid} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
