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
const [{user_dao}] = [require(resolve(__dirname, "..", "dao"))];
const [mailRegex] = [/^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})$/];

function* createUser (_users) {
  const [task, __users] = [[], []];
  for(let i = 0; i < _users.length; i++) {
    const flag = yield user_dao.checkExist(_users[i]);
    if (false === flag) {
      task.push(i);
    }
  }

  for(let i = 0; i < task.length; i++) {
    __users.push(_users[task[i]]);
  }

  return yield user_dao.insertMany(__users);
}

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

module.exports = {
  loaderFromXlsx,
  createUser,
};
