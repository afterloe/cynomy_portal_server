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

const [{resolve}, koa, bodyParser, router, Pug] = [require("path"), require("koa"), require("koa-bodyparser"), require("koa-router")(), require("koa-pug")];
const [registration, session] = [require(resolve(__dirname, "..", "routers")), require(resolve(__dirname, "..", "interceptors", "session"))];
const {setPugTemplatePath} = require(resolve(__dirname, "..", "tools", "buildPage"));

const app = koa();
new Pug({
  viewPath: "./template",
  debug: false,
  noCache: true,
  pretty: false,
  compileDebug: false,
  basedir: "./template",
  app,
});

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

  this.success = (ctx) => ({
    code: 200,
    error: null,
    result: ctx
  });

  this.fail = (msg, code) => ({
    code: code || 500,
    error: msg || "System error",
    result: null
  });

  return yield next;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.on("error", (err, ctx) => {
  process.emit("catch-error", err, ctx);
  console.log(err);
  console.log(ctx);
});

module.exports = app;
