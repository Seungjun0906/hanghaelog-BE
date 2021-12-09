const { Post, Comment, sequelize } = require("../../models/models");

async function httpGetPosts(req, res) {
  try {
    // 모든 포스트 (닉네임 포함)
    // const posts = await Post.findAll({
    //   attributes: {
    //     include: [
    //       sequelize.literal(
    //         `(SELECT *, (select count(*) from comments as c where posts.id = c.postId) as numOfComments FROM post)`,
    //         "numOfComments"
    //       ),
    //     ],
    //   },
    //   include: { model: User, attributes: ["nickname"] },
    // });
    const [posts] = await sequelize.query(
      "SELECT *, (select count(*) from comments where posts.id = comments.postId ) AS numOfComments FROM posts"
    );

    console.log(posts);

    // 댓글 갯수 보내기 공부

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
}

async function httpAddPost(req, res) {
  const { content, imgUrl } = req.body;
  // passport middleware로 인해 req.user라는 객체가 생김
  // user.id
  const { id, nickname } = req.user;
  try {
    const post = await Post.create({
      imgUrl,
      content,
      userId: id,
      nickname: nickname,
    });

    res.status(201).json({
      code: 201,
      msg: "작성완료",
      post: post,
    });
  } catch (err) {
    console.log(err);
  }
}

async function httpEditPost(req, res) {
  const { postId } = req.params;
  const { content, imgUrl } = req.body;
  const { id } = req.user;
  try {
    const prevPost = await Post.findOne({ where: { id: postId, userId: id } });

    // 같은 postId를 가진 포스트가 없다면
    if (!prevPost) {
      return res.status(400).send();
    }

    // 있다면 업데이트
    const updatedPost = await Post.update(
      {
        content: content,
        imgUrl: imgUrl,
        userId: id,
      },
      {
        where: {
          id: postId,
          userId: id,
        },
      }
    );

    return res.status(204).send();
  } catch (err) {
    console.log(err);
  }
}

async function httpDeletePost(req, res) {
  const { postId } = req.params;
  const { id } = req.user;

  const existingPost = await Post.findOne({
    where: { id: postId, userId: id },
  });

  if (!existingPost) return res.status(400).send();

  await Post.destroy({
    where: {
      id: postId,
      userId: id,
    },
  });

  res.status(204).send();
}

// 댓글 CRUD
async function httpGetComments(req, res) {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: {
        postId: postId,
      },
    });

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
  }
}

async function httpAddComment(req, res) {
  const { comment } = req.body;
  const { postId } = req.params;
  const { id, nickname } = req.user;

  try {
    if (comment === null) return res.status(400).send();

    const newComment = await Comment.create({
      comment: comment,
      nickname: nickname,
      postId: postId,
      userId: id,
    });

    res.status(201).json({ code: 201, msg: "작성완료", comment: newComment });
  } catch (err) {
    console.log(err);
  }
}

async function httpEditComment(req, res) {
  const { comment } = req.body;
  const { postId, commentId } = req.params;
  const { id } = req.user;
  try {
    const existingComment = await Comment.findOne({
      where: { id: commentId, userId: id, postId: postId },
    });

    if (!existingComment) return res.status(400).send();

    await Comment.update(
      {
        comment: comment,
      },
      {
        where: {
          id: commentId,
          userId: id,
          postId: postId,
        },
      }
    );

    res.status(204).json({
      ok: true,
      msg: "수정완료!",
    });
  } catch (err) {
    console.log(err);
  }
}

async function httpDeleteComment(req, res) {
  const { postId, commentId } = req.params;
  const { id } = req.user;
  try {
    const existingComment = await Comment.findOne({
      where: { id: commentId, postId: postId, userId: id },
    });

    if (!existingComment) return res.status(400).send();

    await Comment.destroy({
      where: { id: commentId, postId: postId, userId: id },
    });

    res.status(204).send();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  httpGetPosts,
  httpAddPost,
  httpEditPost,
  httpDeletePost,
  httpGetComments,
  httpAddComment,
  httpEditComment,
  httpDeleteComment,
};
