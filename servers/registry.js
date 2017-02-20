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
const [registration, session, smartNotFound, template] = [require(resolve(__dirname, "..", "routers")), require(resolve(interceptors, "session")),
  require(resolve(interceptors, "smartNotFound")), require(resolve(interceptors, "template"))];

const app = koa();

app.use(bodyParser());
app.use(session);
app.use(template);

app.name = "portal";

registration(router);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(smartNotFound);

app.on("error", (err, ctx) => {
  process.emit("systemError", err, ctx);
  console.log(err);
  console.log(ctx);
});

module.exports = app;
