/**
  * afterloe - cynomy_portal_server/interceptors/jsonSmart.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-15 22:20:55
  */
"use strict";

module.exports = function* (next) {
  this.set("Content-Type", "application/json");
  this.set("Handler-Process", process.pid);

  return yield next;
};
