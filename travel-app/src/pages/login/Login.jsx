import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../Redux/user";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // chacks if the user is authenticated, if he is, navigates to homePage.
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/");
    }
  }, []);

  const [inputs, setInputs] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:${process.env.REACT_APP_URL}/user/login`,
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "userName",
        res.data.user.fName + " " + res.data.user.lName
      );
      localStorage.setItem("isAdmin", res.data.user.isAdmin);
      const redux_promiss = () => {
        return new Promise((resolve) => {
          dispatch(
            LOGIN({
              isAdmin: res.data.user.isAdmin,
              userName: res.data.user.fName + " " + res.data.user.lName,
              token: res.data.token,
            })
          );
          resolve("resolved");
        });
      };
      await redux_promiss();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="containerBig">
      <div className="vv">
        <div className="leftImg"></div>
        <div className="inpC">
          <div className="upponLog">
            <p>התחברות</p>
          </div>
          <div className="inputBox">
            <input
              type="email"
              // className="inp"
              id="email"
              onChange={handleChange}
              onKeyDown={handleClick}
            />
            <label>מייל</label>
          </div>
          <div className="inputBox">
            <input
              type="password"
              // className="inp"
              id="password"
              onChange={handleChange}
              onKeyDown={handleClick}
            />
            <label>סיסמא</label>
          </div>
          <button type="submit" className="confirmBtn" onClick={handleSubmit}>
            התחבר
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
