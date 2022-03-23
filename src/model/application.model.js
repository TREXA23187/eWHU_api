const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Application = seq.define("ewhu_application", {
  name_zh: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "应用名, 唯一",
  },
  name_en: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "应用名英文",
  },
  desc_zh: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "应用描述",
  },
  desc_en: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "应用描述英文",
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "应用分组",
  },
  icon: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: "图标",
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "备注",
  },
});

// Application.sync({ force: true });

module.exports = Application;
