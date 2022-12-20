import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import "./userPanel.css";
import MyFlight from "../../components/myFlight/MyFlight";

function UserPanel() {
  const user = useSelector((state) => state.user);
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const f = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/ticket/getUsersTicket`,
        { headers: { token: user.token } }
      );
      setFlights(f.data);
      console.log(f.data);
    };
    getData();
  }, []);
  return (
    <div className="userCont">
      <div className="userHeader">
        <p>My Tickets</p>
      </div>
      <div className="helloSec">
        <h1>Hi {user.userName},</h1>
        <p>Here you can find all your tickets.</p>
        <p>Enjoy your journy 😃</p>
      </div>
      {flights &&
        flights.map((x) =>
          x.flightDetails.length !== 0 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyFlight
                key={x.flightDetails[0]._id}
                flight={x.flightDetails[0]}
                seatNumber={x.seatNumber}
              />
            </div>
          ) : null
        )}
    </div>
  );
}

export default UserPanel;
