const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.Register = async (req, res, next) => {
  try {
    const {userName, email, phone, password, bDate} = req.body;
    const fName = userName.split(" ")[0];
    const lName = userName.split(" ")[1];
    const country = 'israel';

    const user1 = await User.find({ email: req.body.email });
    if (user1.length != 0) {
      throw new Error("Required");
    } else {
      const temp = {fName, lName, email, phone, country, bDate};
      temp.isAdmin = false;
      const user = new User(temp);
      user.CCNumber = randomCC(12);
      user.password = await bcrypt.hash(password.toString(), 10);
      await user.save();
      
      const newToken = jwt.sign({ _id: user._id }, process.env.secretKey, {
        expiresIn: "7 days",
      });
      user.toJSON();
      delete user.password;
      res.status(200).send({ token: newToken, user: user });
    }
  } catch (err) {
    res.status(200).send(err);
  }
};

exports.Login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  try {
    if (!user) {
      res.sendStatus(403);
    } else {
      const comparePassword = await bcrypt.compare(req.body.password.toString(), user.password);
      if (!comparePassword) {
        res.sendStatus(404);
      } else {
        jwt.sign(
          { _id: user._id },
          process.env.secretKey,
          { expiresIn: "7 days" },
          (err, token) => {
            if (err) {
              res.sendStatus(403);
            } else {
              res.json({ token: token, user: user }).sendStatus(200);
            }
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(403).json({ message: err });
  }
};

const hash = (pass) => {
  bcrypt.hash(pass, "saltToChange", function (err, hash) {
    return hash;
  });
};

const randomCC = (x) => {
  var chars = "0123456789";
  var passwordLength = 12;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
   }
   return Number(password);
}
