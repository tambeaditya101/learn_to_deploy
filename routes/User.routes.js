const express = require("express");
const userRouter = express.Router();
const { Usermodel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", (req, res) => {
  const { name, age, pw, email } = req.body;
  try {
    bcrypt.hash(pw, (saltRounds = 5), async (err, hash) => {
      // Store hash in your password DB.
      const user = new Usermodel({ name, email, age, pw: hash });
      await user.save();
      res.status(200).send({ msg: "New user has been register" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pw } = req.body;
  try {
    const user = await Usermodel.findOne({ email });

    if (user) {
      bcrypt.compare(pw, user.pw, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorId: user._id, author: user.name },
            "masai"
          );
          res.status(200).send({ msg: "Login successful", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!!" });
        }
        // result == true
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials!!" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
