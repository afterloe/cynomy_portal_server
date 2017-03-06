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
const [
  {workFlow_instance_dao, workFlow_template_dao, workFlow_node_template_dao, workFlow_node_instance_dao},
  {throwLackParameters, throwParametersError, throwOauthError, throwObjectExists, throwNosuchThisWorkflowNodeInstance, throwOperationFailed, throwPersonalNotIn, throwBuildFailed, throwBuildWorkFlowNodeFailed, throwNosuchThisWorkFlow, throwNosuchThisWorkFlowTemplate},
  {checkParameter},
  {findUsers},
  {structureProduceList, findGoodsByNode},
  {getTagsInfo}
] = [
  require(resolve(__dirname, "..", "dao")),
  require(resolve(__dirname, "..", "errors")),
  require(resolve(__dirname, "..", "tools", "utilities")),
  require(resolve(__dirname, "userService")),
  require(resolve(__dirname, "goodsService")),
  require(resolve(__dirname, "tagsService"))
];

const UPDATELIST = Symbol("UPDATELIST");
module[UPDATELIST] = {};

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
    stat: "not start",
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
function* createWorkflowNode(_workflowNode) {
  const lackParameter = checkParameter(_workflowNode, "name");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  const _ = yield workFlow_node_template_dao.checkExist(_workflowNode);
  if (_) {
    throwObjectExists();
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
function* createWorkflow(_workFlow) {
  const lackParameter = checkParameter(_workFlow, "name", "chainNodes");
  const _ = yield workFlow_template_dao.checkExist(_workFlow);
  if (_) {
    throwObjectExists();
  }
  const chainNodes = _workFlow.chainNodes;
  if(!chainNodes || !chainNodes.length || chainNodes.length === 0) {
    throwParametersError();
  }
  for (let i = 0; i < chainNodes.length; i++){
    for (let j = i + 1; j < chainNodes.length; j++) {
      if (chainNodes[i].name === chainNodes[j].name) {
        throwOperationFailed("zh-CN", "存在相同节点");
      }
    }
  }
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
  const {ops} = yield workFlow_node_instance_dao.insertMany(_);
  const copy = [];
  for (let i = 0; i < ops.length; i++) {
    let item = ops[i];
    copy.push({
      _id: item._id.toString(),
      name: item.name,
      index: item.index,
      stat: item.stat
    });
  }

  return copy;
}

/**
 * 启动工作流
 *
 * @param  {String}    id [工作流id]
 * @return {Generator}           [description]
 */
function* startUpWorkflow(id) {
  /*
   * 1.依据工作流实例id查询出工作流
   * 2.检测工作流实例是否已启动
   * 3.获取工作流活动节点组
   * 4.设置status 为节点组第一个节点
   * 5.设置节点组第一个节点的stat为 working
   * 6.设置下一个节点，上一个节点
   * 7.保存节点信息
   */
  const _ = yield workFlow_instance_dao.queryById(id);
  if (!_) {
    throwNosuchThisWorkFlow();
  }
  if (_.beginTimestamp) {
    return ;
  }
  const nodeList = _.nodeList;
  nodeList[0].stat = "working";
  nodeList[0].beginTimestamp = Date.now();

  yield workFlow_node_instance_dao.update({
    _id : nodeList[0]._id,
    upload: {
      $set: {
        stat: nodeList[0].stat,
        beginTimestamp: nodeList[0].beginTimestamp
      }
    }
  });

  const status = yield workFlow_node_instance_dao.queryById(nodeList[0]._id);
  const nextNodeId = nodeList.length > 1 ? nodeList[1]._id : undefined;
  const nextNode = nextNodeId ? yield workFlow_node_instance_dao.queryById(nextNodeId): null;

  return yield workFlow_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        beginTimestamp: Date.now(),
        previousNode: null,
        nodeList,
        status,
        nextNode,
      }
    }
  });
}

