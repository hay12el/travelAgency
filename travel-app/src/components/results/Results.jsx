import React from "react";
import { useState } from "react";
import FlightResult from "../flightResult/FlightResult";
import "./results.css";
import DoubleFlight from "../doubleFlight/DoubleFlight";

function Results(props) {
  const [ch, setCh] = useState(props.c)
  return (
    <div className="ResultsContainer">
      {props.oneOrTwo === 1
        ? props.flights.map((flight) => (
            <FlightResult key={flight._id} flight={flight} />
          ))
        : props.flights.map((flight) => (
            <div className="doubleR">
              <DoubleFlight key={flight[0]._id+flight[1]._id} flight={flight}/>
            </div>
          ))}
    </div>
  );
}

export default Results;
