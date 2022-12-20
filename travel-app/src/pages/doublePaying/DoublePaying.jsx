import React, { useState } from "react";
import "./doublePaying.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Airplane from "../../components/airplane/Airplane";
import axios from "axios";

function DoublePaying() {
  const params = useParams();
  const [flight1, setFlight1] = useState({});
  const [choosenSeats1, setChoosenSeats1] = useState([]);
  const [flight2, setFlight2] = useState({});
  const [choosenSeats2, setChoosenSeats2] = useState([]);

  useEffect(() => {
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

  useEffect(()=>{console.log(choosenSeats2);},[choosenSeats2])

  return (
    <div className="doublePayingCont">
      <div className="airplaneContainer">
        {Object.keys(flight1).length !== 0 && (
          <Airplane
            flight={flight1}
            key={flight1._id}
            setChoosenSeats={setChoosenSeats1}
            choosenSeats={choosenSeats1}
          />
        )}
        {Object.keys(flight2).length !== 0 && (
          <Airplane
            flight={flight2}
            key={flight2._id}
            setChoosenSeats={setChoosenSeats2}
            choosenSeats={choosenSeats2}
          />
        )}
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
        {/* <Payment flight={flight} seats={choosenSeats}/> */}
      </div>
    </div>
  );
}

export default DoublePaying;
