/**
  * afterloe - cynomy_portal_server/services/tagsService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 23:08:22
  */
"use strict";

const {resolve} = require("path");
const [{tag_dao}, {throwLackParameters, throwNoThisTag, throwTargetExist}, {checkParameter}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];

/**
 * 构建标签对象
 *
 * @param  {Object} tag [基本标签信息]
 * @return {Object}         [标签对象]
 */
const buildTag = tag => {
  const _ = {
    keyWord: [],
    pro: [],
    domain: [],
    state: 200,
  };
  Object.assign(_, tag);
  return _;
};

/**
 * 创建标签
 *
 * @param  {Object}    tag  [标签信息]
 * @throw  {Error}              [标签信息缺少name字段会抛出异常]
 * @throw  {Error}              [标签存在则会抛出异常]
 * @return {Generator}          [description]
 */
function* createTag(tag){
  const lackParameter = checkParameter(tag, "name");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  const _ = yield tag_dao.checkExist(tag);
  if (true === _) {
    throwTargetExist();
  }

  return yield tag_dao.insert(buildTag(tag));
}

function* getTagsList(number, page) {
  const _ = yield tag_dao.queryAll({}, number, page);
  return _;
}

function* deleteTag(tagId) {
  const _ = yield tag_dao.queryById(tagId);
  if (!_) {
    throwNoThisTag();
  }

  return yield tag_dao.remove(tagId);
}

function* getTagsInfo(...args) {
  if (0 === args.length) {
    throwLackParameters();
  }

  const tasks = [];
  for (let i = 0; i < args.length; i++) {
    tasks.push(yield tag_dao.queryById(args[i]));
  }

  const _ = Array.from(tasks, task => task.name);

  return [...new Set(_)];
}

function* findTags(...keywords) {
  if (0 === keywords.length) {
    throwLackParameters();
  }

  const _ = yield tag_dao.searchByTags(keywords);
  return _.map(__ => __.name);
}

module.exports = {
  createTag,
  deleteTag,
  getTagsList,
  getTagsInfo,
  findTags,
};
