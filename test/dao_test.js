/**
  * afterloe - cynomy_portal_server/test/dao_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 18:01:04
  */
"use strict";

const {resolve} = require("path"), co = require("co");
const {user_dao} = require(resolve(__dirname, "..", "dao"));

co(function* () {
    const p = yield user_dao.checkExist({name : "afterloe"});
    console.log(p);
});
