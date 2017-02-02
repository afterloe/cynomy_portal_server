/**
  * afterloe - cynomy_portal_server/routers/user.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-2 16:14:33
  */
"use strict";

const {resolve} = require("path");
const userService = require(resolve(__dirname, "..", "services", "userService"));

const list = function* (next) {
  const {number, page} = this.params;
  const userList = yield userService.getUserList(number, page);
  if ("json" === this.way) {
    this.set("Content-Type", "application/json");
    this.body = this.success(userList);
  }
  return yield next;
};

module.exports = {
  list,
};
