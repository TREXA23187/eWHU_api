const Router = require("koa-router");
const {
  register,
  login,
  changePassword,
  getUserList,
  changeInfo,
  deleteUser,
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
  // decryptPassword,
  cryptPassword,
  register
);

// 登录接口
router.post("/login", userValidator, decryptPassword, verifyLogin, login);

// 修改密码
router.post(
  "/patch/password",
  auth,
  decryptPassword,
  cryptPassword,
  changePassword
);

// 修改信息
router.post("/patch/info", auth, changeInfo);

router.get("/", (ctx, next) => {
  ctx.body = "test";
});

router.get("/list", getUserList);

router.post("/delete", auth, deleteUser);

module.exports = router;
