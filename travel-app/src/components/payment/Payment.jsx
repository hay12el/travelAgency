import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import "./payment.css";

function Payment(props) {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    CVC: null,
    CardNumber: null,
    FullName: user.userName,
    date: null,
    IDnum: null
  });

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  function validateCreditCard(cvc, number, name, expDate, IDnum) {
    // Check CVC
    if (/^\d{3,4}$/.test(cvc) === false) {
      return false;
    }
    
    // Check credit card number
    if (/^\d{16}$/.test(number) === false) {
      return false;
    }
    
    if (/^\d{9}$/.test(IDnum) === false) {
      return false;
    }

    // Check full name
    if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name) === false) {
      return false;
    }

    // Check expiration date
    const currentDate = new Date();
    const exp = new Date(expDate);
    if (exp <= currentDate) {
      return false;
    }

    return true;
  }

  const hundleClick = async () => {
    const isValid = validateCreditCard(
      details.CVC,
      details.CardNumber,
      details.FullName,
      details.date,
      details.IDnum
    );
    if (isValid) {
      if (
        window.confirm("Do you want to save the payment details?")
      ) {
        await axios.put(
          `http://localhost:${process.env.REACT_APP_URL}/user/updatePayment`,
          { cc: details.CardNumber },
          { headers: { token: localStorage.getItem("token") } }
        );
      }
      setShow(true);
      if (typeof props.flight === "object") {
        if (props.seats.length == 0) {
          alert("please choose seats");
        } else {
          const tickets = await axios.post(
            `http://localhost:${process.env.REACT_APP_URL}/ticket/addTicket`,
            { flightId: props.flight._id, seatNumber: props.seats },
            { headers: { token: localStorage.getItem("token") } }
          );
          if (tickets) {
            setShow(false);
            alert("The order was successfully placed");
            navigate("/userPanel");
          }
        }
      } else {
        if (props.seats1.length == 0 || props.seats2.length == 0) {
          alert("please select seats");
        } else {
          const tickets1 = await axios.post(
            `http://localhost:${process.env.REACT_APP_URL}/ticket/addTicket`,
            { flightId: props.flight1._id, seatNumber: props.seats1 },
            { headers: { token: localStorage.getItem("token") } }
          );
          const tickets2 = await axios.post(
            `http://localhost:${process.env.REACT_APP_URL}/ticket/addTicket`,
            { flightId: props.flight2._id, seatNumber: props.seats2 },
            { headers: { token: localStorage.getItem("token") } }
          );
          if (tickets1 && tickets2) {
            setShow(false);
            alert("The order was successfully placed");
            navigate("/userPanel");
          }
        }
      }
      setShow(false);
    }else{
      alert("wrong credit card details..")
    }
  };

  return (
    <div className="outercontainer">
      <Loader show={show} />
      <div className="inpC" id="lll">
        <div className="upponLog">
          <p>PAYMENT</p>
        </div>
        <div className="formcontainer">
          <div className="form-inside">
            <div className="inputBox">
              <input type="text" id="CVC" onChange={handleChange} />
              <label>CVC</label>
            </div>
            <div className="inputBox">
              <input type="text" id="CardNumber" onChange={handleChange} />
              <label>Card Number</label>
            </div>
          </div>
          <div className="form-inside">
            <div className="inputBox">
              <input
                type="text"
                id="date"
                onChange={handleChange}
                // onKeyDown={handleClick}
              />
              <label>MM/YY</label>
            </div>
            <div className="inputBox">
              <input
                type="text"
                id="FullName"
                value={details.FullName}
                onChange={handleChange}
                // onKeyDown={handleClick}
              />
              <label>Full Name</label>
            </div>
            <div className="inputBox">
              <input
                type="text"
                id="IDnum"
                onChange={handleChange}
                // onKeyDown={handleClick}
              />
              <label>ID</label>
            </div>
          </div>
        </div>
        <div className="text-right purchasebtn">
          <button className="btn" id="btnP" onClick={hundleClick}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
