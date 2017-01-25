/**
  * afterloe - cynomy_portal_server/services/cliService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-25 18:18:20
  */
"use strict";

const [{readdirSync, statSync}, {resolve}] = [require("fs"), require("path")];

const [FILES] = [Symbol("FILLES")];
const [, , source, outDir] = process.argv; // 获取传入的参数

if (!source) {
  console.log("[FAILED]: Lack parameter of source dir ...");
  return ;
}

if (!outDir) {
  console.log("[FAILED]: Lack parameter of outDir dir ...");
  return ;
}

module[FILES] = [];

const scanDir = path => {
  let stat = statSync(path);
  if (stat.isDirectory()) {
    let files = readdirSync(path);
    for (let i = 0; i < files.length; i++) {
      scanDir(resolve(path, files[i]));
    }
    files = undefined;
  } else {
    stat = undefined;
    return module[FILES].push(path);
  }
}

const start = Date.now();
console.log(scanDir(source));
console.log(module[FILES]);
console.log((Date.now() - start)/ 1000);
