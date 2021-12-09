const authRouter = require("express").Router();
const { authenticateUser } = require("../../middlewares/middleware");

const { httpGetUser, httpLogin, httpAddUser } = require("./auth.controller");

authRouter.get("/", authenticateUser(), httpGetUser);
authRouter.post("/login", httpLogin);
authRouter.post("/register", httpAddUser);

module.exports = authRouter;
