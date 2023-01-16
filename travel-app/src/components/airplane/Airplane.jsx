import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import airplane from "../../utils/flight.png";

function Airplane({ flight, setChoosenSeats, choosenSeats }) {
  const [seats, setSeats] = useState([]);
  const [numOfSeats, setNumOfSeats] = useState(0);
  const [totalSeats, setTotalSeats] = useState([]);

  useEffect(() => {
    console.log(flight);
    setNumOfSeats(flight.numOfSeats);
    setSeats(flight.seats);
    if (totalSeats.length === 0) {
      for (let i = 1; i <= 60; i++) {
        setTotalSeats((prev) => [...prev, i]);
      }
    }
  }, []);

  function hundleChange(e) {
    choosenSeats.includes(e.target.name)
      ? setChoosenSeats(choosenSeats.filter((item) => item !== e.target.name))
      : setChoosenSeats((prev) => [...prev, e.target.name]);
  }

  return (
    <div>
      {numOfSeats === 0 ? (
        <p>please wait</p>
      ) : (
        <div className={"plane"}>
          <div className={"cockpit"}>
            <img src={airplane} alt="fly" id="flight" />
            <h1>
              from {flight.from} to {flight.to}
            </h1>
            <h4>
              {flight.date.split("T")[0]}
            </h4>
            <h4>
              {flight.depHour}:00 - {flight.landHour}:00
            </h4>
          </div>
          <div class="exit exit--front fuselage"></div>
          <ol class="cabin fuselage">
            <li className="row row--1">
              <ol className="seats" type="A">
                {totalSeats.map((x) =>
                  seats.includes(x) ? (
                    <li class="seat" key={"" + x + flight._id}>
                      <input
                        type="checkbox"
                        key={"ch" + x + flight._id}
                        id={x + flight._id}
                        name={x}
                        onClick={hundleChange}
                      />
                      <label
                        htmlFor={x + flight._id}
                        key={"la" + x + flight._id}
                      >
                        {x}
                      </label>
                    </li>
                  ) : (
                    <li class="seat" key={"" + x + flight._id}>
                      <input
                        type="checkbox"
                        id={x}
                        disabled
                        onClick={hundleChange}
                      />
                      <label htmlFor={x}>{x}</label>
                    </li>
                  )
                )}
              </ol>
            </li>
          </ol>
          <div class="exit exit--back fuselage"></div>
        </div>
      )}
    </div>
  );
}

export default Airplane;
