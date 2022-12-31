import React, { useState } from "react";
import "./doublePaying.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Airplane from "../../components/airplane/Airplane";
import axios from "axios";
import Payment from "../../components/payment/Payment";

function DoublePaying() {
  const params = useParams();
  const [flight1, setFlight1] = useState({});
  const [choosenSeats1, setChoosenSeats1] = useState([]);
  const [flight2, setFlight2] = useState({});
  const [choosenSeats2, setChoosenSeats2] = useState([]);

  const changeHandle = (e) => {
    if (e.target.name === "f1") {
      choosenSeats1.includes(e.target.id)
        ? setChoosenSeats1(choosenSeats1.filter((x) => x !== e.target.id))
        : setChoosenSeats1((prev) => [...prev, e.target.id]);
    } else {
      choosenSeats2.includes(e.target.id)
        ? setChoosenSeats2(choosenSeats2.filter((x) => x !== e.target.id))
        : setChoosenSeats2((prev) => [...prev, e.target.id]);
    }
  };
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

  return (
    <div className="doublePayingCont">
      <div className="airplaneContainer">
        {/* {Object.keys(flight1).length !== 0 && (
          <select name="f1" id="f1" onChange={changeHandle}>
            {flight1.seats.map((x) => (
              <option key={x + flight1._id}>{x}</option>
            ))}
          </select>
        )} */}
        <div className="ssee">
          <h2>
            from {flight1.from} to {flight1.to}
          </h2>
          {Object.keys(flight1).length !== 0 && (
            <div className="air">
              {flight1.seats.map((x) => (
                <label key={x + flight1._id + "1"}>
                  <input
                    type="checkbox"
                    key={x + flight1._id}
                    onChange={changeHandle}
                    id={x}
                    name="f1"
                  />
                  {x}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="ssee">
          <h2>
            from {flight2.from} to {flight2.to}
          </h2>
          {Object.keys(flight2).length !== 0 && (
            <div className="air">
              {flight2.seats.map((x) => (
                <label key={x + flight2._id + "2"}>
                  <input
                    type="checkbox"
                    key={x + flight2._id}
                    onChange={changeHandle}
                    id={x}
                    name="f2"
                  />
                  {x}
                </label>
              ))}
            </div>
          )}
        </div>
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
