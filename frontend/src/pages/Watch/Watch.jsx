import React, { useEffect, useState } from "react";
import "./Watch.scss";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.state;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <HiArrowLeft />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        controls
        src={movie.video} // Use the movie's trailer URL
      />
    </div>
  );
};

export default Watch;
