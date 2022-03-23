const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const AppGroup = seq.define("ewhu_app_group", {
  name_zh: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "应用分组名, 唯一",
  },
  name_en: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "应用分组名英文",
  },
});

// AppGroup.sync({ force: true });

module.exports = AppGroup;
