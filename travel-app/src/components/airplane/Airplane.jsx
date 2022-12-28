import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Airplane({ flight, setChoosenSeats, choosenSeats }) {
  const [seats, setSeats] = useState([]);
  const [numOfSeats, setNumOfSeats] = useState(0);
  const [totalSeats, setTotalSeats] = useState([]);

  useEffect(() => {
    setNumOfSeats(flight.numOfSeats);
    setSeats(flight.seats);
    if (totalSeats.length === 0) {
      for (let i = 1; i <= 60; i++) {
        setTotalSeats((prev) => [...prev, i]);
      }
    }
  }, []);

  function hundleChange(e) {
    console.log(e.target.value);
    choosenSeats.includes(e.target.id)
      ? setChoosenSeats(choosenSeats.filter((item) => item !== e.target.id))
      : setChoosenSeats((prev) => [...prev, e.target.id]);
  }

  return (
    <div>
      {numOfSeats === 0 ? (
        <p>please wait</p>
      ) : (
        <div className={"plane"}>
          <div className={"cockpit"}>
            <h1>Boing 999</h1>
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
                        id={x}
                        onClick={hundleChange}
                      />
                      <label htmlFor={x} key={"la" + x + flight._id}>{x}</label>
                    </li>
                  ) : (
                    <li class="seat" key={"" + x + flight._id}>
                      <input
                        type="checkbox"
                        id={x}
                        disabled
                        onClick={hundleChange}
                      />
                      <label htmlFor={x} >{x}</label>
                    </li>
                  )
                )}
              </ol>
            </li>
          </ol>
          
          <input type="checkbox" id="cc" onClick={hundleChange} />
          <div class="exit exit--back fuselage"></div>
          <select name="ss" id="ss" style={{height: '90px'}} onChange={hundleChange}>
            {
              seats.map(x => (
                <option value={x} id={x}>{x}</option>
              ))
            }
          </select>
        </div>
      )}
    </div>
  );
}

export default Airplane;
