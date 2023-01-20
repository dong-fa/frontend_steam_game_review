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
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

/*수정*/

export default Router;
