import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const SubCategoryFilter = ({
  selectedSubCat,
  setSelectedSubCat,
  isSubCatActive,
  setIsSubCatActive,
}) => {
  const [subCategories, setSubCategories] = useState([]);
  const SUBCATEGORIES_URL = `/products/allSubCategories`;

  useEffect(() => {
    const subCategories = () => {
      axios
        .get(SUBCATEGORIES_URL, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setSubCategories(response.data);
        });
    };
    subCategories();
  }, []);

  const toggleSubCat = (value) => {
    setIsSubCatActive(value === "All" ? false : true);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    toggleSubCat(event.target.value);
    setSelectedSubCat(event.target.value);
  };

  return (
    <React.Fragment>
      <label>Filter by Subcategory:</label>
      <select value={selectedSubCat} onChange={handleChange}>
        <option key={100} value="All">
          All
        </option>
        {subCategories.map((c) => {
          return (
            <option key={c.subCategoryId} value={c.subcategory}>
              {c.subcategory}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export default SubCategoryFilter;
