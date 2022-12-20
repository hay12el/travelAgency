import React from "react";
import { useState, useEffect } from "react";
import "./signin.css";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../Redux/user";

const Signin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // chacks if the user is authenticated, if he is, navigates to homePage.
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/");
    }
  }, []);

  const [details, setDetails] = useState({
    userName: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const [errors, setErrors] = useState({
    userName: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null,
  });

  const handleCange = (e) => {
    setErrors((prev) => ({
      ...prev,
      [e.target.id]: null,
    }));

    setDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const phoneRegExp = /((05)[0-9]*)$/;
  const validationSchema = yup.object().shape({
    userName: yup
      .string()
      .required("הכנס/י שם")
      .min(3, "לא מספיק אותיות בשם!")
      .matches(/(\s)/, "הכנס שם מלא"),
    email: yup.string().email("אימייל לא חוקי").required("Required"),
    // bDate: yup.required("Required"),
    password: yup
      .string()
      .min(6, "סיסמא חייבת להכיל 6 תוים לפחות")
      .required("הכנס סיסמא"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "אימות סיסמא אינו תואם")
      .required("הכנס אימות סיסמא"),
    phone: yup
      .string()
      .required("הכנס מספר פלאפון")
      .min(10, "מספר טלפון קצר מידי")
      .max(10, "מספר טלפון ארוך מידי")
      .matches(phoneRegExp, "מספר הטלפון שגוי"),
  });

  const handleSubmit = async (e) => {
    setErrors({
      userName: null,
      email: null,
      phone: null,
      password: null,
      bDate: null,
      confirmPassword: null,
    });
  
    await validationSchema
      .validate(details, { abortEarly: false })
      .then(async () => {
        try {
          await axios
            .post(`http://localhost:${process.env.REACT_APP_URL}/user/register`, details)
            .then(async (res) => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userName", res.data.user.userName);
              localStorage.setItem("isAdmin", true);
              const redux_promiss = () => {
                return new Promise((resolve) => {
                  dispatch(
                    LOGIN({
                      isAdmin: res.data.user.isAdmin,
                      userName: res.data.user.fName + ' ' + res.data.user.lName,
                      token: res.data.token,
                    })
                  );
                  resolve("resolved");
                });
              };
              await redux_promiss();
              navigate("/");
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        err.inner.forEach((e) => {
          setErrors((prev) => ({
            ...prev,
            [e.path]: e.message,
          }));
        });
      });
  };

  return (
    <div className="sContainer">
      <div className="inpC">
        <div className="upponLog">
          <p>הרשמה ראשונית</p>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="name"
            id="userName"
            dir="rtl"
            onChange={handleCange}
          />
          <label>שם מלא</label>
        </div>

        {errors.userName !== null && <p>{errors.userName}</p>}
        <div className="inputBox">
          <input type="email" name="email" id="email" onChange={handleCange} />
          <label>אימייל</label>
        </div>

        {errors.email !== null && <p>{errors.bDate}</p>}
        <div className="inputBox">
          <input type="date" name="bDate" id="bDate" onChange={handleCange} />
          <label>תאריך לידה</label>
        </div>

        {errors.email !== null && <p>{errors.email}</p>}
        <div className="inputBox">
          <input type="tel" name="phone" id="phone" onChange={handleCange} />
          <label>מס' טלפון</label>
        </div>

        {errors.phone !== null && <p>{errors.phone}</p>}
        <div className="inputBox">
          <input
            type="password"
            name="password"
            id="password"
            dir="rtl"
            onChange={handleCange}
          />
          <label>סיסמא</label>
        </div>

        {errors.password !== null && <p>{errors.password}</p>}
        <div className="inputBox">
          <input
            type="password"
            name="confirmPassword"
            dir="rtl"
            id="confirmPassword"
            onChange={handleCange}
          />
          <label>אישור סיסמא</label>
        </div>
        {errors.confirmPassword !== null && <p>{errors.confirmPassword}</p>}
        <button className="confirmBtn" type="submit" onClick={handleSubmit}>
          הירשם
        </button>
      </div>
    </div>
  );
};

export default Signin;
