/**
  * afterloe - cynomy_portal_server/dao/work-node.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:39:17
  */
"use strict";

const {resolve} = require("path");
const err = require(resolve(__dirname, "..", "errors"));

/**
 * 创建工作流节点
 *
 * @param  {Object{name}}    _worknode [传入数据]
 * @return {Generator}           [数据库操作函数，使用co或next来驱动]
 */
function* insert(_worknode) {
  const {name} = _worknode;
  if (!name) {
    err.throwLackParameters();
    return ;
  }
  return yield this.insertOne({name});
}

/**
 * 更新工作流节点
 *
 * @param  {Object{_id, upload}}    _nodeInfo [工作流节点信息]
 * @return {Generator}           [数据库操作函数，使用co或next来驱动]
 */
function* update(_nodeInfo) {
  const {_id, upload} = _nodeInfo;
  if (this.valid(_id)) {
    return this.updateOne({_id}, upload);
  }
  err.throwParametersError();
}

const classMethod = {
  insert,
  update,
};

const className = "worknode";

module.exports = _ => _.definition({classMethod, className});
