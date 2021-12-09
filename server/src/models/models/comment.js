const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: { type: Sequelize.STRING(100), allowNull: false },
        nickname: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
      },

      {
        sequelize,
        modelName: "comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};
