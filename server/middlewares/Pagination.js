const Flights = require('../model/flight');

exports.FlightsPagination = (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    console.log(page + ' ' + limit);
    next();
}