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

const {resolve} = require("path");
const userService = require(resolve(__dirname, "..", "services", "userService"));

const user_xlsx = resolve(process.env.HOME, "user.xlsx");
const users = userService.loaderFromXlsx(user_xlsx);

console.log(users);
