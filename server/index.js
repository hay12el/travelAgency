const express = require('express')
const mongoose = require('mongoose');
const userRoute = require('./routers/userRoute');
const ticketRoute = require('./routers/ticketRoute');
const fligheRoute = require('./routers/flightRoute');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', userRoute);
app.use('/ticket', ticketRoute);
app.use('/flight', fligheRoute);

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//connect to Atlas
mongoose.connect(process.env.MONGOURL, connectionParams)
.then(()=> {
    console.log("connect to DB");
    app.listen(5000, () => {
        console.log("succss to listen");
    })
})
.catch((err) => {console.log(err);})