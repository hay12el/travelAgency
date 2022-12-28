import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../loader/Loader'
import "./payment.css";

function Payment(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    CVC: null,
    CardNumber: null,
    FullName: null,
    date: null,
  });

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const hundleClick = async () => {
    if (window.confirm("Do you want to save the payment details?")) {
      await axios.put(
        `http://localhost:${process.env.REACT_APP_URL}/user/updatePayment`,
        { cc: details.CardNumber },
        { headers: { token: localStorage.getItem("token") } }
      );
    }
    setShow(true)
    const tickets = await axios.post(
      `http://localhost:${process.env.REACT_APP_URL}/ticket/addTicket`,
      { flightId: props.flight._id, seatNumber: props.seats},
      {headers:
      {'token': localStorage.getItem('token')}}
    )
    if(tickets){
      setShow(false);
      alert("The order was successfully placed")
      navigate('/');
    }
    setShow(false);
  };

  return (
    <div className="outercontainer">
      <Loader show={show}/>
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
                onChange={handleChange}
                // onKeyDown={handleClick}
              />
              <label>Full Name</label>
            </div>
          </div>
        </div>
        <div className="text-right purchasebtn">
          <button className="btn" onClick={hundleClick}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
