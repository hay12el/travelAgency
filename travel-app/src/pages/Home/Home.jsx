import React, { useRef } from "react";
import { useState } from "react";
import "./home.css";
import coutries from "../../coutries.json";
import axios from "axios";
import Results from "../../components/results/Results";
import Loader from "../../components/loader/Loader";
import { useMemo } from "react";

function Home() {
  const [details, setDetails] = useState({
    from: null,
    to: null,
    sTime: new Date(),
    eTime: null,
    maxPrice: 50,
  });
  const page = useRef(1);
  // const [nextPrev, setNextPrev] = useState({ next: false, prev: false });
  const nextPrev = useRef({ next: false, prev: false });
  const [show, setShow] = useState(false);
  const [fromFlights, setFromFlights] = useState([]);
  const [toFlights, setToFlights] = useState([]);
  const [c, setC] = useState(false);
  const [results, setResults] = useState([]);
  const [oneOrTwo, setOneOrTwo] = useState(1);
  const allORnot = useRef(false);

  const hundleOneOrTwo = (e) => {
    setResults([]);
    setFromFlights([]);
    setToFlights([]);
    setOneOrTwo(e.target.id === "one-way" ? 1 : 0);
  };

  const hundleChange = (e) => {
    page.current = 1;
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
    allORnot.current = false;
    if (
      details.from === null ||
      details.to === null ||
      details.eTime === null ||
      details.sTime === null ||
      details.maxPrice === null
    ) {
      alert("comlete all the parameters!");
      setShow(false);
    } else {
      try {
        const flights = await axios.get(
          `http://localhost:${process.env.REACT_APP_URL}/flight/${
            oneOrTwo === 1 ? "getFlights" : "getFlightsTwoWay"
          }?page=${page.current}&limit=5`,
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
        nextPrev.current = {
          next: flights.data.next,
          prev: flights.data.privius,
        };

        if (oneOrTwo === 1) {
          setResults(flights.data.flights);
        } else {
          setToFlights(flights.data.flights.to);
          setFromFlights(flights.data.flights.back);
          let x = [];
          ////
          for (let i = 0; i < toFlights.length; i++) {
            for (let j = 0; j < fromFlights.length; j++) {
              if (
                toFlights[i].price + fromFlights[j].price <
                details.maxPrice
              ) {
                if (
                  new Date(toFlights[i].date) <= new Date(fromFlights[j].date)
                ) {
                  x.push([toFlights[i], fromFlights[j]]);
                }
              }
            }
          }
          setResults(x);
        }
        setShow(false);
      } catch (err) {
        setShow(false);
        alert(`no flight from ${details.from} to ${details.to}`);
      }
    }
  };

  const handleAllFlights = async () => {
    allORnot.current = true;
    setOneOrTwo(1);
    setResults([]);
    setFromFlights([]);
    setToFlights([]);
    setShow(true);
    page.current = page.current === 1 ? 1 : page.current;
    const flights = await axios.get(
      `http://localhost:${process.env.REACT_APP_URL}/flight/?page=${page.current}&limit=5`
    );
    nextPrev.current = { next: flights.data.next, prev: flights.data.privius };
    console.log(flights.data.next);
    setResults(flights.data.flights);
    setShow(false);
  };

  const hundleArrowClick = (e) => {
    if (e.target.id !== "") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (e.target.id === "right") {
        page.current++;
      } else {
        page.current--;
      }
      allORnot.current ? handleAllFlights() : hundleSubmit();
    }
  };

  return (
    <>
      <div className="HomeContainer">
        <Loader show={show} />
        <div className="GetAllFlight">
          <div className="gaf">
            <h3>press here to get all our flights</h3>
          </div>
          <button className="btn" id="np" onClick={handleAllFlights}>
            Get All Flight
          </button>
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
                    <input
                      className="form-control"
                      type="date"
                      id="sTime"
                      onChange={hundleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="info-box" id="return-box">
                    {oneOrTwo === 0 ? (
                      <label>RETURNING ON</label>
                    ) : (
                      <label>TO:</label>
                    )}

                    <input
                      className="form-control"
                      type="date"
                      id="eTime"
                      onChange={hundleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
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
      {(results.length !== 0 || toFlights.length !== 0) && (
        <div className="arrows">
          <button
            className="arrow"
            id="left"
            onClick={hundleArrowClick}
            disabled={nextPrev.current.prev ? false : true}
          >
            <span id="left" disabled={nextPrev.current.prev ? false : true}>
              prev
            </span>
          </button>
          <span className="currentPage"><b>{page.current}</b></span>
          <button
            className="arrow"
            id="right"
            onClick={hundleArrowClick}
            disabled={nextPrev.current.next ? false : true}
          >
            <span id="right" disabled={nextPrev.current.next ? false : true}>
              Next
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
