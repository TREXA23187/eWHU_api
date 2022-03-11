const Koa = require("koa");

const { APP_PORT } = require("./config/config.default");

const app = require("./app");

app.listen(3001, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
