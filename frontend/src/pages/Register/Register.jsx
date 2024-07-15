import React, { useRef, useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const emailRef = useRef();

  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const handelStart = () => {
    setEmail(emailRef.current.value);
  };

  const handelFinish = () => {
    setEmail(password.current.value);
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link className="loginButton link" to="/login">
            Sign In
          </Link>
        </div>
      </div>

      <div className="RegisterContainer">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handelStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handelFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
