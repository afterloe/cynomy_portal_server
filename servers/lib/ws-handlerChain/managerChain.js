/**
  * afterloe - cynomy_portal_server/servers/lib/ws-handlerChain/managerChain.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-12 14:54:54
  */
"use strict";

const [co, {resolve}, {writeFileSync}] = [require("co"), require("path"), require("fs")];
const Chain = require(resolve(__dirname, "..", "..", "..", "tools", "chain"));
const [{uuidCode}, {get}] = [require(resolve(__dirname, "..", "..", "..", "tools", "utilities")), require(resolve(__dirname, "..", "..", "..", "config"))];
const {getService} = require(resolve(__dirname, "..", "servicesCenter"));

const receiveType = new Map();
receiveType.set(1001, "userList-xlsx");
receiveType.set(2001, "goodsList-tar.gz");

function handlerMsg4Str(message, connection) {
  if ("utf8" === message.type) {
    const [ldap, service, fun] = message.utf8Data.split("->");
    console.log("%s: %s %s", ldap, service, fun);
    const [_, __] = fun.split(/(?:\()(.*)(?:\))/i);
    const _service = getService(service);
    if (_service) {
      co(function* () {
        if (_service[_]) {
          const args = __? __.split("|"): null;
          if (args) {
            args.map((p,i) => args[i] = JSON.parse(p));
          }
          return yield _service[_].apply(null, args);
        }
      }).then(data => {
        connection.sendUTF(JSON.stringify({
          info: `${Date().toLocaleString()}: [SUCCESS] Receive msg`,
          type: _,
          _: data,
        }));
      }).catch(err => {
        // TODO
        console.log(err);
        connection.sendUTF(JSON.stringify({
          info: `${Date().toLocaleString()}: [FAILED] ${err}`,
        }));
      });
    } else {
      connection.sendUTF(JSON.stringify({
        info: `${Date().toLocaleString()}: [FAILED] exec func failed can't find this funcation`,
      }));
    }
  } else {
    return Chain.next();
  }
}

function handlerMsg4Binary(message, connection) {
  if ("binary" === message.type) {
    const wsBuff = message.binaryData;
    const length = wsBuff.length;
    const flag = wsBuff.readUInt32BE(length - 8);
    if (!receiveType.has(flag)) {
      connection.sendUTF(JSON.stringify({
        info: `${Date().toLocaleString()}: [FAILED] upload file is FAILED, can't find this permit`,
      }));
      return ;
    }

    const file = uuidCode();
    const path = resolve(get("tmpDir"), file);

    const fileBuffer = wsBuff.slice(0, length - 8);
    writeFileSync(path, fileBuffer);

    console.log("received file %s bytes, save in %s", length, path);
    connection.sendUTF(JSON.stringify({
      info: `${Date().toLocaleString()}: [SUCCESS] receive file -- ${file}`,
      type: receiveType.get(flag),
      _: file,
    }));
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
