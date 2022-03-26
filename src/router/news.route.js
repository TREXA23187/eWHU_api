const Router = require("koa-router");
const {
  addNews,
  getNewsList,
  deleteNews,
} = require("../controller/news.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/news" });

// 添加资讯
router.post("/", auth, addNews);

// 获取资讯列表
router.get("/", auth, getNewsList);

// 删除资讯
router.post("/delete", auth, deleteNews);

module.exports = router;
