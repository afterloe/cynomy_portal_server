/**
  * afterloe - cynomy_portal_server/dao/workflow-node-instance.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-18 11:52:05
  */
  "use strict";

  const {resolve} = require("path");
  const commonsLib = require(resolve(__dirname, "public"));

  const classMethod = {
  };

  Object.assign(commonsLib, classMethod);

  const className = "workflow_node_instance";

  module.exports = _ => _.definition({classMethod: commonsLib, className});
