module.exports = {
  apps: [
    {
      // 生产环境
      name: "prod",
      // 项目启动入口文件
      script: "./main.js",
      // 项目环境变量
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
