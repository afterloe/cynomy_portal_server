/**
  * afterloe - cynomy_portal_server/routers/goodses.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-2 16:14:52
  */
"use strict";

const [{resolve, join}, {createReadStream, createWriteStream}, parse] = [require("path"), require(("fs")), require("co-busboy")];
const services = resolve(__dirname, "..", "services");
const [
  {getGoodsList, getGoodsDetailed, increaseCount, checkGoodsExist, createGoods, getGoodesHouseAddress},
  {getGoodsFileInfo},
  {getWorkflowNode, updateNodeProduceFile, obmitUploadFileAuthorize},
  {throwLackParameters}
] = [
  require(resolve(services, "goodsService")),
  require(resolve(services, "fileSystem")),
  require(resolve(services, "workflowService")),
  require(resolve(__dirname, "..", "errors"))
];

const list = function* (next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {number, page} = this.params;
    this.data = yield getGoodsList(number, page);
  }catch(err) {
    this.error = err;
  }

  return yield next;
};

const download = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {id} = this.params;
    const goods = yield getGoodsDetailed(id);
    const {fileName, mimeType, size, path} = yield getGoodsFileInfo(goods);
    this.res.setHeader("Content-disposition", `attachment;filename=${fileName};filename*=utf-8${fileName}`);
    this.res.setHeader("Content-type", mimeType);
    this.res.setHeader("Content-Length", Number(size).toString());
    this.body = createReadStream(path);
    yield increaseCount(id);
    goods.downloadCount += 1;
    yield updateNodeProduceFile(goods.instanceNode, goods);
  }catch(err) {
    this.error = err;
  }

  return yield next;
};

const updateNode = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const [fields, workflowNodeId, authorized] = [parse(this.req), this.params.nodeId, this.authorized];
    const _ = yield getWorkflowNode(workflowNodeId);
    yield obmitUploadFileAuthorize(_.workflow, authorized);

    if (!_) {
      throwLackParameters();
    }

    const field = yield fields;

    if (Array.isArray(field)) {
      throwLackParameters();
    }

    let {filename, mimeType} = field;

    if (!filename) {
      throwLackParameters();
    }

    const address = getGoodesHouseAddress(_);
    const streamName = resolve(address, filename);
    checkGoodsExist(streamName);
    const lock = _._id.toString();
    const goods = yield createGoods(_, {
      fileName: filename,
      savePath: join(lock, filename),
      mimeType,
    }, authorized);
    field.pipe(createWriteStream(streamName));
    this.data = {goods};

  } catch (err) {
    this.error = err;
  }

  return yield next;
};

module.exports = {
  list,
  download,
  updateNode,
};
