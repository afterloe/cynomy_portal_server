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
const [{goods_dao, workFlow_node_instance_dao, workFlow_instance_dao}, {throwNotExistsFile, throwParametersError, throwNosuchThisWorkFlow, throwCfgFormatMismatch, throwLackParameters},
  {checkParameter, readyConfig}, {uploadNodeProduceList}] = [require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")),
  require(resolve(__dirname, "..", "tools", "utilities")), require(resolve(__dirname, "workflowService"))];

const buildGoods = (_goods, workflow, name, _id) => {
  const lackParameter = checkParameter(_goods, "name", "path", "version", "author");
  if (lackParameter) {
    throwLackParameters(lackParameter);
  }
  const _ = {
    workflow, name, _id,
    tags : [],
    state: 200,
    downCount: 0,
  };

  Object.assign(_, _goods);
  return _;
};

const buildGoodses = (_goodses, {workflow, name, _id}) => {
  for (let i = 0; i < _goodses.length; i++) {
    _goodses[i] = buildGoods(_goodses[i], workflow, name, _id);
  }
};

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
  const _ = {};

  for(let nodeName in productionList) {
    for(let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].name === nodeName) {
        const nodeInstance = yield workFlow_node_instance_dao.queryById(nodeList[i]._id);
        let produceList = buildGoodses(productionList[nodeName], nodeInstance);
        yield uploadNodeProduceList(nodeList[i]._id, {
          produceList,
          reason: _cfg.reason
        });
      }
    }

    const {ops} = yield goods_dao.insertMany(productionList[nodeName]);
    _[nodeName] = ops;
  }

  return _;
}

function* cleanDocuments() {
  return yield goods_dao.clean();
}

function* getGoodsList(number, page) {
  return yield goods_dao.queryAll({}, number, page);
}

function* structureProduceList(tar) {
  console.log(tar);
  return [{
    "author": "产出人员",
    "name": "产出的文件名",
    "path": "下载地址",
    "createTimestamp": "产出时间",
    "downCount": "下载次数",
    "version": "版本"
  },{
    "author": "产出人员",
    "name": "产出的文件名",
    "path": "下载地址",
    "createTimestamp": "产出时间",
    "downCount": "下载次数",
    "version": "版本"
  },{
    "author": "产出人员",
    "name": "产出的文件名",
    "path": "下载地址",
    "createTimestamp": "产出时间",
    "downCount": "下载次数",
    "version": "版本"
  }];
}

module.exports = {
  cleanDocuments,
  production,
  getGoodsList,

  structureProduceList,
};
