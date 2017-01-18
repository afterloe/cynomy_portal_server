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
const [{workFlow_instance_dao, workFlow_template_dao, workFlow_node_template_dao, workFlow_node_instance_dao},
  {throwLackParameters, throwParametersError, throwBuildWorkFlowNodeFailed, throwNosuchThisWorkFlowTemplate}, {checkParameter}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];

/**
 * 构建工作流节点模板
 *
 * @param  {Object} _workflowNode [工作流节点基础信息对象]
 * @return {Object}               [工作流节点模板对象]
 */
const buildWorkFlowNodeTemplate = _workflowNode => {
  const _ = {
    tags : [],
    state: 200,
  };
  Object.assign(_, _workflowNode);
  return _;
};

/**
 * 构建工作流模板
 *
 * @param  {Object} _workFlow [工作流模版基础信息对象]
 * @return {Object}           [工作流节点模板对象]
 */
const buildWorkFlowTemplate = _workFlow => {
  const _ = {
    tags : [],
    state: 200,
  };
  Object.assign(_, _workFlow);
  return _;
};

/**
 * 构建工作流节点
 *
 * @param  {Object} _chainNode  [节点基础信息]
 * @param  {Integer} _index     [节点在工作流中的索引]
 * @return {Object}             [工作流节点对象]
 */
const buildWorkFlowNode = (_chainNode, _index) => {
  const _ = {
    stat: "not start", //not start、working、stopped、finish
    reason: "",
    owner: "",
    beginTimestamp: "",
    uploadCount: 0,
    produceList: [],
    index: _index,
  };
  Object.assign(_, _chainNode);
  return _;
};

/**
 * 构建工作流节点对象组
 *
 * @param  {Array{工作流节点模板对象}} chainNodes   [工作流节点模板对象数组]
 * @throw  {Error}                               [如果构建后的工作流节点长度为0，会抛出异常 数组中的内容都不是对象]
 * @throw  {Error}                               [参数类型不是数组 会抛出异常]
 * @return {Array{工作流节点对象}}                 [工作流节点对象组]
 */
const buildWorkFlowNodeList = chainNodes => {
  if (chainNodes instanceof Array) {
    const _ = [];
    for (let i = 0; i < chainNodes.length; i++) {
      if (chainNodes[i] instanceof Object) {
        _.push(buildWorkFlowNode(chainNodes[i], i));
      }
    }

    if (0 === _.length) {
      throwBuildWorkFlowNodeFailed();
    }

    return _;
  }
  throwParametersError();
};

/**
 * 创建工作流节点模板
 *
 * @param  {Object}    _workflowNode [工作流节点信息]
 * @throw  {Error}                   [信息不包括name 则会抛出缺少参数异常]
 * @return {Generator}               [description]
 */
function* createWorkFlowNode(_workflowNode) {
  const lackParameter = checkParameter(_workflowNode, "name");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  return yield workFlow_node_template_dao.insert(buildWorkFlowNodeTemplate(_workflowNode)); // 在模版中创建节点信息
}

/**
 * 创建工作流
 *
 * @param  {Array[workflow-node-template]}    _workFlowNodes  [需要创建的工作流信息]
 * @throw  {Error}                                            [信息不包括name, chainNodes 则会抛出缺少参数异常]
 * @return {Generator}                                        [description]
 */
function* createWorkFlow(_workFlow) {
  const lackParameter = checkParameter(_workFlow, "name", "chainNodes");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  return yield workFlow_template_dao.insert(buildWorkFlowTemplate(_workFlow)); // 在模版中创建节点信息
}

/**
 * 实例化工作流节点对象组
 *
 * @param  {Array{工作流节点对象组}}    nodeList [工作流节点对象组]
 * @param  {String}    workflow [工作流实例id]
 * @return {Generator}          [description]
 */
function* instanceNodeList(nodeList, workflow) {
  const _ = [];
  for (let i = 0; i < nodeList.length; i++) {
    let node = nodeList[i];
    Object.assign(node, {workflow});
    _.push(node);
  }
  yield workFlow_node_instance_dao.insertMany(_);
}

function* startUpWorkFlow(_workFlow) {
  // beginTimestamp
  // nextNode: nodeList[1] || null,
  // previousNode: null
}

/**
 * 构建产品
 *
 * @param  {Object{name, template}}    _workFlow [工作流基础信息包括 产品名 name，工作流模板引擎id template]
 * @param  {Boolean}    autoStart [hook项 是否自动启动工作流]
 * @throw  {Error}                [如果缺少name 和 template 会抛出缺少参数的异常]
 * @throw  {Error}                [如果提供的工作流模版引擎id无效或无法找到对应的工作流则会抛出异常]
 * @return {Generator}            [description]
 */
function* buildProduct(_workFlow, autoStart) {
  /*
   * 1.查询要启动的工作流模版引擎
   * 2.查询工作流模版中的节点信息，构建工作流节点实例，并填充到实例中的nodeList中
   * 3.填入基本信息name、members
   * 4.自动完成status,nextNode,previousNode
   * 5.启动流程
   */
   const lackParameter = checkParameter(_workFlow, "name", "template"); // 产品名，工作流模版引擎
   if (lackParameter) {
     throwLackParameters(lackParameter);
   }
   const workFlowTemplate = yield workFlow_template_dao.queryById(_workFlow.template); //查询要启动的工作流模版引擎信息
   if (!workFlowTemplate) {
     throwNosuchThisWorkFlowTemplate();
   }
   const nodeList = buildWorkFlowNodeList(workFlowTemplate.chainNodes);
   const _ = {
     state : 200,
   };
   Object.assign(_, {
     name: _workFlow.name,
     template: _workFlow.template,
     members: _workFlow.members,
     status: nodeList[0],
     nodeList,
   });
   // TODO result 不是最终的数据，需要处理
   const result = yield workFlow_instance_dao.insert(_);
   yield instanceNodeList(nodeList, result);
   if (true === autoStart) {
     return yield startUpWorkFlow(result);
   }
}

module.exports = {
  createWorkFlowNode,
  createWorkFlow,
  buildProduct,
  startUpWorkFlow,
};
