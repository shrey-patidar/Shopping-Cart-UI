import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Login.css";
import { NavLink } from "react-router-dom";
import axios from "../api/axios";
import { local } from "../actions";

const LOGIN_URL = "/login";

const Login = () => {
  const mailRef = useRef();
  const errRef = useRef();

  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const myState = useSelector((state) => state.updateUser);
  const dispatch = useDispatch();

  useEffect(() => {
    mailRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        LOGIN_URL,
        { eMail: mail, password: pwd },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userId", res.data);
        dispatch(local(res.data));
        console.log(localStorage.getItem("userId"));
        console.log(myState);
        navigate("/");
      })
      .catch((err) => {
        if (!err?.response) {
          console.log(err);
          setErrMsg("No Server Respose");
        } else if (err.response?.status === 303) {
          setErrMsg("Email doesn't exist");
        } else if (err.response?.status === 401) {
          setErrMsg("Incorrect Password");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <div className="main-login-div">
      <section className="login-div">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <h1>Login</h1>

        <form className="login-form">
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            ref={mailRef}
            autoComplete="off"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <button type="submit" onClick={handleSubmit}>
            Log In
          </button>
        </form>

        <p className="new-user">
          New User
          <br />
          <NavLink to={"/signup"} className="signup-link">
            Signup
          </NavLink>
        </p>
      </section>
    </div>
  );
};

export default Login;
