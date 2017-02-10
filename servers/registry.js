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

const [{resolve}, koa, bodyParser, router] = [require("path"), require("koa"), require("koa-bodyparser"), require("koa-router")()];
const interceptors = resolve(__dirname, "..", "interceptors");
const [registration, session, smartNotFound] = [require(resolve(__dirname, "..", "routers")), require(resolve(interceptors, "session")), require(resolve(interceptors, "smartNotFound"))];
const {setPugTemplatePath} = require(resolve(__dirname, "..", "tools", "buildPage"));

const app = koa();

app.use(bodyParser());
app.use(session);

app.name = "portal";

registration(router);

app.use(function* (next) {
  setPugTemplatePath(resolve(__dirname, "..", "template"));
  const {accept = "web"} = this.request.header;
  if ("application/json" === accept) {
   this.way = "json";
  } else {
   this.way = "web";
  }

  return yield next;
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(smartNotFound);

app.on("error", (err, ctx) => {
  process.emit("catch-error", err, ctx);
  console.log(err);
  console.log(ctx);
});

module.exports = app;
