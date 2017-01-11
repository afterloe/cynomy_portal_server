/**
  * afterloe - cynomy_portal_server/test/funTest.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 23:01:15
  */
"use strict";

const {basename, extname} = require("path");

console.log(basename("/home/afterloe/index.pug", ".pug"));
console.log(extname("/home/afterloe/index.pug"));
