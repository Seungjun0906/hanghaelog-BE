require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./passport");

const path = require("path");

const app = express();

const authRouter = require("./routes/auth/auth.route");
const postRouter = require("./routes/posts/post.route");

// origin: Front End ip or url
app.use(cors({ origin: "http://localhost:3001" }));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
passportConfig();

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "public", "index.html"));
});

module.exports = app;
