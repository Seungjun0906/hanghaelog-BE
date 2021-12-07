// const { sequelize, User, Comment, Post } = require("./models/models/index");
const express = require("express");

const authRouter = require("./routes/auth/auth.route");
const postRouter = require("./routes/posts/post.route");

const cors = require("cors");

const app = express();

//origin: Front End ip or url
// app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

module.exports = app;