/**
 * 构建产品
 *
 * @param  {Object{name, template, members}}    _workFlow [工作流基础信息包括 产品名 name，工作流模板引擎id template, 成员列表]
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
   const lackParameter = checkParameter(_workFlow, "name", "template", "members"); // 产品名，工作流模版引擎 参与人员
   if (lackParameter) {
     throwLackParameters(lackParameter);
   }
   const workFlowTemplate = yield workFlow_template_dao.queryById(_workFlow.template); //查询要启动的工作流模版引擎信息
   if (!workFlowTemplate) {
     throwNosuchThisWorkFlowTemplate();
   }
   const nodeList = buildWorkFlowNodeList(workFlowTemplate.chainNodes);
   const members = yield findUsers(_workFlow.members);
   const _ = {
     state : 200,
     tags: [],
   };
   Object.assign(_, {
     name: _workFlow.name,
     link: _workFlow.link || "http://tru.jwis.cn",
     template: _workFlow.template,
     members,
   });
   const result = yield workFlow_instance_dao.insert(_);
   if (result.result.n !== result.result.ok) {
     throwBuildFailed();
   }
   const _id = result.ops[0]._id.toString();
   const _nodeList = yield instanceNodeList(nodeList, _id);

   yield workFlow_instance_dao.update({
     _id,
     upload : {
       $set : {
         nodeList: _nodeList
       }
     }
   });

   if (true === autoStart) {
     return yield* startUpWorkflow(_id);
   } else {
     return _id;
   }
}

/**
 * 获取处于工作状态的指定工作流
 *
 * @param  {String}    _id  [工作流id]
 * @return {Object}         [工作流实例对象]
 */
function* obmitStartWorkflow(_id) {
  const _ = yield workFlow_instance_dao.queryById(_id);
  if (!_) {
    throwNosuchThisWorkFlow();
  }
  if (!_.beginTimestamp) { // 如果没有启动是没有启动时间戳
    throwOperationFailed();
  }

  if (_.endTimestamp) { // 如果有关闭时间戳则说明工作流已经关闭
    throwOperationFailed();
  }
  return _;
}

/**
 * 同步指定的工作流实例节点到所在的工作流实例
 *
 * @param  {Object}    _node [工作流实例节点对象]
 * @return {Generator}       [description]
 */
function* syncNodeToWorkflow(_node) {
  const {workflow, index} = _node;
  const {nextNode, previousNode, status, nodeList} = yield obmitStartWorkflow(workflow);
  nodeList[index] = {
    _id: _node._id.toString(),
    name: _node.name,
    owner: _node.owner,
    index,
    stat: _node.stat
  };
  let _ = {nodeList};
  if (nextNode && index === nextNode.index) {
    Object.assign(_, {nextNode: _node});
  } else if (previousNode && index === previousNode.index) {
    Object.assign(_, {previousNode: _node});
  } else if (status && index === status.index) {
    Object.assign(_, {status: _node});
  }

  return yield workFlow_instance_dao.update({
    _id: workflow,
    upload: {
      $set: _
    }
  });
}

/**
 * 给指定工作流中的节点设置负责人
 *
 * @param  {String}    workflowId [工作流实例id]
 * @param  {String}    userId     [设置成user的用户信息]
 * @param  {Integer}   index     [工作流实例节点id]
 * @return {Generator}           [description]
 */
function* setLeader(workflowId, nodeInstanceId, userId) {
  const [nodeInstance, workflow] =  yield [workFlow_node_instance_dao.queryById(nodeInstanceId), workFlow_instance_dao.queryById(workflowId)];

  if (!nodeInstance) {
    throwNosuchThisWorkflowNodeInstance();
  }

  if (!workflow) {
    throwNosuchThisWorkFlow();
  }

  const leader = workflow.members.find(member => member._id.toString() === userId);

  if (!leader) {
    throwPersonalNotIn();
  }

  const node = yield changeAndSyncNodeStat(nodeInstance._id, {
    owner: leader
  });

  return yield syncNodeToWorkflow(node);
}

/**
 * 同步变更工作流节点实例
 *
 * @param  {String}    _nodeId [工作流节点实例的id]
 * @param  {Object}    setter  [需要同步的数据]
 * @return {Object}            [工作流节点实例]
 */
