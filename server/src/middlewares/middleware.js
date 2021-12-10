const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");

// exports.isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).json({
//       ok: false,
//       msg: "로그인이 필요합니다",
//     });
//   }
// };

// exports.isNotLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect("/");
//   }
// };

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "hanghaelog",
    key(req, file, cb) {
      console.log("filedata", file);
      cb(
        null,
        `hanghaelog/images/${Date.now()}${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const passport = require("passport");
const authenticateUser = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = {
  authenticateUser,
  upload,
};
