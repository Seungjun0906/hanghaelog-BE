const {
  User,
  Sequelize: { Op },
} = require("../../models/models");

const bcrypt = require("bcrypt");

async function httpLogin(req, res) {
  const { email, password } = req.body;
  const user = User.findOne({ where: { email, password } });
  if (!user) {
    return res
      .status(400)
      .json({ ok: false, msg: "이메일/비밀번호가 일치하지 않습니다" });
  }

  return res.status(200).json({ ok: true, msg: "" });
}

async function httpAddUser(req, res) {
  const { email, nickname, password, passwordCheck } = req.body;
  try {
    // 비밀번호 비밀번호 확인 비교
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ ok: false, msg: "비밀번호를 확인해주세요" });
    }

    // 유저 중복여부
    const exUser = await User.findOne({
      where: { [Op.or]: [{ email }, { nickname }] },
    });

    if (exUser) {
      return res.status(400).json({
        ok: false,
        msg: "이미 가입된 사용자입니다",
      });
    }

    // 비밀번호 해쉬
    const hash = await bcrypt.hash(password, 15);

    // 유저 생성
    await User.create({
      email,
      nickname,
      password: hash,
    });

    return res.status(201).json({ ok: true, msg: "회원가입이 완료되었습니다" });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  httpLogin,
  httpAddUser,
};
