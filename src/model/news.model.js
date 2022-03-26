const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const News = seq.define("ewhu_news", {
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "发布用户",
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "标题",
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "描述",
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: "是否发布",
  },
  is_top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: "是否置顶",
  },
  publish_depart: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "university",
    comment: "发布院系",
  },
  web_url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "网页链接",
  },
  background_picture: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: "背景图片",
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "备注",
  },
});

News.sync({ force: true });

module.exports = News;
