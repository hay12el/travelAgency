const { Router } = require("express");
const flightCont = require('../controller/flightCont');
const Flight = require('../model/flight')
const validate = require('../middlewares/verifyToken');
const { route } = require("./userRoute");

const router = Router();

router.get('/', async (req, res) => {
    const flights = await Flight.find();
    res.send(flights);
})

router.get('/getFlights', flightCont.getFlights)

router.get('/getFlightsTwoWay', flightCont.getFlightsTwoWay)

router.get('/getFlightById', flightCont.getFlightById)

// add verify token!!!!!!!!
router.post('/addFlight',flightCont.addFlight)

router.delete('/deleteFlight/:flightId', validate.verifyToken ,flightCont.deleteFlightById)

router.put('/updatePrice', validate.verifyToken, flightCont.updatePrice)


module.exports = router;