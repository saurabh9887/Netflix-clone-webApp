import React, { useEffect, useState } from "react";
import "./Featured.scss";
import { IoIosPlay } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import axios from "axios";

const Featured = ({ type }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODdiMzc5ODM1MGNmNDQwMDI5MzU3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMDY4MDk0OSwiZXhwIjoxNzIxMTEyOTQ5fQ.PlRfmX5KKgKp8GH83JvQ_wbNZeBZTqBp6Ji-EasiEvI",
            },
          }
        );
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getContent();
  }, [type]);
  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="categories">
          <span>{type === "movies" ? "MOVIES" : "TV SERIES"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.titleImg} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <IoIosPlay />
            <span>Play</span>
          </button>
          <button className="more">
            <CiCircleInfo />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
