/**
  * afterloe - cynomy_portal_server/test/workFlow_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:29:12
  */
"use strict";

const {resolve} = require("path");
const {workFlowDao} = require(resolve(__dirname, "..", "dao"));

workFlowDao.insert().then(data => console.log(data)).catch(err => console.log(err));
