import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>

      <div className="loginContainer">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="email address" />
          <input type="password" placeholder="password" />
          <button className="loginButton">Sign In</button>
          <Link to="/register" className="link">
            <span>
              New to Netflix? <b style={{ cursor: "pointer" }}>Sign up now.</b>
            </span>
          </Link>

          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b style={{ cursor: "pointer" }}>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
