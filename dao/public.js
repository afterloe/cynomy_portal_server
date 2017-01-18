/**
  * afterloe - cynomy_portal_server/dao/public.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 14:07:37
  */
"use strict";

const {resolve} = require("path");
const err = require(resolve(__dirname, "..", "errors"));

/**
 * 更新文档信息
 *
 * @param  {Object{_id, upload}}    _document [用户信息]
 * @return {Generator}           [数据库操作函数，使用co或next来驱动]
 */
function* update (_document) {
  const {_id, upload} = _document;
  if (this.valid(_id)) {
    return this.updateOne({_id}, upload);
  }
  err.throwParametersError();
}

/**
 * 插入一条文档
 *
 * @param  {Object{name}}    _user [_document]
 * @return {Generator}           [数据库操作函数，使用co或next来驱动]
 */
function* insert (_) {
  if (!_.name) {
    err.throwLackParameters("name");
    return ;
  }

  if (!_.state) {
    _.state = 200;
  }

  if (!_.createTimestamp) {
    _.createTimestamp = Date.now();
  }

  return this.insertOne(_);
}

/**
 * 插入一群文档
 *
 * @param  {Array}    _documents  [需要插入的一群数据]
 * @return {Generator}            [数据库操作函数，使用co或next来驱动]
 */
function* insertMany (_) {
  if (_ instanceof Array) {
    return _.length > 0 ? this.insertMany(_): null;
  }
  err.throwParametersError();
}

/**
 * 删除文档
 *
 * @param  {Object{_id}}    _document [需要删除的数据]
 * @return {Generator}                [数据库操作函数，使用co或next来驱动]
 */
function* remove ({_id}) {
  if (this.valid(_id)) {
    return this.updateOne({_id}, {
      $set: {
        state : 500,
        deleteTime: Date.now(),
      }
    });
  }
}

/**
 * 检测是否存在重复元素
 *
 * @param  {Object{name}} _document   [需要检测的数据]
 * @return {Boolean}                  [true - 存在 | false - 不存在]
 */
function* checkExist ({name}){
  const _doc = yield this.findOne({name});
  return _doc ? true : false;
}

/**
 * 通过id查询数据
 *
 * @param  {ObjectId, String}    _ [id]
 * @return {Generator}   [数据库操作函数，使用co或next来驱动]
 */
function* queryById(_) {
  if (this.valid(_)) {
    _ = this.newObjectId(_);
    return this.findOne({_id: _});
  }
}

module.exports = {
  insert,
  update,
  checkExist,
  queryById,
  remove,
  insertMany,
};
