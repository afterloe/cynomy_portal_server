/**
  * afterloe - cynomy_portal_server/dao/workflow-instance.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:13:30
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"));

/**
 * 通过工作流名字来查询工作流实例 - 精确匹配
 *
 * @param  {String}    name [工作流实例名字]
 * @return {Object}         [工作流实例对象]
 */
const queryByName = function* (name) {
  const _ = yield this.findOne({
    name,
    state: 200
  });

  return _ ? _ : undefined;
};

const classMethod = {
  queryByName,
};

Object.assign(commonsLib, classMethod);

const className = "workflow_instance";

module.exports = _ => _.definition({classMethod: commonsLib, className});
