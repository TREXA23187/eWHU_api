const { Op } = require("sequelize");
const News = require("../model/news.model");

class NewsService {
  async createNews(news) {
    const res = await News.create(news);
    return res.dataValues;
  }

  async getNewsInfo({
    id,
    publisher,
    createdAtStart,
    createdAtEnd,
    publish_depart,
    is_published,
    is_top,
  }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    publisher &&
      Object.assign(whereOpt, { publisher: { [Op.like]: `%${publisher}%` } });
    publish_depart &&
      Object.assign(whereOpt, {
        publish_depart: { [Op.like]: `%${publish_depart}%` },
      });
    is_published && Object.assign(whereOpt, { is_published });
    is_top && Object.assign(whereOpt, { is_top });
    createdAtStart &&
      Object.assign(whereOpt, {
        createdAt: {
          [Op.gt]: createdAtStart,
          [Op.lt]: createdAtEnd,
        },
      });

    const res = await News.findAll({
      attributes: [
        "id",
        "publisher",
        "title",
        "desc",
        "is_published",
        "is_top",
        "publish_depart",
        "web_url",
        "background_picture",
        "remark",
        "createdAt",
        "updatedAt",
      ],
      where: whereOpt,
    });

    return res ? res.map((item) => item.dataValues) : null;
  }

  async deleteById(id) {
    try {
      const res = await News.destroy({
        where: { id },
      });
      return Boolean(res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new NewsService();
