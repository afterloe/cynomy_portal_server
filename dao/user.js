/**
  * afterloe - cynomy_portal_server/dao/user.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 10:42:53
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"))();

const [cacheUser] = [{
  _id: 1,
  name: 1,
  mail: 1,
  tags: 1,
}];

const checkExist = function* ({name, mail}) {
  const _ = yield this.findOne({name, mail});
  return _ ? true : false;
};

const findByMail = function* (mail){
  const _ = yield this.findOne({mail});
  return _;
};

const login = function* (mail, permit) {
  const _ = yield this.findOne({mail, permit, state:200}, cacheUser);
  return _;
};

const deleteUser = function* (userId) {
  if (this.valid(userId)) {
    userId = this.newObjectId(userId);
    return yield this.deleteOne({_id: userId});
  }
}

const classMethod = {
  checkExist,
  login,
  findByMail,
  deleteUser,
};

Object.assign(commonsLib, classMethod);

const className = "user";

module.exports = _ => _.definition({classMethod: commonsLib, className});
