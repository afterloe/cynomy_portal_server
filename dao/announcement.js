/**
  * afterloe - cynomy_portal_server/dao/announcement.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-10 14:52:46
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"))();

const classMethod = {
};

Object.assign(commonsLib, classMethod);

const className = "announcement";

module.exports = _ => _.definition({classMethod: commonsLib, className});
