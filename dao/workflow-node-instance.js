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
const {throwParametersError} = require(resolve(__dirname, "..", "errors"));
const commonsLib = require(resolve(__dirname, "public"))();

const simpleInfo = {
};

const queryById = function* (id, hooks = {}) {
  if (this.valid(id)) {
    id = this.newObjectId(id);
    if (hooks) {
      Object.assign(hooks, simpleInfo);
    }
    return this.findOne({_id: id}, hooks);
  }
  throwParametersError();
};

const classMethod = {
  queryById,
};

Object.assign(commonsLib, classMethod);

const className = "workflow_node_instance";

module.exports = _ => _.definition({classMethod: commonsLib, className});
