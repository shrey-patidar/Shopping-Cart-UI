import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Manager from "./pages/Manager";
import Error from "./pages/Error";
import Header from "./components/Header.jsx";

import "./styles/App.css";
import "./styles/Header.css";
import "./styles/Nav.css";
import UpdateProduct from "./components/UpdateProduct";
import AddProduct from "./components/AddProduct";
import SingleProduct from "./components/SingleProduct";

const App = () => {
  return (
    <Router>
      <Header />
      {/* {console.log("app")} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/product" element={<SingleProduct />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
