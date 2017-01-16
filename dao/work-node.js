/**
  * afterloe - cynomy_portal_server/dao/work-node.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:39:17
  */
"use strict";

const {resolve} = require("path");
const err = require(resolve(__dirname, "..", "errors"));

function* insert(_worknode) {
  const {name} = _worknode;
  if (!name) {
    err.throwLackParameters();
    return ;
  }
  return yield this.insertOne({name});
}

const classMethod = {
  insert,
};

const className = "worknode";

module.exports = _ => _.definition({classMethod, className});
