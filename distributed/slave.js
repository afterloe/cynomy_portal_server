/**
  * afterloe - cynomy_portal_server/distributed/slave.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 14:16:06
  */
"use strict";

const [{createServer}, {resolve}] = [require("http"), require("path")];
const servers = resolve(__dirname, "..", "servers");
const [registry, ws] = [require(resolve(servers, "registry")), require(resolve(servers, "websocket"))];

const server = createServer(registry.callback());
ws(server);

let workerServer;

process.on("message", (msg, handler) => {
  if ("start-up" === msg) {
    workerServer = handler;
    workerServer.on("connection", socket => server.emit("connection", socket));
    console.log(`${new Date().toLocaleString()} : slave ${process.pid} is ready to running`);
  }
});

process.on("systemError", (err, ctx) => {
  console.log("%s process catch err! %s", new Date(), err);
  console.dir(ctx);
});

process.on("uncaughtException", err => {
  process.send({act: "suicide"});
  console.log(err);
  workerServer.close(() => {
    process.exit(1);
  });

  process.nextTick(() => process.exit(1));
});