function* changeAndSyncNodeStat(_nodeId, setter) {
  const _ = yield workFlow_node_instance_dao.queryById(_nodeId);
  if (!_) {
    throwNosuchThisWorkflowNodeInstance();
  }
  yield workFlow_node_instance_dao.update({
    _id: _._id,
    upload: {
      $set: setter
    }
  });

  Object.assign(_, setter);
  return _;
}

/**
 * 流程回退
 *
 * @param  {String}    _workFlow [工作流实例id]
 * @return {Generator}           [description]
 */
function* retroversion(_workFlow) {
  const _ = yield obmitStartWorkflow(_workFlow);
  const {previousNode, status} = _;
  if (!previousNode) {
    throwOperationFailed();
  }
  const [newStatus, newNextNode] = yield [changeAndSyncNodeStat(previousNode._id, {stat: "working", beginTimestamp: Date.now()}), changeAndSyncNodeStat(status._id, {stat: "not start", beginTimestamp: null})];

  const newPreviousNodeId = _.nodeList[newStatus.index - 1] ? _.nodeList[newStatus.index - 1]._id : undefined;
  const newPreviousNode = newPreviousNodeId ? yield workFlow_node_instance_dao.queryById(newPreviousNodeId): null;

  return yield workFlow_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        status: newStatus,
        nextNode: newNextNode,
        previousNode: newPreviousNode,
      },
      $unset: {
        endTimestamp: 1
      }
    }
  });
}

function* endProcess(_workFlow) {
  if (!_workFlow) {
    throwLackParameters();
  }
  const _ = this._id ? this : yield obmitStartWorkflow(_workFlow);

  return yield workFlow_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        status: null,
        nextNode: null,
        previousNode: null,
        endTimestamp: Date.now()
      }
    }
  });
}

/**
 * 推动流程
 *
 * @param  {String}    _workFlow [工作流实例id]
 * @return {Generator}           [description]
 */
function* promoteProcess(id) {
  const _ = yield obmitStartWorkflow(id);
  const {nextNode, status} = _;

  if (!nextNode) {
    return yield endProcess.call(_);
  }

  const timeStamp =  Date.now();
  const [newStatus, newPreviousNode] = yield [changeAndSyncNodeStat(nextNode._id, {stat: "working", beginTimestamp: timeStamp}), changeAndSyncNodeStat(status._id, {stat: "finish", endTimestamp: timeStamp})];

  const newNextNodeId = _.nodeList[newStatus.index + 1] ? _.nodeList[newStatus.index + 1]._id : undefined;
  const newNextNode = newNextNodeId ? yield workFlow_node_instance_dao.queryById(newNextNodeId): null;

  return yield workFlow_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        status: newStatus,
        nextNode: newNextNode,
        previousNode: newPreviousNode
      }
    }
  });
}

function* appendGoods2Node(nodeId, goods) {
  const _ = yield workFlow_node_instance_dao.queryById(nodeId);
  if (!_) {
    throwNosuchThisWorkflowNodeInstance();
  }

  const {produceList} = _;

  const index = produceList.findIndex(_goods => _goods.name === goods.name);
  if (-1 === index) {
    produceList.push(goods);
  }

  produceList[index] = goods;

  yield workFlow_node_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        produceList,
      }
    }
  });

  Object.assign(_, {
    produceList,
  });

  yield syncNodeToWorkflow(_);
}

function* updateNodeProduceFile(nodeId, goods) {
  const _ = yield workFlow_node_instance_dao.queryById(nodeId);
  if (!_) {
    throwNosuchThisWorkflowNodeInstance();
  }

  const {produceList} = _;
  const index = produceList.findIndex(_goods => _goods._id.toString() === goods._id.toString());
  if (-1 === index) {
    return ;
  }

  produceList[index] = goods;

  yield workFlow_node_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        produceList,
      }
    }
  });

  Object.assign(_, {
    produceList,
  });

  return yield syncNodeToWorkflow(_);
}

