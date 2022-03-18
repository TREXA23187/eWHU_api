const {
  createFeedback,
  getFeedbackInfo,
  updateById,
} = require("../service/feedback.service");

class FeedbackController {
  async sendFeedback(ctx, next) {
    //   console.log(ctx.request)
    const {
      username,
      school_id,
      address,
      type,
      info_picture,
      info_detail,
      remark,
    } = ctx.request.body;
    try {
      const res = await createFeedback({
        username,
        school_id,
        address,
        type,
        info_picture: info_picture.map((item) => JSON.stringify(item)),
        info_detail,
        remark,
      });
      ctx.body = {
        code: 0,
        message: "用户反馈成功",
        data: {
          username: res.username,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getFeedbackList(ctx, next) {
    try {
      const res = await getFeedbackInfo(ctx.request.query);

      ctx.body = {
        code: 0,
        message: "获取反馈列表",
        data: {
          feedback_list: res.map((item) => ({
            ...item,
            info_picture: item.info_picture.map((pic) => JSON.parse(pic)),
          })),
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async changeStatus(ctx, next) {
    const { id, status } = ctx.request.body;

    if (await updateById({ id, status })) {
      ctx.body = {
        code: 0,
        message: "修改状态成功",
        data: {
          id,
          status,
        },
      };
    }
  }
}

module.exports = new FeedbackController();
