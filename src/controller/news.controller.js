const {
  createNews,
  getNewsInfo,
  deleteById,
} = require("../service/news.service");

class NewsController {
  async addNews(ctx, next) {
    const {
      publisher,
      title,
      desc,
      is_published,
      is_top,
      publish_depart,
      web_url,
      background_picture,
      remark,
    } = ctx.request.body;
    try {
      const res = await createNews({
        publisher,
        title,
        desc,
        is_published,
        is_top,
        publish_depart,
        web_url,
        background_picture: JSON.stringify(background_picture),
        remark,
      });
      ctx.body = {
        code: 0,
        message: "创建资讯成功",
        data: {
          name: res.title,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getNewsList(ctx, next) {
    const res = await getNewsInfo(ctx.request.query);

    ctx.body = {
      code: 0,
      message: "获取资讯列表",
      data: res.map((item) => ({
        ...item,
        background_picture: JSON.parse(item.background_picture),
      })),
    };
  }

  async deleteNews(ctx, next) {
    const { id } = ctx.request.body;
    const res = await deleteById(id);

    ctx.body = {
      code: 0,
      message: "删除资讯成功",
      data: res,
    };
  }
}

module.exports = new NewsController();
