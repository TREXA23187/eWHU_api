const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updateById,
  deleteById,
} = require("../service/user.service");
const { userRegisterError } = require("../const/err.type");

const { JWT_SECRET } = require("../config/config.default");

class UserController {
  async register(ctx, next) {
    const { username, password, school_id, role, phone_number, email, remark } =
      ctx.request.body;

    try {
      const res = await createUser({
        username,
        password,
        school_id,
        phone_number,
        role,
        email,
        remark,
      });

      ctx.body = {
        code: 0,
        message: "用户注册成功",
        data: {
          username: res.username,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    const { username } = ctx.request.body;

    try {
      const { password, ...res } = await getUserInfo({ username });
      ctx.cookies.set("token", jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }));
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        data: {
          user_info: res,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async changePassword(ctx, next) {
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;

    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        data: "",
      };
    }

    await next();
  }

  async getUserList(ctx, next) {
    const users = await getUserInfo({});

    const res = users.map((item) => {
      const { password, ...rest } = item.dataValues;
      return rest;
    });
    ctx.body = {
      code: 0,
      message: "获取用户列表",
      data: res,
    };
  }

  async changeInfo(ctx, next) {
    const { id } = ctx.request.body;
    if (await updateById(ctx.request.body)) {
      ctx.body = {
        code: 0,
        message: "修改信息成功",
        data: "",
      };
    }
  }

  async deleteUser(ctx, next) {
    const { id } = ctx.request.body;
    const res = await deleteById(id);

    ctx.body = {
      code: 0,
      message: "删除用户成功",
      data: res,
    };
  }
}

module.exports = new UserController();
