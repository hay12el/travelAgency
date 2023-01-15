const { Router } = require("express");
const flightCont = require('../controller/flightCont');
const Flight = require('../model/flight')
const validate = require('../middlewares/verifyToken');
const { route } = require("./userRoute");

const router = Router();

router.get('/', async (req, res) => {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    const flights = await Flight.find()
    .limit(limit)
    .skip(startIndex).exec();

    results.flights = flights;
    results.privius = startIndex > 0 ? {page: parseInt(page) - 1, limit: limit} : null;
    results.next = endIndex < await Flight.countDocuments().exec() ? 
    {
      page: parseInt(page) + 1,
      limit: limit
    } 
    : null;
    res.send(results);
})

router.get('/getFlights', flightCont.getFlights)

router.get('/getFlightsTwoWay', flightCont.getFlightsTwoWay)

router.get('/getFlightById', flightCont.getFlightById)

// add verify token!!!!!!!!
router.post('/addFlight',flightCont.addFlight)

router.delete('/deleteFlight/:flightId', validate.verifyToken ,flightCont.deleteFlightById)

router.put('/updatePrice', validate.verifyToken, flightCont.updatePrice)


module.exports = router;