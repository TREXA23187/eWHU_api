const {
  createAppGroup,
  getAppGroupInfo,
} = require("../service/app-group.service");
const {
  createApplication,
  getApplicationInfo,
  deleteById,
} = require("../service/application.service");

class AppController {
  async addAppGroup(ctx, next) {
    //   console.log(ctx.request)
    const { name_zh, name_en } = ctx.request.body;
    try {
      const res = await createAppGroup({ name_zh, name_en });
      ctx.body = {
        code: 0,
        message: "创建分组成功",
        data: {
          name: res.name_zh,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getAppGroup(ctx, next) {
    const res = await getAppGroupInfo(ctx.request.query);

    ctx.body = {
      code: 0,
      message: "获取应用分组",
      data: res,
    };
  }

  async addApplication(ctx, next) {
    //   console.log(ctx.request)
    const { name_zh, name_en, desc_zh, desc_en, group_id, icon, remark } =
      ctx.request.body;
    try {
      const res = await createApplication({
        name_zh,
        name_en,
        desc_zh,
        desc_en,
        group_id,
        icon: JSON.stringify(icon),
        remark,
      });
      ctx.body = {
        code: 0,
        message: "创建应用成功",
        data: {
          name: res.name_zh,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getApplication(ctx, next) {
    try {
      const res = await getApplicationInfo(ctx.request.query);
      //   console.log(res);
      ctx.body = {
        code: 0,
        message: "获取反馈列表",
        data: res.map((item) => ({ ...item, icon: JSON.parse(item.icon) })),
      };
    } catch (error) {
      console.error(error);
    }
  }

  async deleteApplication(ctx, next) {
    const { id } = ctx.request.body;
    const res = await deleteById(id);

    ctx.body = {
      code: 0,
      message: "删除应用成功",
      data: res,
    };
  }
}

module.exports = new AppController();
