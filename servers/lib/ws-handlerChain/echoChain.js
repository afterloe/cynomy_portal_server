/**
  * afterloe - cynomy_portal_server/servers/lib/ws-handlerChain/echoChain.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-12 14:54:34
  */
"use strict";

const {resolve} = require("path");
const Chain = require(resolve(__dirname, "..", "..", "..", "tools", "chain"));

module.exports = function(protocol, request, origin) {
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
    return Chain.next();
  }
};
