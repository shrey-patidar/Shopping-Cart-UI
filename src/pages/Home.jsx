import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import FilterSection from "../components/FilterSection";
import Product from "../components/Product";
import "../styles/Home.css";

const Home = () => {
  const GET_ALL_PRODUCTS_URL = `products/allProducts`;
  const [products, setProducts] = useState([]);
  const [backUpproducts, setBackUpProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const getAllProducts = () => {
    axios
      .get(GET_ALL_PRODUCTS_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setProducts(response.data);
        setBackUpProducts(response.data);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [isDeleted]);

  return (
    <div className="container-home">
      <div className="filter-section">
        <FilterSection
          setProducts={setProducts}
          products={products}
          backUp={backUpproducts}
        />
      </div>

      <div className="product-list">
        <Product
          products={products}
          isDeleted={isDeleted}
          setIsDeleted={setIsDeleted}
        />
      </div>
    </div>
  );
};

export default Home;
