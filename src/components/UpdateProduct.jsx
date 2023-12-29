import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Select from "react-select";
import "../styles/UpdateProduct.css";

const UpdateProduct = () => {
  const CATEGORIES_URL = `/products/allCategories`;
  const SUBCATEGORIES_URL = `/products/allSubCategories`;

  const location = useLocation();
  const navigate = useNavigate();
  const [prodId, setprodId] = useState(location.state.productid);

  const [p, setP] = useState({});
  const [selectedCat, setSelectedCat] = useState({});
  const [selectedsubCat, setSelectedSubCat] = useState([]);
  // console.log(location);

  const [catOptions, setCatOptions] = useState([]);
  const [subcatOptions, setSubCatOptions] = useState([]);

  const getProduct = () => {
    axios.get(`/products/getById/${prodId}`).then((res) => {
      setP(res.data);
    });
  };

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
          // setCatOptions((cat) => [...cat, opt]);
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
          // setSubCatOptions((subcat) => [...subcat, opt]);
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

  const updateProduct = (e) => {
    e.preventDefault();
    axios
      .post(
        "/products/update",
        {
          productid: prodId,
          name: p.name,
          price: p.price,
          details: p.details,
          image: p.image,
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
    getProduct();
  }, []);

  return (
    <div className="form-main-div">
      <div className="update-heading-div">Update Product</div>
      {console.log(selectedCat)}
      <form className="update-product-form">
        <div className="product-info-div">
          <div className="field-title">Product Id : </div>
          <div className="field-info">{p.productid}</div>
        </div>

        <div className="product-info-div">
          <label htmlFor="name" className="field-title">
            Name :
          </label>
          <input
            type="text"
            id="name"
            value={p.name}
            className="field-info"
            onChange={(e) => {
              setP((prevState) => ({ ...prevState, name: e.target.value }));
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
            value={p.price}
            className="field-info"
            onChange={(e) => {
              setP((prevState) => ({ ...prevState, price: e.target.value }));
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
            value={p.details}
            className="field-info"
            onChange={(e) => {
              setP((prevState) => ({ ...prevState, details: e.target.value }));
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
            value={p.image}
            className="field-info"
            onChange={(e) => {
              setP((prevState) => ({ ...prevState, image: e.target.value }));
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
          <button className="update-product-btn" onClick={updateProduct}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
