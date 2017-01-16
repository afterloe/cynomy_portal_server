/**
  * afterloe - cynomy_portal_server/dao/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:02:04
  */
"use strict";

const {resolve} = require("path");
const sequel = require(resolve(__dirname, "sequel"));

const loadDao = _name => sequel.import(resolve(__dirname, _name));

module.exports = {
  sequel,
  workFlowDao: loadDao("work-flow"),
  workNodeDao: loadDao("work-node"),
};
