/**
  * afterloe - cynomy_portal_server/services/targetService.js
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
const [{target_dao}, err] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors"))];

/**
 * 构建标签对象
 *
 * @param  {Object} _target [基本标签信息]
 * @return {Object}         [标签对象]
 */
const buildTarget = _target => {
  const _ = {
    "keyWord": [],
    "property": [],
    "domain": [],
  };
  Object.assign(_, _target);
  return _;
};

/**
 * 创建标签
 *
 * @param  {Object}    _target  [标签信息]
 * @throw  {Error}              [标签信息缺少name字段会抛出异常]
 * @throw  {Error}              [标签存在则会抛出异常]
 * @return {Generator}          [description]
 */
function* createTarget(_target){
  if (!_target.name) {
    err.throwLackParameters("name");
    return ;
  }
  const _ = yield target_dao.checkExist(_target);
  if (true === _) {
    err.throwTargetExist();
  }

  return yield target_dao.insert(buildTarget(_target));
}

module.exports = {
  createTarget,
};
