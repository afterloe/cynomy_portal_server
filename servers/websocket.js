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

module.exports = httpServer => {

  const wsServer = new server({
      httpServer: httpServer,
      autoAcceptConnections: false
  });

  const originIsAllowed = origin => {
    // put logic here to detect whether the specified origin is allowed.
    console.log(origin);
    return true;
  };

  wsServer.on("request", request => {
      if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + " Connection from origin " + request.origin + " rejected.");
        return;
      }

      const connection = request.accept("echo-protocol", request.origin);
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
  });
};
