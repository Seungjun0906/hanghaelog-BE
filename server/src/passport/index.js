const SECRETKEY = process.env.SECRET_KEY;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const bcrypt = require("bcrypt");

const { User } = require("../models/models");

const passportconfig = { usernameField: "email", passwordField: "password" };

const passportVerify = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    // 이메일이 일치하는 유저가 없는 경우
    if (!user) {
      return done(null, false, { msg: "존재하지 않는 사용자 입니다." });
    }

    // 이메일이 일치하는 유저가 있는 경우, 결과 값은 Boolean
    const compareResult = await bcrypt.compare(password, user.password);

    // compareResult가 true일 경우
    if (compareResult) {
      return done(null, user);
    }

    // 비밀번호가 일치하지 않는 경우?
    done(null, false, { msg: "올바르지 않은 비밀번호 입니다." });
  } catch (error) {
    done(error);
  }
};

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRETKEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    // payload안에 id와 nickname 으로 유저 조회
    // payload = {id, nickname}
    const user = await User.findOne({
      where: { id: jwtPayload.id, nickname: jwtPayload.nickname },
    });
    // 일치하는 유저가 있는 경우
    if (user) {
      return done(null, user);
    }
    // 일치하는 유저가 없는 경우
    done(null, false, { msg: "올바르지 않은 인증정보 입니다." });
  } catch (err) {
    console.log(err);
    done(err);
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportconfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
