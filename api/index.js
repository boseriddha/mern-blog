const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync();
const secret = bcrypt.genSaltSync();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://blog:ik01cO3qlF4v0gCf@cluster0.xqxamrz.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(201).json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const userDoc = await User.findOne({ username });
  console.log(userDoc);
  const passOk = bcrypt.compareSync(password, userDoc.password);
  console.log(passOk);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
    // res.status(201).json("ok");
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.listen(4000);
