/**
  * afterloe - cynomy_portal_server/services/userService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 16:07:29
  */
"use strict";

const [{resolve}, xlsx] = [require("path"), require("node-xlsx").default];
const [{user_dao}, err, utilities] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];
const [mailRegex] = [/^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})$/];

/**
 * 构建用户对象
 *
 * @param  {Object} _user [基本用户信息]
 * @return {Object}       [用户对象]
 */
const buildUser = _user => {
  if (!_user.mail) {
    err.throwLackParameters();
  }
  const _ = {
    name: `Coyote-${utilities.randomNum(12)}`,
    targes: [],
    avatar: "",
    introduction: "",
    position: "",
    phoneNum: "",
    isLogin: false,
  };
  Object.assign(_, _user);
  return _;
};

/**
 * 从execl中读取用户信息
 *
 * @param  {String} _file [xlsx文件路径]
 * @return {Array}        [用户数组]
 */
const loaderFromXlsx = _file => {
  const [{data}, users] = [xlsx.parse(_file)[0], []];
  for(let i = 1; i < data.length; i++) {
    if (data[i].length <= 0) {
      continue;
    }
    const [mail, name] = [data[i][0], data[i][1]];
    if (!mailRegex.test(mail)) {
      continue;
    }
    users.push({
      mail,
      name,
    });
  }

  return users;
};

/**
 * 创建用户
 *
 * @param  {Object}    _user [基本用户信息]
 * @throw  {Error}           [用户存在则会抛出异常]
 * @return {Generator}       [description]
 */
function* createUser(_user) {
  const _ = yield user_dao.checkExist(_user);
  if (true === _) {
    err.throwUserExist();
  }

  return yield user_dao.insert(buildUser(_user));
}

/**
 * 创建一组用户
 *
 * @param  {Array}    _users [需要插入的一组用户]
 * @throw  {Error}            [参数异常，传入参数非数组类型]
 * @throw  {Error}            [如果用户组中人员都存在则会抛出 length = 0 的异常]
 * @return {Generator}        [description]
 */
function* createUsers (_users) {
  if (_users instanceof Array) {
    const _ = [];
    for(let i = 0; i < _users.length; i++) {
      const user = _users[i];
      const flag = yield user_dao.checkExist(user);
      if (true === flag) {
        continue;
      }
      _.push(buildUser(user));
    }
    if (0 === _.length) {
      err.throwParametersError("length = 0");
    }
    return yield user_dao.insertMany(_);
  }

  err.throwParametersError();
  return ;
}

module.exports = {
  loaderFromXlsx,
  createUsers,
  createUser,
};
