import React, { useEffect, useState } from "react";
import "./ListItem.scss";
import { IoIosPlay, IoMdAdd } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/movies/find/${item}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODdiMzc5ODM1MGNmNDQwMDI5MzU3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMDY4MDk0OSwiZXhwIjoxNzIxMTEyOTQ5fQ.PlRfmX5KKgKp8GH83JvQ_wbNZeBZTqBp6Ji-EasiEvI",
            },
          }
        );
        setMovie(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  if (isLoading) {
    return <div className="loading">Loding......</div>;
  }

  if (!movie)
    return <span>Failed to get movie, try again after sometime!</span>;

  // The state is now passed directly as a prop, and not as an attribute of the to prop. This message is for the link component.
  return (
    <Link to={{ pathname: "/watch" }} state={movie}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop></video>

            <div className="itemInfo">
              <div className="icons">
                <IoIosPlay className="icon" />
                <IoMdAdd className="icon" />
                <AiOutlineLike className="icon" />
                <AiOutlineDislike className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>
                  {movie.durationHr}hr {movie.durationMin}+min
                </span>
                <span className="ageLimit">{movie.limit}+</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
