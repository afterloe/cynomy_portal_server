/**
  * afterloe - cynomy_portal_server/lib/buildTar.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-25 21:09:59
  */
"use strict";

const [{resolve, basename}, {readdirSync, statSync, existsSync}, {spawn}] = [require("path"), require("fs"), require("child_process")];
const [{checkParameter}] = [require(resolve(__dirname, "..", "tools", "utilities"))];
const [FILES] = [Symbol("FILES")];
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
};

module.exports = (path, options) => {
  if (module[FILES].length !== 0) {
    console.log("Services is busy");
    return ;
  }
  if (!existsSync(path)) {
    console.log("this tar of path is not exists");
    return ;
  }

  scanDir(path); // 扫描文件夹
  console.log("[SUCCESS] scan %s files in this path, this will be compress in a tar.", module[FILES].length);
  const flag = checkParameter(module[FILES], ".portal"); // 检测文件是否存在
  if (flag) {
    console.log("%s is not exists! please check dir complete.", flag);
    module[FILES] = [];
  }

  // tar -czf test.tar.gz test
  const tar = spawn("tar", ["czf", basename(path), basename]);

  tar.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
  });

  tar.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  tar.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  module[FILES] = [];
};
