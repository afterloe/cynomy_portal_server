/**
  * afterloe - cynomy_portal_server/routers/workflow.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-2 16:14:38
  */
"use strict";

const {resolve} = require("path");
const workflowService = require(resolve(__dirname, "..", "services", "workflowService"));

const list = function* (next) {
  const {number, page} = this.params;
  this.data = yield workflowService.getWorkflowList(number, page);
  return yield next;
};

module.exports = {
  list,
};
