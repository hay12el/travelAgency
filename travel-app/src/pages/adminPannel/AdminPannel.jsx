import axios from "axios";
import React from "react";
import { useState } from "react";
import "./adminPannel.css";
import { useEffect } from "react";
import FWD from "../../components/flightWithDelete/fwd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminPannel() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
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

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (user.isAdmin === "false") {
      console.log("not admin");
      navigate("/userPanel");
    } else {
      const getData = async () => {
        const flights = await axios.get(
          `http://localhost:${process.env.REACT_APP_URL}/flight/`
        );
        setResults(flights.data.flights);
      };

      getData();
    }
  }, []);

  const handleCange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
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
      <div className="ff">
        <div className="adminlll">
          <div className="upponLog">
            <p> add new flight </p>
          </div>
          <div className="col">
            <div className="right1">
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
            </div>
            <div className="right1">
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
            </div>
          </div>

          <div className="right1">
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
          </div>
          <button
            className="confirmBtn"
            id="addF"
            type="submit"
            onClick={handleSubmit}
          >
            Add Flight
          </button>
        </div>
      </div>
      <div className="adminDeleteSection">
        <h1>deleting section:</h1>
        {results
          ? results.map((flight) => (
              <FWD flight={flight} key={flight._id} setResults={setResults} />
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminPannel;
