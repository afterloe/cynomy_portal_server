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
const [{goods_dao, workFlow_instance_dao}, {throwNotExistsFile, throwParametersError, throwNosuchThisWorkFlow, throwCfgFormatMismatch, throwLackParameters},
  {checkParameter, readyConfig}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];
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

function* production(_temp) { // 缺少产出人员 版本信息 path路径
  /*
   * 1.读取websocket 接收的tar包并解压后的文件夹目录 [参数]
   * 2.扫描解压包后的内容,查询配置文件。
   * 3.通过配置文件获取本次产出对应的工作流实例和工作流节点实例。
   * 3.通过配置文件获取本次产出对应的文件的版本和作者。
   * 4.生成存储路径和下载路径 - 为了存储方便，存储路径和下载路径除了文件头其他都一样。
   * 5.移动文件到静态资源服务器。
   * 6.记录产出到数据库。
   */
  if (!existsSync(_temp)) {
    throwNotExistsFile();
  }
  const stat = statSync(_temp);
  if (stat.isFile()) {
    throwParametersError();
  }
  const _cfg = readyConfig(resolve(_temp, ".portal"));
  if (!_cfg.name || !_cfg.production) {
    throwCfgFormatMismatch();
  }
  const workflow = yield workFlow_instance_dao.queryByName(_cfg.name);
  if (!workflow) {
    throwNosuchThisWorkFlow();
  }
  const productionList = _cfg.production;
  const nodeList = workflow.nodeList;
  for(let nodeName in productionList) {
    for(let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].name === nodeName) {
        nodeList[i].produceList = yield instanceGoodses(productionList[nodeName]);
        nodeList[i].uploadCount = nodeList[i].uploadCount + 1;
      }
    }
  }
  const status = nodeList[workflow.status.index];
  yield workFlow_instance_dao.update({
    _id: workflow._id,
    upload: {
      $set: {
        nodeList,
        status,
      }
    }
  });
}

module.exports = {
  production,
};
