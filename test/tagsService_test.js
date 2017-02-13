/**
  * afterloe - cynomy_portal_server/test/tagsService_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-13 17:58:05
  */
"use strict";

const {resolve} = require("path");
const co = require("co");

const tagsService = require(resolve(__dirname, "..", "services", "tagsService"));

co(function* () {
  const tags = yield tagsService.getTagsInfo("589d738d5d17a1750e6131e5", "589d72865d17a1750e6131e4");
  console.log(tags);
});
