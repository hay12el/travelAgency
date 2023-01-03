import React, { useState } from "react";
import "./doublePaying.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Airplane from "../../components/airplane/Airplane";
import axios from "axios";
import Payment from "../../components/payment/Payment";
import { useSelector } from "react-redux";

function DoublePaying() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [flight1, setFlight1] = useState({});
  const [choosenSeats1, setChoosenSeats1] = useState([]);
  const [flight2, setFlight2] = useState({});
  const [choosenSeats2, setChoosenSeats2] = useState([]);

  useEffect(() => {
    if(user.token === undefined) {
      alert("please login before add tickets")
      navigate('/login')
    }
    const getFlight = async () => {
      const flightF = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/flight/getFlightById`,
        { params: { flightId: params.firstId } }
      );
      setFlight1(flightF.data);
      const flightS = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/flight/getFlightById`,
        { params: { flightId: params.secondId } }
      );
      setFlight2(flightS.data);
    };
    getFlight();
  }, []);

  return (
    <div className="doublePayingCont">
      <div className="userHeader">
        <p>Booking Tickets</p>
      </div>
      <div className="helloSec1">
        <h1>Hi {user.userName},</h1>
        <h3>Here you can book your tickets.</h3>
        <h3>choose seats and pay.</h3>
        <h3>Enjoy your journy 🛫😎</h3>
      </div>

      <div className="airplaneContainer">
        <>
          {Object.keys(flight1).length !== 0 ? (
            <Airplane
              flight={flight1}
              choosenSeats={choosenSeats1}
              setChoosenSeats={setChoosenSeats1}
            />
          ) : null}
        </>
        <div className="jjj">
          <h1>outbound flight</h1>
        <h1>{"<-------------"}</h1>
          <h1>return flight</h1>
        <h1>{"------------->"}</h1>
        </div>
        <>
          {Object.keys(flight2).length !== 0 ? (
            <Airplane
              flight={flight2}
              choosenSeats={choosenSeats2}
              setChoosenSeats={setChoosenSeats2}
            />
          ) : null}
        </>
      </div>
      <div className="boxe">
        <div className="totalContainer">
          <div className="sec">
            <p>total tickets: </p>
            <p id="price"> {choosenSeats1.length + choosenSeats2.length}</p>
          </div>
          <div className="sec">
            <p>total price:</p>
            <p id="price">
              {choosenSeats1.length * flight1.price +
                choosenSeats2.length * flight2.price}
              $
            </p>
          </div>
        </div>
        <Payment
          flight1={flight1}
          seats1={choosenSeats1}
          flight2={flight2}
          seats2={choosenSeats2}
        />
      </div>
    </div>
  );
}

export default DoublePaying;
