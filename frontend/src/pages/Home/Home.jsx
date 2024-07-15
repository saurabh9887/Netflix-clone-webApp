import React, { useEffect, useState } from "react";
import "./Home.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Featured from "../../Components/Featured/Featured";
import List from "../../Components/List/List";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lists${type ? "?type=" + type : ""}${
            type ? "&" : ""
          }${genre ? "genre=" + genre : ""}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODdiMzc5ODM1MGNmNDQwMDI5MzU3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMDY4MDk0OSwiZXhwIjoxNzIxMTEyOTQ5fQ.PlRfmX5KKgKp8GH83JvQ_wbNZeBZTqBp6Ji-EasiEvI",
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list, i) => (
        <List list={list} key={i} />
      ))}
    </div>
  );
};

export default Home;
