/**
  * afterloe - cynomy_portal_server/test/userService_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 16:24:06
  */
"use strict";

const {resolve} = require("path"), co = require("co");
const {user_dao} = require(resolve(__dirname, "..", "dao"));
const userService = require(resolve(__dirname, "..", "services", "userService"));

const user_xlsx = resolve(process.env.HOME, "user.xlsx");
const users = userService.loaderFromXlsx(user_xlsx);

co(function* () {
  const p = yield userService.createUsers(users);
  console.log(p);
  user_dao.close();
}).catch(err => console.log(err));
