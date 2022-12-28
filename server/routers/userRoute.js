const { Router } = require('express');
const User = require('../model/user');
const userController = require('../controller/userCont');
const verify = require('../middlewares/verifyToken')


const router = Router();

//get all users in db
router.get('/', async (req, res) => {
    User.find().then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err)
    })
})

//update payment
router.put('/updatePayment',  userController.updatePayment);

//login endPoint
router.post('/login', userController.Login);

//register endPoint
router.post('/register', userController.Register);


module.exports = router;