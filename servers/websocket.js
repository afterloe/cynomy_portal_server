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

const {server} = require("websocket");
const [WSSERVER, ORIGIN] = [Symbol("WSSERVER"), Symbol("ORIGIN")];

module[ORIGIN] = new Map();

module[ORIGIN].set("file://", true); // 允许的协议

const originIsAllowed = origin => module[ORIGIN].get(origin);

const ws4echo = (protocol, request, origin) => {
  if ("echo-protocol" === protocol) {
    const connection = request.accept(protocol, origin);
    console.log("%s Connection accepted.", new Date());
    connection.on("message", message => {
      if ("utf8" === message.type) {
        console.log("Received Message: " + message.utf8Data);
        connection.sendUTF(message.utf8Data);
      } else if ("binary" === message.type) {
        console.log("Received Binary Message of " + message.binaryData.length + " bytes");
        connection.sendBytes(message.binaryData);
      }
    });
    connection.on("close", (reasonCode, description) => {
      console.log("%s Peer %s disconnected. code is %s, description: %s", new Date(), connection.remoteAddress, reasonCode, description);
    });
  } else {
    return ;
  }
};

const ws4node = (protocol, request, origin) => {
  if ("node-protocol" === protocol) {
    const conn = request.accept(protocol, origin);
    console.log("%s Welcome accept cynomy node manager!", new Date());
    conn.on("message", message => {
      if ("utf8" === message.type) {
        console.log("node Received Message: " + message.utf8Data);
        conn.sendUTF(origin + " : " + message.utf8Data);
      }
    });
  } else {
    return ws4echo(protocol, request, origin);
  }
};

const initWorkSocketServer = () => {
  module[WSSERVER].on("request", request => {
    const origin = request.origin;
    const protocol = request.requestedProtocols[0];
    if (!originIsAllowed(origin)) {
      request.reject();
      console.log("%s Connection from origin %s rejected.", new Date(), origin);
      return ;
    }
    ws4node(protocol, request, origin);
  });
};

module.exports = httpServer => {

  module[WSSERVER] = new server({
      httpServer,
      autoAcceptConnections: false
  });

  initWorkSocketServer();
};
