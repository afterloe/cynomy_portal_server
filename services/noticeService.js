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
  {get, set},
  {throwNosuchThisNotice},
] = [
  require(resolve(__dirname, "redisService")),
  require(resolve(__dirname, "..", "errors")),
];

function* postSystemNotice(content) {
  return yield set(content);
}

function* getSystemNotice(number, page) {
  return yield get("cynomy_portal_server:systemNotice");
}

module.exports = {
  getSystemNotice,
  postSystemNotice,
};
