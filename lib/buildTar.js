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

const [{statSync, readdirSync}, {resolve}, co] = [require("fs"), require("path"), require("co")];
const {throwParametersError, throwNotExistsFile} = require(resolve(__dirname, "..", "errors"));
const {uuidCode} = require(resolve(__dirname, "..", "tools", "utilities"));
const {readJSON, compression} = require(resolve(__dirname, "..", "services", "fileSystem"));

const PWD = Symbol("PWD");

const checkList = () => {
  const items = readdirSync(module[PWD]);
  const [configuration, productionList] = [items.find(item => ".portal" === item), items.find(item => "production" === item)];
  if (!configuration) {
    throwNotExistsFile("", "configuration file .portal is not here! please run env.portal init .");
  }

  if (!productionList) {
    throwNotExistsFile("", "configuration file .portal is not here! please run env.portal init .");
  }

  const [configurationStat, productionListStat] = [statSync(resolve(module[PWD], configuration)), statSync(resolve(module[PWD], productionList))];
  if (configurationStat.isDirectory()) {
    throwParametersError("", "configuration is a directory ! this mast be a file! please check .portal");
  }

  if (productionListStat.isFile()) {
    throwParametersError("", "production is a file ! this mast be a directory! please check production");
  }
};

function* checkConfigFile() {
  const config = yield readJSON(resolve(module[PWD], ".portal"));
  if (!config.production) {
    throwParametersError("", "this configuration had errors, please check .portal is satisfy JSON. or run env.portal init");
  }
}

module.exports = path => {
  module[PWD] = path || process.env.PWD; // 获取当前运行目录

  co(function* () {
    console.log("%s scane %s. ", new Date(), module[PWD]);
    checkList();
    console.log("[SUCCESS].");
    console.log("%s check configuration file. ", new Date());
    yield checkConfigFile();
    console.log("[SUCCESS].");
    console.log("%s compressed files ", new Date());
    const tarPath = yield compression(uuidCode(), module[PWD], ".portal", "production");
    console.log("[SUCCESS].");
    console.log("[SUCCESS] compressed files. in %s", tarPath);
  });
};
