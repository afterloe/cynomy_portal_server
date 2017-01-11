/**
  * afterloe - cynomy_portal_server/servers/registry.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 14:20:31
  */
"use strict";

const [{resolve}, koa, router] = [require("path"), require("koa"), require("koa-router")()];
const registration = require(resolve(__dirname, "..", "routers"));

const app = koa();

app.use(function* (next) {
  const start = new Date();
  this.requestIp = this.request.ip;
  yield next;
  console.log("[%s][%s] %s %s - %s ms", new Date().toLocaleString(), this.requestIp, this.method, this.url, new Date() - start);
});

app.name = "portal";

registration(router);

app.use(router.routes()).use(router.allowedMethods());

app.use(function* (next) {
  this.set("Content-Type", "application/json");
  this.set("Handler-Process", process.pid);
  return yield next;
});

app.on("error", (err, ctx) => {
  process.emit("catch-error", err, ctx);
  console.log(err);
  console.log(ctx);
});

module.exports = app;
