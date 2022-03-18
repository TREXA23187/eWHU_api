const User = require("../model/user.model");

class UserService {
  async createUser(userInfo) {
    const res = await User.create(userInfo);
    return res.dataValues;
  }

  async getUserInfo({
    id,
    username,
    password,
    role,
    school_id,
    phone_number,
    email,
  }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });
    password && Object.assign(whereOpt, { password });
    role && Object.assign(whereOpt, { role });
    school_id && Object.assign(whereOpt, { school_id });
    phone_number && Object.assign(whereOpt, { phone_number });
    email && Object.assign(whereOpt, { email });

    let res;

    if (JSON.stringify(whereOpt) == "{}") {
      res = await User.findAll();
      return res || null;
    } else {
      res = await User.findOne({
        attributes: ["id", "username", "password", "role", "school_id"],
        where: whereOpt,
      });
      return res ? res.dataValues : null;
    }
  }

  async updateById({
    id,
    username,
    password,
    role,
    school_id,
    phone_number,
    email,
  }) {
    const whereOpt = { id };
    const newUser = {};

    username && Object.assign(newUser, { username });
    password && Object.assign(newUser, { password });
    role && Object.assign(newUser, { role });
    school_id && Object.assign(newUser, { school_id });
    phone_number && Object.assign(newUser, { phone_number });
    email && Object.assign(newUser, { email });

    const res = await User.update(newUser, { where: whereOpt });

    return res[0] > 0 ? true : false;
  }

  async deleteById(id) {
    const res = await User.destroy({
      where: { id },
    });

    return Boolean(res);
  }
}

module.exports = new UserService();
