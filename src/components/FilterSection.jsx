import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/Filter.css";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import Search from "./Search";
import SubCategoryFilter from "./SubCategoryFilter";

const FilterSection = ({ setProducts, products, backUp }) => {
  const myState = useSelector((state) => state.updateUser);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [selectedCat, setSelectedCat] = useState();
  const [isCatActive, setIsCatActive] = useState(false);

  const [selectedSubCat, setSelectedSubCat] = useState();
  const [isSubCatActive, setIsSubCatActive] = useState(false);

  const [price, setPrice] = useState([0, 99000]);

  useEffect(() => {
    const filter = () => {
      setProducts(backUp);
      let arr1 = backUp;
      let arr2 = arr1;
      let arr3 = [...backUp];

      if (isSearchActive) {
        arr2 = arr1.filter(function (el) {
          let temp = el.name.concat(" ", el.details);
          let temp2 = search.toLowerCase();
          return temp.toLowerCase().includes(temp2);
        });
        arr3 = [...arr2];
        // setProducts(arr2);
        arr1 = arr2;
      }

      if (isCatActive) {
        arr2 = arr1.filter(function (el) {
          return el.category.category === selectedCat;
        });
        arr3 = [...arr2];
        // setProducts(arr2);
        // console.log(arr2);
        arr1 = arr2;
      }

      if (isSubCatActive) {
        arr2 = arr1.filter(function (el) {
          let subCatPresent = false;
          el.subcategory.map((subCat) => {
            subCatPresent |= subCat.subcategory === selectedSubCat;
          });
          return subCatPresent;
        });
        // console.log(arr2);
        // setProducts(arr2);
        arr3 = [...arr2];
        arr1 = arr2;
      }

      arr2 = arr1.filter(function (el) {
        return el.price >= price[0] && el.price <= price[1];
      });
      arr3 = [...arr2];
      setProducts(arr3);
    };
    filter();
  }, [selectedCat, selectedSubCat, search, price]);

  const clearFilters = (e) => {
    e.preventDefault();
    setSearch("");
    setIsSearchActive(false);
    setSelectedCat("All");
    setIsCatActive(false);
    setSelectedSubCat("All");
    setIsSubCatActive(false);
    setPrice([0, 99000]);
  };

  return (
    <form className="filters">
      {myState === 1 ? (
        <button
          className="addproduct-btn"
          onClick={(e) => {
            navigate("/addProduct");
          }}
        >
          Add a Product
        </button>
      ) : (
        ""
      )}

      <Search
        search={search}
        setSearch={setSearch}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <CategoryFilter
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        isCatActive={isCatActive}
        setIsCatActive={setIsCatActive}
      />
      <SubCategoryFilter
        selectedSubCat={selectedSubCat}
        setSelectedSubCat={setSelectedSubCat}
        isSubCatActive={isSubCatActive}
        setIsSubCatActive={setIsSubCatActive}
      />

      <PriceFilter price={price} setPrice={setPrice} />

      <button className="filterclear-btn" onClick={clearFilters}>
        Clear All Filters
      </button>
    </form>
  );
};

export default FilterSection;
