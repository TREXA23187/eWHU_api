const Router = require("koa-router");
const {
  register,
  login,
  changePassword,
} = require("../controller/user.controller");
const { auth } = require("../middleware/auth.middleware");
const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });

// 注册接口
router.post("/register", userValidator, verifyUser, cryptPassword, register);

// 登录接口
router.post("/login", userValidator, verifyLogin, login);

// 修改密码
router.patch("/", auth, cryptPassword, changePassword);

module.exports = router;
