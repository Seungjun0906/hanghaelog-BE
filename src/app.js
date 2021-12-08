require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./passport");

const app = express();

const authRouter = require("./routes/auth/auth.route");
const postRouter = require("./routes/posts/post.route");

//origin: Front End ip or url
// app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
passportConfig();

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

module.exports = app;
