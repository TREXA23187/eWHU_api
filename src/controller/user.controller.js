const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const { userRegisterError } = require("../const/err.type");

const { JWT_SECRET } = require("../config/config.default");

class UserController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;

    try {
      const res = await createUser(username, password);

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
}

module.exports = new UserController();
