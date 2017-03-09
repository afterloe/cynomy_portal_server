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
const {throwLackParameters, throwParametersError} = require(resolve(__dirname, "..", "errors"));

/**
 * 更新文档信息
 *
 * @param  {Object{_id, upload}}    _document [用户信息]
 * @return {Generator}           [数据库操作函数，使用co或next来驱动]
 */
function* update (_document) {
  let {_id, upload} = _document;
  if (this.valid(_id)) {
    if ("string" === typeof _id) {
      _id = this.newObjectId(_id);
    }
    return yield this.updateOne({_id}, upload);
  }
  throwParametersError();
}

/**
 * 插入一条文档
 *
 * @param  {Object{name}}    _user [_document]
 * @return {Generator}           [数据库操作函数，使用co或next来驱动]
 */
function* insert (_) {
  if (!_.name) {
    throwLackParameters(null, "name");
    return ;
  }

  if (!_.state) {
    _.state = 200;
  }

  if (!_.createTimestamp) {
    _.createTimestamp = Date.now();
  }

  return yield this.insertOne(_);
}

/**
 * 插入一群文档
 *
 * @param  {Array}    _documents  [需要插入的一群数据]
 * @return {Generator}            [数据库操作函数，使用co或next来驱动]
 */
function* insertMany (_) {
  if (_ instanceof Array) {
    return _.length > 0 ? yield this.insertMany(_): null;
  }
  throwParametersError();
}

/**
 * 删除文档
 *
 * @param  {Object{_id}}    _document [需要删除的数据]
 * @return {Generator}                [数据库操作函数，使用co或next来驱动]
 */
function* remove (_id) {
  if (this.valid(_id)) {
    _id = this.newObjectId(_id);
    return yield this.updateOne({_id}, {
      $set: {
        state : 500,
        deleteTime: Date.now(),
      }
    });
  }
  throwParametersError();
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
function* queryById(_, state) {
  if (this.valid(_)) {
    _ = this.newObjectId(_);
    const queryBody = {_id: _};
    if (state) {
      Object.assign(queryBody, {state});
    }
    return this.findOne(queryBody);
  }
  throwParametersError();
}

/**
 * 查询文档集合
 *
 * @param  {Object}    [filed={}]                [过滤字段，如果传入的对象存在key则只有key否则包含对象所有的属性]
 * @param  {Number}    [number=100]              [分页数量]
 * @param  {Number}    [page=0]                  [分页列表]
 * @param  {String}    [order="createTimestamp"] [排序字段]
 * @return {Array}                               [文档数组]
 */
function* queryAll(filed = {}, number = 100, page = 0, order = "createTimestamp") {
  page < 1 ? page = 0 : page--;
  return yield this.find({
    state : 200
  }, filed).sort({[order]: -1}).skip(number * page).limit(number).toArray();
}

function* clean() {
  return yield this.deleteMany({});
}

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
      beginTimestamp: 1,
    }).toArray();
  }

  return [];
}

function* count() {
  return yield this.find().count();
}

module.exports = () => ({
  checkExist,
  clean,
  count,
  insert,
  insertMany,
  queryAll,
  queryById,
  remove,
  searchByTags,
  update,
});
