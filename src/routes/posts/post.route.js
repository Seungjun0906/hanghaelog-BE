const postRouter = require("express").Router();

const passport = require("passport");
const authenticateUser = () => passport.authenticate("jwt", { session: false });

const {
  httpGetPosts,
  httpAddPost,
  httpEditPost,
  httpDeletePost,
  httpAddComment,
} = require("./post.controller");

// POST CRUD
postRouter.get("/", httpGetPosts);
postRouter.post("/", authenticateUser(), httpAddPost);
postRouter.put("/:postId", authenticateUser(), httpEditPost);
postRouter.delete("/:postId", authenticateUser(), httpDeletePost);

// COMMENT
// postRouter.get();
postRouter.post("/:postId/comments", authenticateUser(), httpAddComment);
// postRouter.put()
// postRouter.delete()

module.exports = postRouter;
