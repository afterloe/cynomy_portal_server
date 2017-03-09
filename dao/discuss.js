/**
  * afterloe - cynomy_portal_server/dao/discuss.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-9 16:05:41
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"))();

const classMethod = {
};

Object.assign(commonsLib, classMethod);

const className = "discuss";

module.exports = _ => _.definition({classMethod: commonsLib, className});
