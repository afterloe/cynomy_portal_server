/**
  * afterloe - cynomy_portal_server/errors/truError.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 21:54:22
  */
"use strict";

module.exports = class extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
};
