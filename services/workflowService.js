/**
  * afterloe - cynomy_portal_server/services/workflowService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 23:32:16
  */
"use strict";

const {resolve} = require("path");
const [{workFlow_dao, workFlow_template_dao, workNode_dao}, err] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors"))];

const buildWorkFlowNode = (_workflowNode) => {
  const _ = {};
  // TODO
  Object.assign(_, _workflowNode);
  return _;
};

const buildWorkFlowTemplate = (_workflowNodes) => {
  const _ = {};
  // TODO
  Object.assign(_, _workflowNodes);
  return _;
};

const buildWorkFlow = (_workFlow) => {
  const _ = {};
  // TODO
  Object.assign(_, _workFlow);
  return _;
};

function* createWorkFlowNode(_workflowNode) {
  // TODO
  return yield workNode_dao.insert(buildWorkFlowNode(_workflowNode));
}

function* createWorkFlowTemplate(_workFlowNodes) {
  // TODO
  return yield workFlow_template_dao.insert(buildWorkFlowTemplate(_workFlowNodes));
}

function* startWorkflow(_workFlow) {
  // TODO
  return yield workFlow_dao.insert(buildWorkFlow(_workFlow));
}

module.exports = {
  createWorkFlowNode,
  createWorkFlowTemplate,
  startWorkflow,
};
