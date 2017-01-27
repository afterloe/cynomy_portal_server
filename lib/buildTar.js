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

const tar = path => new Promise((solve, reject) => {
  const [cwd, relative] = [resolve(path, ".."), basename(path)];
  const tarCZVF = spawn("tar", ["czvf",  `${relative}.tar.gz`, `./${relative}`], {
    cwd: cwd
  });

  tarCZVF.stdout.on("data", chunk => console.log(`[SUCCESS] ${chunk}`));
  tarCZVF.on("error", err => reject(err));
  tarCZVF.on("close", code => {
    if (0 !== code) {
      reject("[FAILED] 压缩tar失败");
      return ;
    }
    console.log("[SUCCESS] tar %s done.", path);
    solve(resolve(cwd, `${relative}.tar.gz`));
  });
});

module.exports = (path, options) => {
  if (module[FILES].length !== 0) {
    console.log("Services is busy");
    return ;
  }
  if (!existsSync(path)) {
    console.log("this tar of path is not exists");
    return ;
  }
  console.log(options);
  scanDir(path); // 扫描文件夹
  console.log("[SUCCESS] scan %s files in this path, this will be compress in a tar.", module[FILES].length);
  const flag = module[FILES].find(f => resolve(path, ".portal") === f);
  if (!flag) {
    console.log("%s is not exists! please check dir complete.", flag);
    module[FILES] = [];
    return ;
  }

  tar(path).then(data => console.log(data)).catch(err => console.log(err));
};
