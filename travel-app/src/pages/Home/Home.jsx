import React from "react";
import { useState } from "react";
import "./home.css";
import coutries from "../../coutries.json";
import axios from "axios";
import Results from "../../components/results/Results";
import Loader from "../../components/loader/Loader";

function Home() {
  const [details, setDetails] = useState({
    from: null,
    to: null,
    sTime: new Date(),
    eTime: null,
    maxPrice: 50,
  });

  const [show, setShow] = useState(false);
  const [fromFlights, setFromFlights] = useState([]);
  const [toFlights, setToFlights] = useState([]);
  const [c, setC] = useState(false);

  const [results, setResults] = useState([]);

  const [oneOrTwo, setOneOrTwo] = useState(1);

  const hundleOneOrTwo = (e) => {
    setResults([]);
    setFromFlights([]);
    setToFlights([]);
    setOneOrTwo(e.target.id === "one-way" ? 1 : 0);
  };

  const hundleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const sortBy = (x) => {
    if (oneOrTwo === 1) {
      switch (x) {
        case 0:
          setResults(results.sort((x, y) => x.price - y.price));
          setC(!c);
          break;
        case 1:
          setResults(results.sort((x, y) => y.price - x.price));
          setC(!c);
          break;
        case 2:
          setResults(results.sort((x, y) => x.seats.length - y.seats.length));
          setC(!c);
          break;
        case 3:
          setResults(results.sort((x, y) => x.from.localeCompare(y.from)));
          setC(!c);
          break;
        default:
          console.log("ff");
      }
    } else {
      switch (x) {
        case 0:
          setResults(
            results.sort(
              (x, y) => x[0].price + x[1].price - y[0].price - y[1].price
            )
          );
          setC(!c);
          break;
        case 1:
          setResults(
            results.sort(
              (x, y) => y[0].price + y[1].price - x[0].price - x[1].price
            )
          );
          setC(!c);
          break;
        case 2:
          setResults(results.sort((x, y) => Date(x[0].date) - Date(y[0].date)));
          setC(!c);
          break;
        case 3:
          setResults(
            results.sort((x, y) => x[0].from.localeCompare(y[0].from))
          );
          setC(!c);
          break;
        default:
          console.log("ff");
      }
    }
  };

  const hundleSubmit = async () => {
    setShow(true);
    if (
      details.from === null ||
      details.to === null ||
      details.eTime === null ||
      details.sTime === null ||
      details.maxPrice === null
    ) {
      alert("comlete all the parameters!");
    } else {
      const flights = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/flight/${
          oneOrTwo === 1 ? "getFlights" : "getFlightsTwoWay"
        }`,
        {
          params: {
            from: details.from,
            to: details.to,
            eTime: details.eTime,
            sTime: details.sTime,
            maxPrice: details.maxPrice,
          },
        }
      );

      if (oneOrTwo === 1) {
        setResults(flights.data);
      } else {
        setToFlights(flights.data.to);
        setFromFlights(flights.data.back);
        let x = [];
        for (let i = 0; i < toFlights.length; i++) {
          for (let j = 0; j < fromFlights.length; j++) {
            if (toFlights[i].price + fromFlights[j].price < details.maxPrice) {
              x.push([toFlights[i], fromFlights[j]]);
            }
          }
        }
        setResults(x);
      }
    }
    setShow(false);
  };

  const handleAllFlights = async () => {
    setResults([]);
    setFromFlights([]);
    setToFlights([]);
    setShow(true);
    const flights = await axios.get(
      `http://localhost:${process.env.REACT_APP_URL}/flight/`
    );
    setResults(flights.data);
    setShow(false);
  };

  return (
    <>
      <div className="HomeContainer">
        <Loader show={show} />
        <div className="GetAllFlight">
          <div className="gaf">
            <h3>press here to get all our flights</h3>
          </div>
          <button className="btn" id="np" onClick={handleAllFlights}>Get All Flight</button>
        </div>
        <div id="search-form">
          <div id="header">
            <h1>SEARCH FOR CHEAP FLIGHTS</h1>
          </div>
          <section>
            <div className="flight" id="flightbox">
              <div id="flight-form">
                <div id="flight-type">
                  <div className="info-box">
                    <input
                      type="radio"
                      name="flight-type"
                      value="Return"
                      id="one-way"
                      checked={oneOrTwo === 1}
                      onClick={hundleOneOrTwo}
                    />
                    <label>One-Way Ticket</label>
                  </div>
                  <div className="info-box">
                    <input
                      type="radio"
                      name="flight-type"
                      value="Single"
                      id="two-way"
                      hecked={oneOrTwo === 0}
                      onClick={hundleOneOrTwo}
                    />
                    <label>Two-Way Ticket </label>
                  </div>
                </div>
                <div id="flight-depart">
                  <div className="info-box">
                    <label>LEAVING FROM</label>
                    <select
                      name="from"
                      id="from"
                      className="lBtn"
                      onChange={hundleChange}
                      style={{
                        direction: "ltr",
                      }}
                    >
                      {coutries.coutries.map((x) => (
                        <option key={x.name} value={x.name}>
                          {x.name} - {x.code}
                        </option>
                      ))}
                    </select>
                    {/* <input type="text" id="dep-from" /> */}
                    <div id="depart-res"></div>
                  </div>
                  <div className="info-box" id="arrive-box">
                    <label>ARRIVING AT</label>
                    <select
                      name="to"
                      id="to"
                      className="lBtn"
                      onChange={hundleChange}
                      style={{
                        direction: "ltr",
                      }}
                    >
                      {coutries.coutries.map((x) => (
                        <option key={x.name} value={x.name}>
                          {x.name} - {x.code}
                        </option>
                      ))}
                    </select>
                    <div id="arrive-res"></div>
                  </div>
                </div>

                <div id="flight-dates">
                  <div className="info-box">
                    {oneOrTwo === 0 ? (
                      <label>FLIGHT ON</label>
                    ) : (
                      <label>FROM:</label>
                    )}
                    <input type="date" id="sTime" onChange={hundleChange} />
                  </div>
                  <div className="info-box" id="return-box">
                    {oneOrTwo === 0 ? (
                      <label>RETURNING ON</label>
                    ) : (
                      <label>TO:</label>
                    )}
                    <input type="date" id="eTime" onChange={hundleChange} />
                  </div>
                  <div className="info-box">
                    <span className="sm">
                      <label htmlFor="range">max price</label>
                      <p>{details.maxPrice}$</p>
                    </span>

                    <input
                      type="range"
                      id="maxPrice"
                      min={50}
                      max={3000}
                      onChange={hundleChange}
                    />
                  </div>
                </div>

                <div id="flight-search">
                  <div className="info-box">
                    <button className="btnH" onClick={hundleSubmit}>
                      search-flight
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="sortCont">
        <button className="btn" onClick={() => sortBy(1)}>
          Sort from expensive to cheap
        </button>
        <button className="btn" onClick={() => sortBy(0)}>
          Sort from cheap to expensive
        </button>
        <button className="btn" onClick={() => sortBy(2)}>
          Sort by most Popular
        </button>
        <button className="btn" onClick={() => sortBy(3)}>
          Sort by country
        </button>
      </div>
      <Results flights={results} oneOrTwo={oneOrTwo} change={c} />
    </>
  );
}

export default Home;
