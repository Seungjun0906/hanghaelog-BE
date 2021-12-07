const { Post, User } = require("../../models/models");
async function httpGetPosts(req, res) {
  try {
    // 모든 포스트 (닉네임 포함)
    const posts = Post.findAll({
      include: { model: User, attributes: ["nickname"] },
    });

    // 댓글 갯수 보내기 공부

    res.status(200).json(posts);
  } catch (err) {}
}

async function httpAddPost(req, res) {
  const { content, imgUrl } = req.body;
  try {
    // post 모델에 userId를 넣어야 하는데 어떻게 userId를 가져올까???? 옵션:passport, jwt

    // userId 가져옴
    await Post.create({
      imgUrl,
      content,
      userId: userId,
    });

    res.status(201).json({
      ok: true,
      msg: "작성완료",
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  httpGetPosts,
  httpAddPost,
};
