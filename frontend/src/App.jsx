import React from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Watch from "./pages/Watch/Watch";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />

        <Route path="/movies" element={<Home type="movies" />} />
        <Route path="/series" element={<Home type="series" />} />
        <Route path="/watch" element={<Watch />} />

        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
