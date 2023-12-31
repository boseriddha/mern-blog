const uri = require("mongoUri");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const salt = bcrypt.genSaltSync();
const secret = "asdfaklsdjfasdincvasdlkjfhbvasdfkjasdfasdfoiegjhskdbfalsjkdfh";
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(`${__dirname}/uploads`));

mongoose.connect(uri);

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
  //   console.log(req.body);
  const userDoc = await User.findOne({ username });
  //   console.log(userDoc);
  const passOk = bcrypt.compareSync(password, userDoc.password);
  //   console.log(passOk);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username: username,
      });
    });
    // res.status(201).json("ok");
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const ext = originalname.split(".").pop();
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: { username: info.username, authorId: info.id },
      postId: uuidv4(),
    });
    res.json(postDoc);
  });
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const ext = originalname.split(".").pop();
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content, postId } = req.body;
    const postDoc = await Post.findOne({ postId: postId });
    const isAuthor =
      JSON.stringify(info.id) === JSON.stringify(postDoc.author.authorId);
    if (!isAuthor) {
      res.status(400).json("you are not the author!");
      throw "you are not the author!";
    }
    const response = await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json({ response });
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
  res.json(posts);
});

app.get("/post/:author/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findOne({ postId: id });
  res.json(postDoc);
});

app.listen(4000);
