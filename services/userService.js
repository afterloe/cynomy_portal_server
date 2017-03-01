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

const [{resolve}, xlsx, {unlinkSync}] = [require("path"), require("node-xlsx").default, require("fs")];
const toolsPath = resolve(__dirname, "..", "tools");
const [{getTagsInfo}, {compileTemplate}, {sendPromise}, {get}, {user_dao}, {sign, setSession}, {throwObjectCanTAes, throwAccountOrPwdError, throwLackParameters, throwParametersError, throwUserExist, throwUserNotExist}, {randomNum, checkParameter}] =
[require(resolve(__dirname, "tagsService")), require(resolve(toolsPath, "buildPage")), require(resolve(toolsPath, "mailHelper")), require(resolve(__dirname, "..", "config")), require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "sessionService")),
require(resolve(__dirname, "..", "errors")), require(resolve(toolsPath, "utilities"))];
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
 * 获取正常状态下所有用户列表
 *
 * @param  {Integer}    number [单页分页数量]
 * @param  {Integer}    page   [分码]
 * @return {Array}             [用户列表]
 */
function* getUserList (number, page) {
  return yield user_dao.queryAll({}, number, page);
}

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

function* loginSystem(mail, permit) {
  if (!mail || !permit) {
    throwLackParameters();
  }
  const _ = yield user_dao.login(mail, permit);
  if (!_) {
    throwAccountOrPwdError();
  }

  yield user_dao.update({
    _id: _._id,
    upload: {
      $set: {
        isLogin: true,
      },
      $unset: {
        permit: 1,
      }
    }
  });

  const token = sign(mail, permit);
  yield setSession(token, {
    id: _._id.toString(),
    name: _.name,
    tags: _.tags.join(","),
    mail,
  });

  return token;
}

function* obmitLoginPermit(mail){
  const _ = yield user_dao.findByMail(mail);
  if (!_) {
    throwUserNotExist();
  }
  const permit = randomNum(4);
  const html = compileTemplate("pwdMail", {
    time: new Date().toLocaleString(),
    permit: permit,
  });

  sendPromise(mail, "JW R&D Protal System", html);
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

function* loaderFromXlsx(name) {
  const file = resolve(get("tmpDir"), name);
  const users = loaderUserFromXlsx(file);
  unlinkSync(file);
  if (users && users.length > 0) {
    return yield createUsers(users);
  } else {
    throwLackParameters();
  }
}

function* findUsers(userIds) {
  const _ = [];
  for (let i = 0; i < userIds.length; i++) {
    const user = yield user_dao.queryById(userIds[i]);
    if (!user) {
      continue;
    }
    _.push(user);
  }

  return _;
}

function* findUsersByTag(...tags) {
  const _ = yield getTagsInfo.apply(this, tags);
  if (0 === _.length) {
    throwLackParameters();
  }

  const result = yield user_dao.searchByTags(_); // 动态获取tag信息
  return result ? result : [];
}

function* setTags(userId, ...tagIds) {
  const user = yield user_dao.queryById(userId, 200);
  if (!user) {
    throwObjectCanTAes();
  }

  let _ = yield getTagsInfo.apply(this, tagIds); // 动态获取tag信息
  if (0 === _.length) {
    throwLackParameters();
  }

  const {tags} = user;
  _ = [...new Set(tags.concat(_))];

  return yield user_dao.update({
    _id: user._id,
    upload: {
      $set: {
        tags: _,
      }
    }
  });
}

function* exampleInfo(userId) {
  const _ = yield user_dao.queryById(userId, 200);
  if (!_) {
    throwUserNotExist();
  }

  const {name, _id, tags} = _;
  return {name, _id, tags, type: "user"};
}

function* deleteExampleTag(userId, ..._tags) {
  const user = yield user_dao.queryById(userId);

  if (!user) {
    throwUserNotExist();
  }

  const {tags} = user;
  const _ = [];
  for (let t of _tags) {
    for (let _t of tags) {
      if (t === _t) {
        continue;
      }
      _.push(_t);
    }
  }

  return yield user_dao.update({
    _id: user._id,
    upload: {
      $set: {
        tags: _,
      }
    }
  });
}

module.exports = {
  loaderUserFromXlsx,
  createUsers,
  createUser,
  getUserList,
  cleanDocuments,
  loginSystem,
  obmitLoginPermit,

  findUsers,
  loaderFromXlsx,
  findUsersByTag,
  setTags,
  exampleInfo,
  deleteExampleTag,
};
