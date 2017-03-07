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
const {throwParametersError} = require(resolve(__dirname, "..", "errors"));
const commonsLib = require(resolve(__dirname, "public"))();

const simpleInfo = {
};

/**
 * 通过工作流名字来查询工作流实例 - 精确匹配
 *
 * @param  {String}    name [工作流实例名字]
 * @return {Object}         [工作流实例对象]
 */
const queryByName = function* (name, hooks = {}) {
  if (hooks) {
    Object.assign(hooks, simpleInfo);
  }
  const _ = yield this.findOne({
    name,
    state: 200
  }, hooks);

  return _ ? _ : undefined;
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

function* searchByTags(tags) {
  if (tags instanceof Array) {
    return yield this.find({
      tags: {
        $all: tags
      },
      state: 200,
    }, {
      name : 1,
      tags: 1,
      nodeList: 1,
      status: 1,
      beginTimestamp: 1,
    }).sort({beginTimestamp: -1}).toArray();
  }

  return [];
}

const classMethod = {
  queryByName,
  queryById,
  searchByTags,
};

Object.assign(commonsLib, classMethod);

const className = "workflow_instance";

module.exports = _ => _.definition({classMethod: commonsLib, className});
