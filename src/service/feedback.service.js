const { Op } = require("sequelize");
const Feedback = require("../model/feedback.model");

class FeedbackService {
  async createFeedback(feedback) {
    const res = await Feedback.create(feedback);
    return res.dataValues;
  }

  async getFeedbackInfo({
    id,
    username,
    school_id,
    address,
    type,
    createdAt,
    createdAtStart,
    createdAtEnd,
  }) {
    // const whereOpt = {
    //   [Op.or]: [],
    // };
    const whereOpt = {};
    const filter = [];
    id && Object.assign(whereOpt, { id });
    // filter.push({id})
    username &&
      Object.assign(whereOpt, { username: { [Op.like]: `%${username}%` } });
    address && Object.assign(whereOpt, { address });
    school_id && Object.assign(whereOpt, { school_id });
    type && Object.assign(whereOpt, { type });
    createdAtStart &&
      Object.assign(whereOpt, {
        createdAt: {
          [Op.gt]: createdAtStart,
          [Op.lt]: createdAtEnd,
        },
      });

    const res = await Feedback.findAll({
      attributes: [
        "id",
        "username",
        "school_id",
        "address",
        "type",
        "status",
        "info_detail",
        "info_picture",
        "remark",
        "createdAt",
      ],
      where: whereOpt,
    });
    return res ? res.map((item) => item.dataValues) : null;
  }

  async updateById({ id, status }) {
    try {
      const whereOpt = { id };
      const newStatus = {};
      console.log(id, status);
      status && Object.assign(newStatus, { status });

      const res = await Feedback.update(newStatus, { where: whereOpt });

      return res[0] > 0 ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FeedbackService();
