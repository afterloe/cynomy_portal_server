/**
  * afterloe - cynomy_portal_server/routers/notice.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-9 22:06:07
  */
"use strict";

const {resolve} = require("path");

const services = resolve(__dirname, "..", "services");
const [
  {readySystemNotice, getSystemNotice},
  {throwLackParameters},
] = [
  require(resolve(services, "noticeService")),
  require(resolve(__dirname, "..", "errors")),
];

function* info(next) {
  if (this.error) {
    return yield next;
  }
  try {
    // const {id} = this.params;
    // const notice = yield readySystemNotice(id);
    // this.data = notice;
    this.pageName = "noticeInfo";
  } catch (error) {
    this.error = error;
  }
  return yield next;
}

function* list(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {number, page} = this.params;
    const list = yield getSystemNotice(number, page);
    this.data = list;
    this.pageName = "noticeList";
  } catch (error) {
    this.error = error;
  }
  return yield next;
}

module.exports = {
  list,
  info,
};
