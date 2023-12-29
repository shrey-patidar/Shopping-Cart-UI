import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Select from "react-select";

const CategoryFilter = ({
  selectedCat,
  setSelectedCat,
  isCatActive,
  setIsCatActive,
}) => {
  const [categories, setCategories] = useState([]);

  const CATEGORIES_URL = `/products/allCategories`;
  const GET_ALL_PRODUCTS_URL = `products/allProducts`;

  useEffect(() => {
    const categories = () => {
      axios
        .get(CATEGORIES_URL, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setCategories(response.data);
        });
    };
    categories();
  }, []);

  const toggleCat = (value) => {
    setIsCatActive(value === "All" ? false : true);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    toggleCat(event.target.value);
    setSelectedCat(event.target.value);
  };

  useEffect(() => {}, [selectedCat]);

  //   useEffect(() => {
  //     const categoriesfilter = () => {
  //       if (selectedCat === "All") {
  //         axios
  //           .get(GET_ALL_PRODUCTS_URL, {
  //             headers: { "Content-Type": "application/json" },
  //           })
  //           .then((response) => {
  //             setProducts(response.data);
  //           });
  //       } else {
  //         axios
  //           .get(GET_ALL_PRODUCTS_URL, {
  //             headers: { "Content-Type": "application/json" },
  //           })
  //           .then((response) => {
  //             setProducts(
  //               response.data.filter(function (el) {
  //                 return el.category.category === selectedCat;
  //               })
  //             );
  //           });
  //       }
  //     };
  //     categoriesfilter();
  //   }, [selectedCat]);

  return (
    <React.Fragment>
      <label>Filter by category:</label>
      <select value={selectedCat} onChange={handleChange}>
        <option key={100} value="All">
          All
        </option>
        {categories.map((c) => {
          return (
            <option key={c.categoryId} value={c.category}>
              {c.category}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export default CategoryFilter;
