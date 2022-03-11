const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  invalidPassword,
  userLoginError,
} = require("../const/err.type");
const { decrypt } = require("../utils/crypt");

const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 合法性
  if (!username || !password) {
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }

  await next();
};

const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body;

  try {
    const res = await getUserInfo({ username });
    if (res) {
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    console.log(error);
    ctx.app.emit("error", userRegisterError, ctx);
  }
  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
};

const decryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  ctx.request.body.password = decrypt(password);

  await next();
};

const verifyLogin = async (ctx, next) => {
  // 1. 判断用户是否存在(不存在:报错)
  const { username, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ username });

    if (!res) {
      console.error("用户名不存在", { username });
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }

    // 2. 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password.trim())) {
      console.log(password);
      console.log(res.password);
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit("error", userLoginError, ctx);
  }

  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  decryptPassword,
  verifyLogin,
};
