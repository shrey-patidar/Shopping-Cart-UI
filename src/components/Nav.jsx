import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { local } from "../actions";

const Nav = () => {
  // const [isUser, setIsUser] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("userId") === 1) {
  //     return setIsAdmin(true);
  //   } else if (localStorage.getItem("userId") != null) {
  //     return setIsUser(true);
  //   } else {
  //   }
  // });

  const myState = useSelector((state) => state.updateUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(local(localStorage.getItem("userId")));
    // console.log(typeof myState);
    // console.log(typeof localStorage.getItem("userId"));
  }, [myState]);

  return (
    <React.Fragment>
      {myState === 1 ? (
        <div className="nav-bar">
          <NavLink to={"/"} className="navbar-link">
            Manager
          </NavLink>

          {/* <NavLink to={"/manager"} className="navbar-link">
            Manager
          </NavLink> */}
          <NavLink to={"/profile"} className="navbar-link">
            Profile
          </NavLink>
          <NavLink
            to={"/"}
            onClick={() => {
              dispatch(local(null));
              localStorage.clear();
            }}
            className="navbar-link"
          >
            Logout
          </NavLink>
        </div>
      ) : myState == null ? (
        <div className="nav-bar">
          <NavLink to={"/"} className="navbar-link">
            Home
          </NavLink>
          <NavLink to={"/signup"} className="navbar-link">
            Signup
          </NavLink>

          <NavLink to={"/login"} className="navbar-link">
            Login
          </NavLink>
        </div>
      ) : (
        <div className="nav-bar">
          <NavLink to={"/"} className="navbar-link">
            Home
          </NavLink>

          <NavLink to={"/profile"} className="navbar-link">
            Profile
          </NavLink>

          <NavLink to={"/cart"} className="navbar-link">
            Cart
          </NavLink>

          <NavLink to={"/orders"} className="navbar-link">
            Orders
          </NavLink>

          <NavLink
            to={"/"}
            onClick={() => {
              dispatch(local(null));
              localStorage.clear();
            }}
            className="navbar-link"
          >
            Logout
          </NavLink>
        </div>
      )}

      {/* {isUser ? (
        <div className="nav-bar">
          <NavLink to={"/"} className="navbar-link">
            Home
          </NavLink>

          <NavLink to={"/profile"} className="navbar-link">
            Profile
          </NavLink>

          <NavLink to={"/cart"} className="navbar-link">
            Cart
          </NavLink>

          <NavLink to={"/orders"} className="navbar-link">
            Orders
          </NavLink>

          <NavLink to={"/logout"} className="navbar-link">
            Logout
          </NavLink>
        </div>
      ) : isAdmin ? (
        <div className="nav-bar">
          <NavLink to={"/"} className="navbar-link">
            Home
          </NavLink>
          <NavLink to={"/manager"} className="navbar-link">
            Manager
          </NavLink>
          <NavLink to={"/logout"} className="navbar-link">
            Logout
          </NavLink>
        </div>
      ) : (
        <div className="nav-bar">
          <NavLink to={"/"} className="navbar-link">
            Home
          </NavLink>
          <NavLink to={"/signup"} className="navbar-link">
            Signup
          </NavLink>

          <NavLink to={"/login"} className="navbar-link">
            Login
          </NavLink>
        </div>
      )} */}

      {/* <div className="nav-bar">
        <NavLink to={"/"} className="navbar-link">
          Home
        </NavLink>

        <NavLink to={"/profile"} className="navbar-link">
          Profile
        </NavLink>

        <NavLink to={"/manager"} className="navbar-link">
          Manager
        </NavLink>

        <NavLink to={"/cart"} className="navbar-link">
          Cart
        </NavLink>

        <NavLink to={"/orders"} className="navbar-link">
          Orders
        </NavLink>

        <NavLink to={"/signup"} className="navbar-link">
          Signup
        </NavLink>

        <NavLink to={"/login"} className="navbar-link">
          Login
        </NavLink>
        <NavLink to={"/logout"} className="navbar-link">
          Logout
        </NavLink>
      </div> */}
    </React.Fragment>
  );
};

export default Nav;
