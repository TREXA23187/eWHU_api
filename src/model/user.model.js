const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const User = seq.define("ewhu_user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名, 唯一",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "0: 普通用户, 1: 管理员, 2: 超级管理员",
  },
  school_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "学号/工号",
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    comment: "手机号",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    comment: "邮箱",
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "备注",
  },
});

// User.sync({ force: true });

module.exports = User;
