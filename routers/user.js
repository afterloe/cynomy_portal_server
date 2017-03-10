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
const [
  {throwLackParameters},
  {forgetPassword, getUserList, loginSystem}
] = [
  require(resolve(__dirname, "..", "errors")),
  require(resolve(__dirname, "..", "services", "userService"))
];

function* list(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {number, page} = this.params;
    this.data = yield getUserList(number, page);
  }catch(err) {
    this.error = err;
  }

  return yield next;
}

function* forgetPwd(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {mail} = this.params;
    yield forgetPassword(mail);
    this.data = true;
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
    this.data = sessionId;
    this.forceSign(sessionId);
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

module.exports = {
  list,
  forgetPwd,
  login,
};
