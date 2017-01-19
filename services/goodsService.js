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

const [{resolve}, {statSync, existsSync}] = [require("path"), require("fs")];
const [{goods_dao, workFlow_instance_dao}, {throwNotExistsFile, throwParametersError, throwNosuchThisWorkFlow, throwCfgFormatMismatch, throwLackParameters},
  {checkParameter, readyConfig}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities"))];

const buildGoods = (_goods, workflow, name, index) => {
  const lackParameter = checkParameter(_goods, "name", "path", "version", "author");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  const _ = {
    workflow, name, index,
    tags : [],
    state: 200,
    downCount: 0,
  };

  Object.assign(_, _goods);
  return _;
};

function* instanceGoodses(_, {workflow, name, index}) {
  for(let i = 0; i < _.length; i++) {
    _[i] = buildGoods(_[i], workflow, name, index);
  }
  yield goods_dao.insertMany(_);
}

function* production(_temp) {
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
        nodeList[i].produceList = yield instanceGoodses(productionList[nodeName], nodeList[i]);
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
