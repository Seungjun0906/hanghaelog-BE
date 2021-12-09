const postRouter = require("express").Router();

const { authenticateUser, upload } = require("../../middlewares/middleware");

const {
  httpGetPosts,
  httpAddPost,
  httpEditPost,
  httpDeletePost,
  httpGetComments,
  httpAddComment,
  httpEditComment,
  httpDeleteComment,
} = require("./post.controller");

// POST CRUD
postRouter.get("/", httpGetPosts);
postRouter.post("/", authenticateUser(), httpAddPost);
postRouter.put("/:postId", authenticateUser(), httpEditPost);
postRouter.delete("/:postId", authenticateUser(), httpDeletePost);

// COMMENT
postRouter.get("/:postId/comments", httpGetComments);
postRouter.post("/:postId/comments", authenticateUser(), httpAddComment);
postRouter.put(
  "/:postId/comments/:commentId",
  authenticateUser(),
  httpEditComment
);
postRouter.delete(
  "/:postId/comments/:commentId",
  authenticateUser(),
  httpDeleteComment
);

// 사진 업로드
// postRouter.post(
//   "/upload",
//   authenticateUser(),
//   upload.single("img"),
//   (req, res) => {
//     console.log("S3 저장 정보", req.file);

//     res.json({ imgUrl: req.file.location });
//   }
// );

module.exports = postRouter;
