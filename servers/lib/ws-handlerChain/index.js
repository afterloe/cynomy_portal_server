/**
  * afterloe - cynomy_portal_server/servers/lib/ws-handlerChain/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-12 14:55:00
  */
"use strict";

const {resolve} = require("path");
const Chain = require(resolve(__dirname, "..", "tools", "chain"));

const [echo, manager] = [new Chain(require(resolve(__dirname, "echoChain"))),
  new Chain(require(resolve(__dirname, "managerChain")))];

manager.setNext(echo);

module.exports = (...args) => {
  manager.passRequest.apply(null, args);
};
