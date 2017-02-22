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

const [{resolve, basename, sep}, {statSync, existsSync}] = [require("path"), require("fs")];
const [{goods_dao, workFlow_node_instance_dao, workFlow_instance_dao}, {throwNotExistsFile, throwCfgFormatMismatch, throwBuildFailed,
throwParametersError, throwLackParameters}, {checkParameter, readyConfig}, {get}, {decompression, move}, {getTagsInfo}] = [
  require(resolve(__dirname, "..", "dao")), require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities")),
  require(resolve(__dirname, "..", "config")), require(resolve(__dirname, "fileSystem")), require(resolve(__dirname, "tagsService"))];

const buildGoods = (goods, workflowId, nodeName) => {
  const lackParameter = checkParameter(goods, "name", "path", "version", "author");
  if (lackParameter) {
    throwLackParameters("", lackParameter);
  }

  const _ = {
    workflow: workflowId,
    nodeName,
    uploadTime: Date.now(),
    tags : [],
    state: 200,
    downloadCount: 0,
  };

  Object.assign(_, goods);

  return _;
};

function* production(tmp, workflowId, nodeId, uuidCode) {
  if (!existsSync(tmp)) {
    throwNotExistsFile();
  }
  const stat = statSync(tmp);
  if (stat.isFile()) {
    throwParametersError();
  }

  const cfg = readyConfig(resolve(tmp, ".portal"));
  if (!cfg || !cfg.production) {
    throwCfgFormatMismatch();
  }

  const [workflow, nodeInstance] = yield [workFlow_instance_dao.queryById(workflowId), workFlow_node_instance_dao.queryById(nodeId)];

  if (!workflow || !nodeInstance) {
    throwParametersError();
  }

  const productionList = cfg.production;

  if (productionList instanceof Array) {
    for(let i = 0; i < productionList.length; i++) {
      productionList[i].path = uuidCode + sep + productionList[i].path;
      productionList[i] = buildGoods(productionList[i], workflowId._id, nodeInstance.name);
    }

    const _ = yield goods_dao.insertMany(productionList);
    if (productionList.length !== _.result.n) {
      throwBuildFailed();
    }
    yield move(resolve(tmp, "production"), resolve(get("staticDir"), uuidCode));
    return productionList;
  }

  throwParametersError();
}

function* cleanDocuments() {
  return yield goods_dao.clean();
}

function* getGoodsList(number, page) {
  return yield goods_dao.queryAll({}, number, page);
}

function* structureProduceList(path, workflowId, nodeId) {
  const tar = resolve(get("tmpDir"), path);
  const _ = yield decompression(tar);

  return yield production(_, workflowId, nodeId, basename(path));
}

function* exampleInfo(goodsId) {
  const _ = yield goods_dao.queryById(goodsId, 200);
  if (!_) {
    throwNotExistsFile();
  }

  const {name, _id, tags} = _;
  return {name, _id, tags};
}

function* setTags(goodsId, ...tagIds) {
  const goods = yield goods_dao.queryById(goodsId, 200);
  if (!goods) {
    throwNotExistsFile();
  }

  let _ = yield getTagsInfo.apply(this, tagIds); // 动态获取tag信息
  if (0 === _.length) {
    throwLackParameters();
  }

  const {tags} = goods;
  _ = [...new Set(tags.concat(_))];

  return yield goods_dao.update({
    _id: goods._id,
    upload: {
      $set: {
        tags: _,
      }
    }
  });
}

function* getGoodsInfo(goodsId) {
  const goods = yield goods_dao.queryById(goodsId, 200);
  if (!goods) {
    throwNotExistsFile();
  }

  const {name, path, type, size} = goods;
  return {name, path, type, size};
}

function* getPublicGoodsesList(...tags) {
  tags.unshift("public");
  const _ = yield goods_dao.searchByTags(tags);

  return _;
}

module.exports = {
  cleanDocuments,
  production,
  getGoodsList,

  structureProduceList,
  exampleInfo,
  setTags,
  getGoodsInfo,
  getPublicGoodsesList,
};
