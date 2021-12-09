const {
  User,
  Sequelize: { Op },
} = require("../../models/models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const SECRETKEY = process.env.SECRET_KEY;

async function httpGetUser(req, res) {
  const { id, nickname } = req.user;
  res.status(200).json({ id: id, nickname: nickname });
}

async function httpLogin(req, res) {
  try {
    passport.authenticate("local", (error, user, info) => {
      // 유저의 존재여부 확인
      if (error || !user) {
        return res.status(400).json({
          msg: info.msg,
        });
      }

      // 유저가 있는 경우
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          return res.send(loginError);
        }
        // 로그인 성공인 경우 ,JWT토큰 생성 반환
        const token = jwt.sign(
          {
            id: user.id,
            nickname: user.nickname,
          },
          SECRETKEY
        );

        return res.json({
          token,
          user: { id: user.id, nickname: user.nickname },
        });
      });
    })(req, res);
  } catch (err) {
    console.log(err);
  }

  // return res.status(200).json({ ok: true, msg: "" });
}

// 닉네임 아니면 이메일

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
  httpGetUser,
  httpLogin,
  httpAddUser,
};
