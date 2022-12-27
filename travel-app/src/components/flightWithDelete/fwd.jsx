import React from 'react'
import airplane from "../../utils/flight.png";

function FWD(props) {

    const hundleClick = async () => {
        console.log(props.flight._id);
    }
  return (
    <div className="FContainer">
      <div className="main">
        <div className="mainUp">{props.flight.date.split('T')[0]}</div>
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
        <p>{props.flight.price}$</p>
        <button className="btnF" id="redBtn" onClick={hundleClick}>
          delete flight
        </button>
      </div>
    </div>
  )
}

export default FWD