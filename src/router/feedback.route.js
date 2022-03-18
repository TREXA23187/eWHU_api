const Router = require("koa-router");
const {
  sendFeedback,
  getFeedbackList,
  changeStatus,
} = require("../controller/feedback.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/feedback" });

// 发送反馈
router.post("/", sendFeedback);

router.post("/img", (ctx, next) => {
  ctx.body = {
    code: 0,
    message: "图片上传成功",
    data: "",
  };
});

router.get("/list", auth, getFeedbackList);

router.post("/patch/status", auth, changeStatus);

module.exports = router;
