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
const [{throwLackParameters}, {obmitLoginPermit, getUserList, loginSystem}] = [require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "services", "userService"))];

function* list(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {number, page} = this.params;
    const userList = yield getUserList(number, page);
    if ("json" === this.way) {
      this.set("Content-Type", "application/json; charset=utf-8");
      this.body = this.success(userList);
    }
  }catch(err) {
    this.error = err;
  }

  return yield next;
}

function* permit(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {mail} = this.params;
    yield obmitLoginPermit(mail);
    if ("json" === this.way) {
      this.set("Content-Type", "application/json; charset=utf-8");
      this.body = this.success();
    }
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* login(next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {mail, permit} = this.request.body;
    if (!mail || !permit) {
      throwLackParameters();
    }
    const sessionId = yield loginSystem(mail, permit);
    if ("json" === this.way) {
      this.set("Content-Type", "application/json; charset=utf-8");
      this.body = this.success(sessionId);
    }
    this.forceSign(sessionId);
  } catch (err) {
    this.error = err;
    console.log(err);
  }

  return yield next;
}

module.exports = {
  list,
  permit,
  login,
};
