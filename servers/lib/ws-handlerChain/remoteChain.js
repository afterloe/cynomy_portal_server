/**
  * afterloe - cynomy_portal_server/servers/lib/ws-handlerChain/remoteChain.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-2-15 15:01:59
  */
"use strict";

const [{resolve}] = [require("path")];
const root = resolve(__dirname, "..", "..", "..");
const Chain = require(resolve(root, "tools", "chain"));

function handlerMsg4Str(message, connection) {
  if ("utf8" === message.type) {
    try {
      console.log("Received Message: " + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    } catch (err) {
      console.dir(err);
    }
  } else {
    return Chain.next();
  }
}

function handlerMsg4Binary(message, connection) {
  if ("binary" === message.type) {
    console.log("Received Binary Message of " + message.binaryData.length + " bytes");
    connection.sendBytes(message.binaryData);
  } else {
    return Chain.next();
  }
}

const [utf8, binary] = [new Chain(handlerMsg4Str), new Chain(handlerMsg4Binary)];
utf8.setNext(binary);

module.exports = function(protocol, request, origin) {
  if ("node-protocol" === protocol) {
    const connection = request.accept(protocol, origin);
    console.log("%s Welcome accept cynomy node manager!", new Date());
    connection.on("close", () => {
      console.log("client is hang-up.");
    });
    connection.on("message", message => utf8.passRequest(message, connection));
  } else {
    return Chain.next();
  }
};
