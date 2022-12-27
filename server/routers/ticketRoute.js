const { Router } = require("express");
const { verify } = require("jsonwebtoken");
const ticketCon = require('../controller/ticketCont');
const validate = require('../middlewares/verifyToken');

const router = Router();

router.get('/', ticketCon.getAllTickets);

router.post('/addTicket', validate.verifyToken ,ticketCon.addTicket);

router.get('/getUsersTicket', validate.verifyToken ,ticketCon.getAllTicketsById);

router.delete('/DeleteTicketByUser/:seatNo/:flightId', validate.verifyToken, ticketCon.DeleteTicketByUser);

module.exports = router;