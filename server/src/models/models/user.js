const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "user",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
  }
};
