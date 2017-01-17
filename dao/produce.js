/**
  * afterloe - cynomy_portal_server/dao/produce.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 15:32:18
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"));

const classMethod = {
};

Object.assign(commonsLib, classMethod);

const className = "produce";

module.exports = _ => _.definition({classMethod: commonsLib, className});
