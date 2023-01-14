import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Detail from "./Detail";
import Home from "./Home";
import Login from "./Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
