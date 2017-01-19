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

const {basename, extname} = require("path"), {statSync, readdirSync} = require("fs"), {resolve} = require("path");
console.log(basename("/home/afterloe/index.pug", ".pug"));
console.log(extname("/home/afterloe/index.pug"));

const _ = [];

function scanDir(_path) {
  let stat = statSync(_path);
  if (stat.isDirectory()) {
    let files = readdirSync(_path);
    for (let i = 0; i < files.length; i++) {
      scanDir(resolve(_path, files[i]));
    }
    files = undefined;
  }
  stat = undefined;
  return _.push(_path);
}
const start = Date.now();
console.log(scanDir("/usr"));
// 180871
// 10.78
//
console.log(_.length);
console.log((Date.now() - start)/ 1000);
