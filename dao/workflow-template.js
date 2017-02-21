/**
  * afterloe - cynomy_portal_server/dao/workflow-template.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 15:42:52
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"))();

const classMethod = {
};

Object.assign(commonsLib, classMethod);

const className = "workflow_template";

module.exports = _ => _.definition({classMethod: commonsLib, className});
