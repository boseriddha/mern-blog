const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://blog:ik01cO3qlF4v0gCf@cluster0.xqxamrz.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ username, password });
    res.status(201).json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.listen(4000);

//mongodb+srv://blog:ik01cO3qlF4v0gCf@cluster0.xqxamrz.mongodb.net/?retryWrites=true&w=majority
