const Router = require("koa-router");
const {
  addAppGroup,
  getAppGroup,
  addApplication,
  getApplication,
  deleteApplication,
} = require("../controller/app.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/app" });

// 添加应用分组
router.post("/group", addAppGroup);

// 获取应用分组
router.get("/group", getAppGroup);

// 添加应用
router.post("/application", addApplication);

// 获取应用信息
router.get("/application", getApplication);

// 删除应用
router.post("/delete/application", deleteApplication);

module.exports = router;
