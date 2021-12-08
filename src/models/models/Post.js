const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        imgUrl: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
  }
};