/**
 * 更新节点产出信息
 *
 * @param  {String}    _workFlowNode [工作流实例节点id]
 * @param  {Array}    produceList    [产出内容列表]
 * @param  {String}    reason        [更新原因]
 * @return {Generator}               [description]
 */
function* updateNodeProduceList(nodeId, {produceList, reason}) {
  const _ = yield workFlow_node_instance_dao.queryById(nodeId);
  if (!_) {
    throwNosuchThisWorkflowNodeInstance();
  }

  const uploadCount = Number.parseInt(_.uploadCount) + 1;

  yield workFlow_node_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        produceList,
        uploadCount,
        reason: reason? reason : ""
      }
    }
  });

  Object.assign(_, {
    produceList,
    uploadCount,
    reason: reason? reason : ""
  });

  return yield syncNodeToWorkflow(_);
}

function* workflowInfo(workflow, hooks) {
  let _ = yield workFlow_instance_dao.queryById(workflow, hooks);
  if (!_) {
    _ = yield workFlow_instance_dao.queryByName(workflow, hooks);
  }
  if (!_) {
    throwNosuchThisWorkFlow();
  }

  const {status} = _;

  if (!status) {
    return _;
  }

  const produceList = yield findGoodsByNode(status._id);

  Object.assign(status, {
    produceList,
  });

  Object.assign(_, {
    status
  });

  return _;
}

/**
 * 清除数据库信息
 * @return {Generator} [description]
 */
function* cleanDocuments() {
  const [a,b,c,d] = yield [workFlow_instance_dao.clean(), workFlow_template_dao.clean(), workFlow_node_template_dao.clean(), workFlow_node_instance_dao.clean()];
  return {a,b,c,d};
}

function* searchProduct(...tags) {
  const _ = yield workFlow_instance_dao.searchByTags(tags);
  return _.map(__ => {
    const {nodeList} = __;
    __.process = nodeList.map(node => ({
      name: node.name,
      stat: node.stat,
      index: node.index + 1,
    }));
    delete __.nodeList;
    delete __.status;
    return __;
  });
}

function* getWorkflowList(number, page) {
  return yield workFlow_instance_dao.queryAll({}, number, page);
}

function* getWorkflowTemplateList(number, page) {
  return yield workFlow_template_dao.queryAll({}, number, page);
}

function* getWorkflowNodeList(number, page) {
  return yield workFlow_node_template_dao.queryAll({}, number, page);
}

function* getWorkflowNode(id, hooks) {
  const _ = yield workFlow_node_instance_dao.queryById(id, hooks);
  if (!_) {
    throwNosuchThisWorkflowNodeInstance();
  }

  return _;
}

function* updateProcess(workflowId, {path, reason}) {
  const _ = yield obmitStartWorkflow(workflowId);
  const {status} = _;

  if (!status) {
    throwOperationFailed("", "工作流未启动！");
  }

  const produceList = yield structureProduceList(path, _._id, status._id);
  return yield updateNodeProduceList(status._id, {produceList, reason});
}


function* exampleInfo(workflowId) {
  const _ = yield workFlow_instance_dao.queryById(workflowId);
  if (!_) {
    throwOperationFailed();
  }

  const {name, _id, tags} = _;
  return {name, _id, tags, type: "workflow"};
}

function* setTags(workflowId, ...tagIds) {
  const workflow = yield workFlow_instance_dao.queryById(workflowId);
  if (!workflow) {
    throwNosuchThisWorkFlow();
  }

  let _ = yield getTagsInfo.apply(this, tagIds); // 动态获取tag信息
  if (0 === _.length) {
    throwLackParameters();
  }

  const {tags} = workflow;
  _ = [...new Set(tags.concat(_))];

  return yield workFlow_instance_dao.update({
    _id: workflow._id,
    upload: {
      $set: {
        tags: _,
      }
    }
  });
}

function* deleteExampleTag(workflowId, ..._tags) {
  const workflow = yield workFlow_instance_dao.queryById(workflowId);

  if (!workflow) {
    throwNosuchThisWorkFlow();
  }

  const {tags} = workflow;
  const _ = [];
  for (let t of _tags) {
    for (let _t of tags) {
      if (t === _t) {
        continue;
      }
      _.push(_t);
    }
  }

  return yield workFlow_instance_dao.update({
    _id: workflow._id,
    upload: {
      $set: {
        tags: _,
      }
    }
  });
}

