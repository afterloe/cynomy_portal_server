/**
  * afterloe - cynomy_portal_server/services/goodsService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-18 17:49:35
  */
"use strict";

const [{resolve}, {statSync, existsSync, readdirSync}] = [require("path"), require("fs")];
const [{goods_dao}, {throwNotExistsFile, throwParametersError, throwServerIsBusy, throwLackParameters}, {checkParameter}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];
const FILES = Symbol("FILES");
module[FILES] = [];

const buildGoods = _goods => {
  const lackParameter = checkParameter(_goods, "name", "path", "version", "author");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  const _ = {
    tags : [],
    state: 200,
    downCount: 0,
  };

  Object.assign(_, _goods);
  return _;
};

const scanDir = _path => {
  let stat = statSync(_path);
  if (stat.isDirectory()) {
    let files = readdirSync(_path);
    for (let i = 0; i < files.length; i++) {
      scanDir(resolve(_path, files[i]));
    }
    files = undefined;
  }
  stat = undefined;
  return module[FILES].push(_path);
};

function* instanceGoodses() {
  const _ = [];
  for(let i = 0; i < module[FILES].length; i++) {
    const _goods = module[FILES][i];
    const flag = yield goods_dao.checkExist(_goods);
    if (true === flag) {
      continue;
    }
    _.push(buildGoods(_goods));
  }
  if (0 === _.length) {
    throwParametersError("", "length = 0");
  }
  yield goods_dao.insertMany(_);
  module[FILES] = [];
}

function* instanceGoods(_goods) {
  const flag = yield goods_dao.checkExist(_goods);
  if (flag) {
    return ;
  }

  return yield goods_dao.insert(buildGoods(_goods));
}

function* production(_) { // 缺少产出人员 版本信息 path路径
  if (!existsSync(_)) {
    throwNotExistsFile();
  }
  const stat = statSync(_);
  if (stat.isDirectory()) {
    if (module[FILES].length > 0) {
      throwServerIsBusy();
      return ;
    }
    scanDir(_);
    yield instanceGoodses();
  }
  return yield instanceGoods(_);
}

module.exports = {
  production,
};
