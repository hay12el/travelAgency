import React from "react";
import airplane from "../../utils/flight.png";
import { useNavigate } from "react-router-dom";
import "./doubleFlight.css";

function DoubleFlight(props) {
  const navigate = useNavigate();

  const hundleClick = () => {
    navigate(`/doublePaying/${props.flight[0]._id}&${props.flight[1]._id}`);
  };
  return (
    <div className="FContainer">
      <div className="mainCont">
        <div className="main">
          <div className="mainUp">{props.flight[0].date.split("T")[0]}</div>
          <div className="mainDown">
            <div className="leftSide">
              <div className="right">
                <p id={"from"}>{props.flight[0].from}</p>
                <p id={"deptHour"} className="hour">
                  {props.flight[0].depHour}:00
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
                <p id={"from"}>{props.flight[0].to}</p>
                <p id={"deptHour"} className="hour">
                  {props.flight[0].landHour}:00
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="main">
          <div className="mainUp">{props.flight[1].date.split("T")[0]}</div>
          <div className="mainDown">
            <div className="leftSide">
              <div className="right">
                <p id={"from"}>{props.flight[1].from}</p>
                <p id={"deptHour"} className="hour">
                  {props.flight[1].depHour}:00
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
                <p id={"from"}>{props.flight[1].to}</p>
                <p id={"deptHour"} className="hour">
                  {props.flight[1].landHour}:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="priceAndBottun" id="priceDouble">
        <p>{props.flight[0].price + props.flight[1].price}$</p>
        <button className="btnF"  onClick={hundleClick}>
          fly!
        </button>
      </div>
    </div>
  );
}

export default DoubleFlight;
