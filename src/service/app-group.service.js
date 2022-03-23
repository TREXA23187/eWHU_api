const { Op } = require("sequelize");
const AppGroup = require("../model/app-group.model");

class AppGroupService {
  async createAppGroup(group) {
    const res = await AppGroup.create(group);
    return res.dataValues;
  }

  async getAppGroupInfo({ id, name_zh, name_en }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    name_zh &&
      Object.assign(whereOpt, { name_zh: { [Op.like]: `%${name_zh}%` } });
    name_en &&
      Object.assign(whereOpt, { name_en: { [Op.like]: `%${name_en}%` } });

    const res = await AppGroup.findAll({
      attributes: ["id", "name_zh", "name_en"],
      where: whereOpt,
    });
    return res ? res.map((item) => item.dataValues) : null;
  }
}

module.exports = new AppGroupService();
