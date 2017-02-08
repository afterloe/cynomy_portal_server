/**
  * afterloe - cynomy_portal_server/lib/initTar.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-8 10:10:41
  */
"use strict";

const [{resolve, basename, extname, sep}, {statSync, readdirSync, mkdirSync}, co] = [require("path"), require("fs"), require("co")];
const {uuidCode} = require(resolve(__dirname, "..", "tools", "utilities"));
const {cp, writeJSON, compression} = require(resolve(__dirname, "..", "services", "fileSystem"));

const [PWD, FILES, TARGET, CONFIGURATION, ITEMS] = [Symbol("PWD"), Symbol("FILES"), Symbol("TARGET"), Symbol("CONFIGURATION")];

/*
 * 读取执行命令下的 文件夹中的所有文件
 *
 */
const readdir = () => {
  module[ITEMS] = readdirSync(module[PWD]);

  for (let i = 0; i < module[ITEMS].length; i++) {
    const item = module[ITEMS][i];
    if (0 === basename(item).indexOf(".")) {
      continue;
    }
    const filePath = resolve(module[PWD], item);
    const _stat = statSync(filePath);
    if (_stat.isDirectory()) {
      continue;
    }

    module[FILES].push(filePath);
  }
};

/*
 * 创建 production 文件夹
 */
const mkProduction = () => {
  const _production = module[ITEMS].find(item => "production" === item);
  if (_production) {
    const _stat = statSync(resolve(module[PWD], _production));
    if (_stat.isFile()) {
      mkdirSync(resolve(module[PWD], "production"));
    }
  } else {
    mkdirSync(resolve(module[PWD], "production"));
  }
  module[TARGET] = resolve(module[PWD], "production");
};

/*
 * 移动 用户数据文件目录 到 文件夹下
 */
const moveFile = () => {
  const tasks = [];
  for (let i = 0; i < module[FILES].length; i++) {
    const file = module[FILES][i];
    tasks.push(cp(file, module[TARGET]));
  }
  return tasks;
};

/*
 * 编写配置文件
 */
const writeConfigFile = (version) => {
  module[CONFIGURATION] = {};
  const files = [];
  for (let i = 0; i < module[FILES].length; i++) {
   const file = module[FILES][i];
   const fileName = basename(file);
   const relative = ["production", fileName];
   files.push({
     name: fileName,
     type: extname(file),
     path: relative.join(sep),
     version,
     author: {
       name: "作者名字",
       mail: "作者邮箱",
     }
   });
  }
  Object.assign(module[CONFIGURATION], {
    production: files,
  });
  return resolve(module[PWD], ".portal");
};

module.exports = (path, {build, version}) => {
  module[PWD] = path || process.env.PWD; // 获取当前运行目录
  module[FILES] = []; // 设置全局变量，用户数据文件目录
  module[ITEMS] = []; // 运行目录下的所有文件

  co(function* (){
    readdir();
    console.log("%s [SUCCESS] scane %s. ", new Date(), module[PWD]);
    mkProduction();
    console.log("%s [SUCCESS] mkdir ./production ", new Date());
    const tasks = moveFile();
    yield Promise.all(tasks);
    console.log("%s [SUCCESS] copy all file to ./production ", new Date());
    if (!version || version instanceof Function) {
       version = new Date().toLocaleString();
    }
    const configFilePath = writeConfigFile(version);
    yield writeJSON(module[CONFIGURATION], configFilePath);
    console.log("%s [SUCCESS] write .portal. ", new Date());
    module[CONFIGURATION] = null;
    console.log("%s [SUCCESS] data is ready. ", new Date());
    if (build) {
      console.log("%s begin compressed file, good luck!", new Date());
      const tarPath = yield compression(uuidCode(), module[PWD], ".portal", "production");
      console.log("%s [SUCCESS] compressed files. in %s", new Date(), tarPath);
    }
  }).then(() => {
    console.log("%s [SUCCESS] init data tar. ", new Date());
  }).catch(err => {
    console.log("%s [FAILED]", new Date());
    console.log(err.message);
  });
};
