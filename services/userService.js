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
const [{user_dao}, {throwLackParameters, throwParametersError, throwOauthError, throwUserExist, throwUserNotExist}, {randomNum, uuidCode, checkParameter}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];
const [mailRegex] = [/^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})$/];

/**
 * 构建用户对象
 *
 * @param  {Object} _user [基本用户信息]
 * @return {Object}       [用户对象]
 */
const buildUser = _user => {
  const lackParameter = checkParameter(_user, "mail");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }

  if (!mailRegex.test(_user.mail)) {
    throwParametersError();
  }

  const _ = {
    name: `Coyote-${randomNum(12)}`,
    tags : [],
    avatar: "",
    introduction: "",
    position: "",
    phoneNum: "",
    createTimestamp: Date.now(),
    state: 200,
    isLogin: false,
  };
  Object.assign(_, _user);
  return _;
};

/**
 * User数组去除重复项
 *
 * @param  {Array} users [需要去除重复内容的users]
 * @return {Array}   [去除重复内容后的users]
 */
const removDuplication = users => {
  const _ = [];
  for (let i = 0; i < users.length; i++) {
    let flag = false;
    for (let j = 0; j < _.length; j++) {
      if (_[j].name === users[i].name && _[j].mail === users[i].mail){
        flag = true;
      }
    }
    flag === true ? null:_.push(users[i]);
  }

  return _;
};

const loaderUserFromXlsx = file => {
  const [{data}, users] = [xlsx.parse(file)[0], []];
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
  if (_user instanceof Object) {
    const _ = yield user_dao.checkExist(_user);
    if (true === _) {
      throwUserExist();
    }
    return yield user_dao.insert(buildUser(_user));
  } else {
    throwParametersError();
  }
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
    _users = removDuplication(_users);
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
      throwParametersError("", "length = 0");
    }
    return yield user_dao.insertMany(_);
  }

  throwParametersError();
}

/**
 * 从execl中导入用户数据
 *
 * @param  {String} file [xlsx文件路径]
 * @return {Array}        [用户数组]
 */
function* loaderFromXlsx(name) {
  const file = resolve("/tmp", name);
  const users = loaderUserFromXlsx(file);
  if (users && users.length > 0) {
    return yield createUsers(users);
  } else {
    throwLackParameters("");
  }
}

/**
 * 获取正常状态下所有用户列表
 *
 * @param  {Integer}    number [单页分页数量]
 * @param  {Integer}    page   [分码]
 * @return {Array}             [用户列表]
 */
function* getUserList (number, page) {
  return yield user_dao.queryAll({}, number, page);
}

function* login(mail, permit) {
  if (!mail || !permit) {
    throwLackParameters();
  }

  const _ = yield user_dao.login(mail, permit);
  if (!_) {
    throwOauthError();
  }

  // TODO 记录登录信息(登录时间，ip)
  return _;
}

function* obmitLoginPermit(mail){
  const _ = yield user_dao.findByMail(mail);
  if (!_) {
    throwUserNotExist();
  }
  const permit = uuidCode();

  return yield user_dao.update({
    _id: _._id,
    upload: {
      $set: {
        permit,
      }
    }
  });
}

function* cleanDocuments() {
  const a = yield user_dao.clean();
  return {a};
}

function* findUsers(users) {
  const _ = [];
  for (let i = 0; i < users.length; i++) {
    _.push(yield user_dao.queryById(users[i]));
  }

  return _;
}

module.exports = {
  loaderFromXlsx,
  createUsers,
  createUser,
  getUserList,
  cleanDocuments,
  login,
  obmitLoginPermit,
  findUsers,
};
