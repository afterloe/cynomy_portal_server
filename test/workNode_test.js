/**
  * afterloe - cynomy_portal_server/test/workNode_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:42:14
  */
"use strict";

const [{resolve}, co] = [require("path"), require("co")];
const {workNodeDao} = require(resolve(__dirname, "..", "dao"));


co(function* () {
  yield workNodeDao.insert({name: "产品规划"});
  yield workNodeDao.insert({name: "产品设计"});
  yield workNodeDao.insert({name: "产品开发"});
  yield workNodeDao.insert({name: "产品测试"});
  yield workNodeDao.insert({name: "产品发布"});
}).then(data => console.log(data)).catch(err => console.log(err));