function* obmitUploadFileAuthorize(workflowId, {mail}) {
  const _ = yield workFlow_instance_dao.queryById(workflowId, {members: 1});
  if (!_) {
    throwNosuchThisWorkFlow();
  }

  const {members} = _;

  const flag = members.findIndex(member => member.mail === mail);
  if (-1 === flag) {
    throwOauthError();
  }
}

function* workflowMemberList(workflowId) {
  const _ = yield workFlow_instance_dao.queryById(workflowId, {members: 1, name: 1, owner: 1});
  if (!_) {
    throwNosuchThisWorkFlow();
  }

  delete _._id;

  Object.assign(_, {
    workflowId: workflowId,
  });

  return _;
}

function* appendUser2Members(workflowId, ...userIds) {
  const _ = yield workFlow_instance_dao.queryById(workflowId, {members: 1});
  if (!_) {
    throwNosuchThisWorkFlow();
  }
  const users = yield findUsers(userIds);
  if (users.length === 0) {
    return ;
  }

  const modifyMembers = [];
  let flag;

  for (let user of users) {
    flag = false;
    for (let _user of _.members) {
        if (_user._id.toString() === user._id.toString()) {
          flag = true;
        }
    }

    if (!flag) {
      modifyMembers.push(user);
    }
  }

  return yield workFlow_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        members: _.members.concat(modifyMembers),
      }
    }
  });
}

function* removeUserFromMembers(workflowId, ...userIds) {
  const _ = yield workFlow_instance_dao.queryById(workflowId, {members: 1});
  if (!_) {
    throwNosuchThisWorkFlow();
  }
  const users = yield findUsers(userIds);
  if (users.length === 0) {
    return ;
  }

  const modifyMembers = [];
  let flag;

  for (let _user of _.members) {
    flag = false;
    for (let user of users) {
        if (user._id.toString() === _user._id.toString()) {
          flag = true;
        }
    }

    if (!flag) {
      modifyMembers.push(_user);
    }
  }

  return yield workFlow_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        members: modifyMembers,
      }
    }
  });
}

function* getNodeInstance(nodeId) {
  const _ = yield workFlow_node_instance_dao.queryById(nodeId);

  if (!_) {
    throwNosuchThisWorkFlow();
  }

  return _;
}

function* setOwner(workflowId, userId) {
  const _ = yield workFlow_instance_dao.queryById(workflowId, {_id: 1});
  if (!_) {
    throwNosuchThisWorkFlow();
  }

  const users = yield findUsers(userId);

  if (users.length === 0) {
    return ;
  }

  return yield workFlow_instance_dao.update({
    _id: _._id,
    upload: {
      $set: {
        owner: users[0],
      }
    }
  });
}

function* cancelOwner(workflowId, userId) {
  const _ = yield workFlow_instance_dao.queryById(workflowId, {owner: 1});
  if (!_) {
    throwNosuchThisWorkFlow();
  }

  const {owner} = _;

  if (owner._id.toString() === userId) {
    return yield workFlow_instance_dao.update({
      _id: _._id,
      upload: {
        $unset: {
          owner: 1,
        }
      }
    });
  }
}

module.exports = {
  createWorkflowNode,
  createWorkflow,
  workflowInfo,
  buildProduct,
  startUpWorkflow,
  setLeader,
  updateNodeProduceList,
  promoteProcess,
  retroversion,

  searchProduct,
  cleanDocuments,
  updateNodeProduceFile,
  getWorkflowNodeList,
  getWorkflowNode,
  getWorkflowList,
  getWorkflowTemplateList,
  updateProcess,
  exampleInfo,
  setTags,
  deleteExampleTag,
  appendGoods2Node,
  obmitUploadFileAuthorize,
  workflowMemberList,
  appendUser2Members,
  removeUserFromMembers,
  getNodeInstance,
  setOwner,
  cancelOwner,
};
