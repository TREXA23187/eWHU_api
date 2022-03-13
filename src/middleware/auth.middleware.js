const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError, invalidToken } = require("../const/err.type");

const auth = async (ctx, next) => {
  const token = ctx.cookies.get("token");

  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    console.error(err);
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效的token", err);
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }

  await next();
};

const hadAdminPermission = async (ctx, next) => {
  const { role } = ctx.state.user;
};

module.exports = {
  auth,
};
