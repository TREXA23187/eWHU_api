const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Feedback = seq.define("ewhu_feedback", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户名",
  },
  school_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "学号/工号",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "反馈地址",
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "反馈类型",
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "反馈状态",
  },
  info_detail: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "详细信息",
  },
  info_picture: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
    comment: "反馈图片",
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "备注",
  },
});

Feedback.sync({ force: true });

module.exports = Feedback;
