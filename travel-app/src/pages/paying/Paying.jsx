import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./paying.css";
import Payment from "../../components/payment/Payment";
import Airplane from "../../components/airplane/Airplane";
import { useSelector } from "react-redux";

function Paying() {
  const paramss = useParams();
  const [flight, setFlight] = useState({});
  const [choosenSeats, setChoosenSeats] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getFlight = async () => {
      const flightF = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/flight/getFlightById`,
        { params: { flightId: paramss.id } }
      );
      setFlight(flightF.data);
      console.log(flightF.data);
    };
    getFlight();
  }, []);
  return (
    <div className="concon">
      <div className="userHeader">
        <p>Booking Tickets</p>
      </div>
      <div className="helloSec1">
        <h1>Hi {user.userName},</h1>
        <h3>Here you can book your tickets.</h3>
        <h3>choose seats and pay.</h3>
        <h3>Enjoy your journy 🛫😎</h3>
      </div>

      <div className="payingCont">
        <>
          {Object.keys(flight).length !== 0 && (
            <Airplane
              flight={flight}
              setChoosenSeats={setChoosenSeats}
              choosenSeats={choosenSeats}
            />
          )}
          <div className="boxe">
            <div className="totalContainer">
              <div className="sec">
                <p>total tickets: </p>
                <p id="price"> {choosenSeats.length}</p>
              </div>
              <div className="sec">
                <p>total price:</p>
                <p id="price">{choosenSeats.length * flight.price}$</p>
              </div>
            </div>
            <Payment flight={flight} seats={choosenSeats} />
          </div>
        </>
      </div>
    </div>
  );
}

export default Paying;
