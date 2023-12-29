import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Select from "react-select";
import "../styles/UpdateProduct.css";

const AddProduct = () => {
  const CATEGORIES_URL = `/products/allCategories`;
  const SUBCATEGORIES_URL = `/products/allSubCategories`;

  const navigate = useNavigate();

  const [prod, setProd] = useState({
    name: "",
    price: "",
    details: "",
    image: "",
  });

  const [selectedCat, setSelectedCat] = useState({});
  const [selectedsubCat, setSelectedSubCat] = useState([]);

  const [catOptions, setCatOptions] = useState([]);
  const [subcatOptions, setSubCatOptions] = useState([]);

  const categories = () => {
    axios
      .get(CATEGORIES_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        let arr = [];
        response.data.map((c) => {
          const opt = { value: c.categoryId, label: c.category };
          arr = [...arr, opt];
        });
        setCatOptions([...arr]);
      });
  };

  const subCategories = () => {
    axios
      .get(SUBCATEGORIES_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        let arr = [];
        response.data.map((s) => {
          const opt = { value: s.subCategoryId, label: s.subcategory };
          arr = [...arr, opt];
        });
        setSubCatOptions([...arr]);
      });
  };

  const handleCatChange = (selected) => {
    // console.log(selected);
    setSelectedCat({ categoryId: selected.value });
  };

  const handleSubChange = (selected) => {
    // console.log(selected);
    // setSelectedSubCat([]);
    let arr = [];
    selected.map((obj) => {
      const opt = { subCategoryId: obj.value };
      arr = [...arr, opt];
      // setSelectedSubCat((prev) => [...prev, opt]);
    });
    setSelectedSubCat([...arr]);
  };

  const addProduct = (e) => {
    e.preventDefault();
    axios
      .post(
        "/products/addProduct",
        {
          name: prod.name,
          price: prod.price,
          details: prod.details,
          image: prod.image,
          category: selectedCat,
          subcategory: selectedsubCat,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      });
  };

  useEffect(() => {
    categories();
    subCategories();
  }, []);

  return (
    <div className="form-main-div">
      <div className="update-heading-div">Add Product</div>
      <form className="update-product-form">
        <div className="product-info-div">
          <label htmlFor="name" className="field-title">
            Name :
          </label>
          <input
            type="text"
            id="name"
            value={prod.name}
            className="field-info"
            onChange={(e) => {
              setProd((prevState) => ({ ...prevState, name: e.target.value }));
            }}
          />
        </div>

        <div className="product-info-div">
          <label htmlFor="price" className="field-title">
            Price :
          </label>
          <input
            type="number"
            id="price"
            value={prod.price}
            className="field-info"
            onChange={(e) => {
              setProd((prevState) => ({ ...prevState, price: e.target.value }));
            }}
          />
        </div>

        <div className="product-info-div">
          <label htmlFor="details" className="field-title">
            Details :
          </label>
          <input
            type="text"
            id="details"
            value={prod.details}
            className="field-info"
            onChange={(e) => {
              setProd((prevState) => ({
                ...prevState,
                details: e.target.value,
              }));
            }}
          />
        </div>

        <div className="product-info-div">
          <label htmlFor="image" className="field-title">
            Image-Url :
          </label>
          <input
            type="text"
            id="image"
            value={prod.image}
            className="field-info"
            onChange={(e) => {
              setProd((prevState) => ({ ...prevState, image: e.target.value }));
            }}
          />
        </div>

        <div className="product-info-div">
          <div className="field-title">Category</div>
          <div className="field-info">
            <Select options={catOptions} onChange={handleCatChange}></Select>
          </div>
        </div>

        <div className="product-info-div">
          <div className="field-title">Sub-Category</div>
          <div className="field-info">
            <Select
              isMulti
              options={subcatOptions}
              onChange={handleSubChange}
            ></Select>
          </div>
        </div>

        <div className="btns">
          <button
            className="cancel-update"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>

          <button className="update-product-btn" onClick={addProduct}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
