const authRouter = require("express").Router();

const { httpLogin, httpAddUser } = require("./auth.controller");

authRouter.post("/login", httpLogin);
authRouter.post("/register", httpAddUser);

module.exports = authRouter;
