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
  decryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });

// 注册接口
router.post(
  "/register",
  userValidator,
  verifyUser,
  decryptPassword,
  cryptPassword,
  register
);

// 登录接口
router.post("/login", decryptPassword, userValidator, verifyLogin, login);

// 修改密码
router.patch("/", auth, decryptPassword, cryptPassword, changePassword);

router.get("/", (ctx, next) => {
  ctx.body = "test";
});

module.exports = router;
