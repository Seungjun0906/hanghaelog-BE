const postRouter = require("express").Router();

const {
  httpGetPosts,
  httpAddPost,
  httpEditPost,
} = require("./post.controller");

postRouter.get("/", httpGetPosts);
postRouter.post("/", httpAddPost);
postRouter.put("/", httpEditPost);

module.exports = postRouter;
