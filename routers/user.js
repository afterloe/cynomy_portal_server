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
const {obmitLoginPermit, getUserList} = require(resolve(__dirname, "..", "services", "userService"));

function* list(next) {
  if (next.error) {
    return yield next;
  }
  const {number, page} = this.params;
  const userList = yield getUserList(number, page);
  if ("json" === this.way) {
    this.set("Content-Type", "application/json");
    this.body = this.success(userList);
  }
  return yield next;
}

function* permit(next) {
  if (next.error) {
    return yield next;
  }
  const {mail} = this.params;
  yield obmitLoginPermit(mail);
  if ("json" === this.way) {
    this.set("Content-Type", "application/json");
    this.body = this.success();
  }
}

module.exports = {
  list,
  permit,
};
