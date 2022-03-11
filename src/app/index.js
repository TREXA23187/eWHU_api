const Koa = require("koa");
const KoaBody = require("koa-body");
const router = require("../router");

const errHandler = require("./errHandler");

const app = new Koa();

app.use(KoaBody());

app.use(router.routes()).use(router.allowedMethods());

app.on("error", errHandler);

module.exports = app;
