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
  workFlow_dao: loadDao("workflow"), // 工作流实例
  workFlow_template_dao: loadDao("workflow-template"), // 工作流模版
  workNode_dao: loadDao("workflow-node"), // 工作流节点
  user_dao: loadDao("user"), // 用户
  target_dao: loadDao("target"), // 标签
  goods_dao: loadDao("goods"), // 产出
  produce_dao: loadDao("produce"), // 产品
};
