/**
  * afterloe - cynomy_portal_server/servers/websocket.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 15:37:24
  */
"use strict";

const [{server}, {resolve}] = [require("websocket"), require("path")];
const ws_handlerChain = require(resolve(__dirname, "lib", "ws-handlerChain"));
const [WSSERVER, ORIGIN] = [Symbol("WSSERVER"), Symbol("ORIGIN")];

module[ORIGIN] = new Map();

module[ORIGIN].set("file://", true); // 允许的协议

const originIsAllowed = origin => module[ORIGIN].get(origin);

const initWorkSocketServer = () => {
  module[WSSERVER].on("request", request => {
    const origin = request.origin;
    const protocol = request.requestedProtocols[0];
    if (!originIsAllowed(origin)) {
      request.reject();
      console.log("%s Connection from origin %s rejected.", new Date(), origin);
      return ;
    }
    ws_handlerChain(protocol, request, origin);
  });
};

module.registry = originInfo => {
  module[ORIGIN].set(originInfo, true);
};

module.exports = httpServer => {

  module[WSSERVER] = new server({
      httpServer,
      maxReceivedFrameSize: 1024 * 1024 * 400, // FUCK 最大文件大小限制！ 400MB
      autoAcceptConnections: false
  });

  initWorkSocketServer();
};
