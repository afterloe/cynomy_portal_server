/**
  * afterloe - cynomy_portal_server/dao/work-flow.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:13:30
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"));

const classMethod = {
};

Object.assign(commonsLib, classMethod);

const className = "workflow";

module.exports = _ => _.definition({classMethod: commonsLib, className});
