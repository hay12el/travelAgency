const Ticket = require("../model/ticket");
const Flight = require("../model/flight");
const { Login } = require("./userCont");

exports.getAllTickets = async (req, res, next) => {
  const tickets = await Ticket.find();
  res.status(200).send(tickets);
};

//pay attention! seatNumber parameter has to be array of numbers!
exports.addTicket = async (req, res, next) => {
  try {
    const { flightId, seatNumber} = req.body;
    const userId = req.adminId;
    const flightToUpdate = await Flight.findByIdAndUpdate(
      { _id: flightId },
      { $pullAll: { seats: seatNumber } }
    );
    if (!flightToUpdate) {
      throw new Error({ err: "no flight" });
    } else {
      const tickets = seatNumber.map((seatN) => {
        return { flightId: flightId, userId: userId, seatNumber: seatN };
      });
      Ticket.insertMany(tickets, (err, docs) => {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        } else {
          res.status(200).send(docs);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ msg: err });
  }
};

exports.getAllTicketsById = async (req, res, next) => {
  try{
    const tickets = await Ticket.aggregate([{$lookup: {
      from: 'flights',
      localField: 'flightId',
      foreignField: '_id',
      let: {userId: req.adminId},
      pipeline: [],
      as: 'flightDetails'
    }}])
    // console.log(tickets);
    // const tickets = await Ticket.find({userId: req.adminId});
    // res.status(200);
    res.status(200).send(tickets);
  }catch(err){
    res.status(404).send(err);
  }
}
