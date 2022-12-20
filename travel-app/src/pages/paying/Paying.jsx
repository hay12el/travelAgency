import axios from "axios";
import React, { useRef } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./paying.css";
import Payment from "../../components/payment/Payment";
import Airplane from "../../components/airplane/Airplane";

function Paying() {
  const paramss = useParams();
  const [flight, setFlight] = useState({});
  const [choosenSeats, setChoosenSeats] = useState([]);

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
    <div className="payingCont">
      <>
      { Object.keys(flight).length !== 0 && <Airplane flight={flight} setChoosenSeats={setChoosenSeats} choosenSeats={choosenSeats}/> }
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
          <Payment flight={flight} seats={choosenSeats}/>
        </div>
      </>
    </div>
  );
}

export default Paying;
