/**
  * afterloe - cynomy_portal_server/services/tagService.js
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
const [{tag_dao}, {throwLackParameters, throwTargetExist}, {checkParameter}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];

/**
 * 构建标签对象
 *
 * @param  {Object} _target [基本标签信息]
 * @return {Object}         [标签对象]
 */
const buildTarget = _target => {
  const _ = {
    keyWord: [],
    property: [],
    domain: [],
    state: 200,
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
  const lackParameter = checkParameter(_target, "name");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  const _ = yield tag_dao.checkExist(_target);
  if (true === _) {
    throwTargetExist();
  }

  return yield tag_dao.insert(buildTarget(_target));
}

module.exports = {
  createTarget,
};
