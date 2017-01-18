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
const [{workFlow_instance_dao, workFlow_template_dao, workFlow_node_dao}, {throwLackParameters}, {checkParameter}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];

const buildWorkFlowNode = _workflowNode => {
  const _ = {
    tags : [],
    state: 200
  };
  Object.assign(_, _workflowNode);
  return _;
};

const buildWorkFlowTemplate = _workflowNodes => {
  const _ = {
    tags : [],
    state: 200,
  };
  Object.assign(_, _workflowNodes);
  return _;
};

const buildWorkFlow = _workFlow => {
  const _ = {};
  // TODO
  Object.assign(_, _workFlow);
  return _;
};

function* createWorkFlowNode(_workflowNode) {
  const lackParameter = checkParameter(_workflowNode, "name");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  return yield workFlow_node_dao.insert(buildWorkFlowNode(_workflowNode));
}

function* createWorkFlowTemplate(_workFlowNodes) {
  const lackParameter = checkParameter(_workFlowNodes, "name", "chainNodes");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  return yield workFlow_template_dao.insert(buildWorkFlowTemplate(_workFlowNodes));
}

function* startWorkflow(_workFlow) {
  const lackParameter = checkParameter(_workFlow, "name", "chainNodes", "members");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  return yield workFlow_instance_dao.insert(buildWorkFlow(_workFlow));
}

module.exports = {
  createWorkFlowNode,
  createWorkFlowTemplate,
  startWorkflow,
};
