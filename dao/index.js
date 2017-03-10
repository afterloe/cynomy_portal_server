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
  workFlow_instance_dao: loadDao("workflow-instance"), // 工作流实例
  workFlow_template_dao: loadDao("workflow-template"), // 工作流模版
  workFlow_node_template_dao: loadDao("workflow-node-template"), // 工作流节点模板
  workFlow_node_instance_dao: loadDao("workflow-node-instance"), // 工作流节点实例
  user_dao: loadDao("user"), // 用户
  tag_dao: loadDao("tag"), // 标签
  goods_dao: loadDao("goods"), // 产出
  produce_dao: loadDao("produce"), // 产品
  announcement_dao: loadDao("announcement"), // 系统
  discuss_dao: loadDao("discuss") // 讨论贴
};
