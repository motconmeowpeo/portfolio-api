const express = require("express");

const { User } = require("../model/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Create user
router.post("/create", async (req, res) => {
  if (process.env.ALLOW_CREATE_ACCOUNT === '1') {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the number of salt rounds

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    user
      .save()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  else {
    res.json({ message: "Can not create account" })
  }


});


//Get
router.post("/login", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send("Not found");
  } else {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const payload = {
        username: user.username,
        email: user.email,
        // You can include additional data in the payload if needed
      };
      const secretKey = process.env.SECRET_KEY;
      const options = { expiresIn: "720h" };
      const accessToken = jwt.sign(payload, secretKey, options);
      res.json({ accessToken });
    } else {
      res.status(401).send("Invalid username or password");
    }
  }
});

//delete
router.post("/delete", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).send("Access denied");
  }
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
  });
  const email = req.body.email;
  const user = await User.deleteOne({ email });
  if (!user) res.status(404).send("Not found");
  else {
    res.send(user);
  }
});
module.exports = router;
