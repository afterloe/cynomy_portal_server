/**
  * afterloe - cynomy_portal_server/routers/nodeManager.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-2-16 14:48:32
  */
"use strict";

const {resolve} = require("path");
const [{throwLackParameters}] = [require(resolve(__dirname, "..", "errors"))];

function* registry(next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {name, version, ip} = this.request.body;

    if (!name || !version || !ip) {
      throwLackParameters();
    }

    if ("json" === this.way) {
      this.body = this.success("cynomy://");
    }

  } catch (err) {
    this.error = err;
  }

  return yield next;
}

module.exports = {
  registry,
};
