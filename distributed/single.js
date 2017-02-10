/**
  * afterloe - cynomy_portal_server/distributed/single.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-10 10:19:27
  */
"use strict";

const [{createServer}, {resolve}] = [require("http"), require("path")];
const {get} = require(resolve(__dirname, "..", "config"));
const servers = resolve(__dirname, "..", "servers");
const [registry, ws] = [require(resolve(servers, "registry")), require(resolve(servers, "websocket"))];
const [bindHost, registryPort] = [get("bindHost"), get("registryPort")];

const server = createServer(registry.callback());
ws(server);

process.on("catch-error", (err, ctx) => {
  console.log("%s process catch err! %s", new Date(), err);
  console.dir(ctx);
});

process.on("uncaughtException", err => {
  process.send({act: "suicide"});
  console.log(err);
  process.nextTick(() => process.exit(1));
});

server.listen(registryPort, bindHost, () => {
  console.log("TCP net socket is runnig in %s:%s", bindHost, registryPort)
});
