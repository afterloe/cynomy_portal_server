/**
  * afterloe - cynomy_portal_server/services/noticeService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-9 15:34:54
  */
"use strict";

const {resolve} = require("path");

const [
  {get, set, del},
] = [
  require(resolve(__dirname, "redisService")),
];

const [KEY, TIMEOUT] = [Symbol("KEY"), Symbol("TIMEOUT")];
module[KEY] = "cynomy_portal_server:systemNotice";

module[TIMEOUT] = 60 * 60; // 体统通知持续1小时

function* postSystemNotice(content, timeout = module[TIMEOUT]) {
  return yield set(module[KEY], {content}, timeout);
}

function* getSystemNotice() {
  const value = yield get(module[KEY]);
  return value;
}

function* cleanNotice() {
  return yield del(module[KEY]);
}

module.exports = {
  cleanNotice,
  getSystemNotice,
  postSystemNotice,
};
