import React from "react";
import airplane from "../../utils/flight.png";
import "./myFlight.css";
import { MdChairAlt } from "react-icons/md";

function MyFlight(props) {
  const hundleClick = () => {
    console.log(props.flight._id);
  };
  return (
    <div className="FContainer" id="ttt">
      <div className="main">
        <div className="mainUp">{props.flight.date.split("T")[0]}</div>
        <div className="mainDown">
          <div className="leftSide">
            <div className="right">
              <p id={"from"}>{props.flight.from}</p>
              <p id={"deptHour"} className="hour">
                {props.flight.depHour}:00
              </p>
            </div>
            <div className="middle">
              <p>-----</p>
              <div className="fc">
                <img src={airplane} alt="fly" id="flight" />
              </div>
              <p>{"----->"}</p>
            </div>
            <div className="right">
              <p id={"from"}>{props.flight.to}</p>
              <p id={"deptHour"} className="hour">
                {props.flight.landHour}:00
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="priceAndBottun">
        <div className="chair" >
          <MdChairAlt size={40}/>
          <p>Seat No': {props.seatNumber}</p>
        </div>
        <button className="btnF" id="redBtn" onClick={hundleClick}>
          delete ticket
        </button>
      </div>
    </div>
  );
}

export default MyFlight;
