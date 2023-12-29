import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import logo from "./logo.png";

const Header = () => {
  return (
    <div className="header">
      <NavLink to={"/"}>
        <img src={logo} alt="Logo" className="logo" />
      </NavLink>
      <Nav />
    </div>
  );
};

export default Header;
