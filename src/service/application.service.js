const { Op } = require("sequelize");
const Application = require("../model/application.model");

class ApplicationService {
  async createApplication(app) {
    const res = await Application.create(app);
    return res.dataValues;
  }

  async getApplicationInfo({ id, name, group_id }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    name && Object.assign(whereOpt, { name_zh: { [Op.like]: `%${name}%` } });
    name && Object.assign(whereOpt, { name_en: { [Op.like]: `%${name}%` } });
    group_id && Object.assign(whereOpt, { group_id });

    const res = await Application.findAll({
      attributes: [
        "id",
        "name_zh",
        "name_en",
        "desc_zh",
        "desc_en",
        "group_id",
        "icon",
        "remark",
      ],
      where: whereOpt,
    });

    return res ? res.map((item) => item.dataValues) : null;
  }

  async deleteById(id) {
    const res = await Application.destroy({
      where: { id },
    });
    return Boolean(res);
  }
}

module.exports = new ApplicationService();
