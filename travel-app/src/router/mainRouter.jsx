import React from "react";
import { Route, Routes } from "react-router-dom";
import Paying from "../pages/paying/Paying";
import Home from "../pages/Home/Home";
import Login from '../pages/login/Login'
import Singin from '../pages/SignIn/Signin'
import AdminPannel from "../pages/adminPannel/AdminPannel";
import DoublePaying from "../pages/doublePaying/DoublePaying";
import UserPanel from "../pages/userPanel/UserPanel";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Singin />} />
      <Route path="/paying/:id" element={<Paying />} />
      <Route path="/adminPanel" element={<AdminPannel />} />
      <Route path="/doublePaying/:firstId&:secondId" element={<DoublePaying/>}/>
      <Route path="/userPanel" element={<UserPanel/>}/>
    </Routes>
  );
}

export default MainRouter;
