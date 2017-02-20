/**
  * afterloe - cynomy_portal_server/routers/goodses.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-2 16:14:52
  */
"use strict";

const {resolve} = require("path");
const goodsService = require(resolve(__dirname, "..", "services", "goodsService"));

const list = function* (next) {
  const {number, page} = this.params;
  this.data = yield goodsService.getGoodsList(number, page);
  return yield next;
};

module.exports = {
  list,
};
