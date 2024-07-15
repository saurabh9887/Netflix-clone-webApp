import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [profileHover, setProfileHover] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <Link className="link" to="/">
            <span>Homepage</span>
          </Link>
          <Link className="link" to="/series">
            <span>Series</span>
          </Link>
          <Link className="link" to="/movies">
            <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <CiSearch className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <IoMdArrowDropdown
              onMouseEnter={() => setProfileHover(true)}
              onMouseLeave={() => setProfileHover(false)}
              className="icon dropDown"
              onClick={() => setClick(!click)}
            />
            {profileHover && (
              <span className="UpdateProfile">Update Profile</span>
            )}
            {click && (
              <div className="options">
                <span>Settings</span>
                <span>Logout</span>
              </div>
            )}
            <IoIosNotifications className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
