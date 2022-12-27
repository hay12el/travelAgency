const Flight = require("../model/flight");

exports.addFlight = async (req, res, next) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

exports.deleteFlightById = async (req, res, next) => {
  try {
    const del = await Flight.findOneAndDelete({ _id: req.params.flightId });
    if (!del) {
      res.status(404).send({ msg: "didn't find the flight" });
    } else {
      const flight = await Flight.find();
      res.status(200).send({ msg: "success", flights: flight });
    }
  } catch (err) {
    res.status(404).send({ msg: "unknown problem" });
  }
};

exports.updatePrice = async (req, res, next) => {
  try {
    const { flightId, newPrice } = req.query;
    const del = await Flight.findOneAndUpdate(
      { _id: flightId },
      { price: newPrice }
    );
    if (!del) {
      res.status(404).send({ msg: "didn't find the flight" });
    } else {
      res.status(200).send({ msg: "success" });
    }
  } catch (err) {
    res.sendStatus(404).send({ msg: "unknown problem" });
  }
};

exports.getFlights = async (req, res, next) => {
  try {
    const { from, to, sTime, eTime, maxPrice } = req.query;
    const fromm = from.toLowerCase();
    const too = to.toLowerCase();
    const flights = await Flight.find({
      from: fromm,
      to: too,
      date: { $gte: sTime, $lte: eTime },
      price: { $lte: maxPrice },
    });
    res.status(200).send(flights);
  } catch (err) {
    res.status(404).send({ msg: "some problem hapends" });
  }
};

exports.getFlightsTwoWay = async (req, res, next) => {
  try {
    const { from, to, sTime, eTime, maxPrice } = req.query;
    const fromm = from.toLowerCase();
    const too = to.toLowerCase();
    const flightsTo = await Flight.find({
      from: fromm,
      to: too,
      date: { $gte: sTime, $lte: eTime },
    });
    const flightsBack = await Flight.find({
      from: too,
      to: fromm,
      date: { $gte: sTime, $lte: eTime },
    });

    res.status(200).send({ to: flightsTo, back: flightsBack });
  } catch (err) {
    res.status(404).send({ msg: "some problem hapends" });
  }
};

exports.getFlightById = async (req, res, next) => {
  try {
    const { flightId } = req.query;

    const flight = await Flight.findOne({ _id: flightId });

    res.status(200).send(flight);
  } catch (err) {
    res.status(404).send({ msg: "some problem hapends" });
  }
};