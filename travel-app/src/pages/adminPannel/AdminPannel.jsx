import axios from "axios";
import React from "react";
import { useState } from "react";
import "./adminPannel.css";

function AdminPannel() {
  const [details, setDetails] = useState({
    to: null,
    from: null,
    date: null,
    landHour: null,
    depHour: null,
    numOfSeats: null,
    seats: null,
    price: null,
  });

  const handleCange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    let s = [];
    for (let i = 1; i <= details.numOfSeats; i++) {
      s.push(i);
    }
    setDetails((prev) => ({ ...prev, ["seats"]: s }));

    const newFlight = await axios.post(
      `http://localhost:5000/flight/addFlight`,
      details
    );
    if (newFlight) {
      alert("new flight added!");
      window.location.reload(false);
    }
  };

  return (
    <div className="adminContainer">
      <div className="inpC" id="adminlll">
        <div className="upponLog">
          <p> add new flight </p>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="name"
            id="from"
            dir="ltr"
            onChange={handleCange}
          />
          <label>From</label>
        </div>

        <div className="inputBox">
          <input
            type="text"
            name="to"
            id="to"
            dir="ltr"
            onChange={handleCange}
          />
          <label>To</label>
        </div>

        <div className="inputBox">
          <input
            type="date"
            name="date"
            id="date"
            dir="ltr"
            onChange={handleCange}
          />
          <label>Date</label>
        </div>

        <div className="inputBox">
          <input
            type="number"
            name="depHour"
            id="depHour"
            dir="ltr"
            onChange={handleCange}
          />
          <label>dept Hour</label>
        </div>

        <div className="inputBox">
          <input
            type="number"
            name="landHour"
            dir="ltr"
            id="landHour"
            onChange={handleCange}
          />
          <label>land Hour</label>
        </div>

        <div className="inputBox">
          <input
            type="number"
            name="price"
            dir="ltr"
            id="price"
            onChange={handleCange}
          />
          <label>price</label>
        </div>

        <div className="inputBox">
          <input
            type="number"
            name="numOfSeats"
            dir="ltr"
            id="numOfSeats"
            onChange={handleCange}
          />
          <label>number Of Seats</label>
        </div>

        <button className="confirmBtn" type="submit" onClick={handleSubmit}>
          Add Flight
        </button>
      </div>
    </div>
  );
}

export default AdminPannel;
