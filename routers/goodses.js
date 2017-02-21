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

const [{resolve}, {existsSync}] = [require("path"), require("fs")];
const services = resolve(__dirname, "..", "services");
const [{getGoodsList, getGoodsInfo}, {throwFileNotFind, createReadStream}, {getGoodsFileInfo}] = [require(resolve(services, "goodsService")), require(resolve(__dirname, "..", "errors")), require(resolve(services, "fileSystem"))];

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
    const goods = yield getGoodsInfo(id);
    const {fileName, mimeType, size, path} = yield getGoodsFileInfo(goods);

    this.res.setHeader("Content-disposition", `attachment;filename=${fileName};filename*=utf-8${fileName}`);
    this.res.setHeader("Content-type", mimeType);
    this.res.setHeader("Content-Length", Number(size).toString());
    this.body = createReadStream(path);
    // yield* appService.downLoadComplete(params, language);
  }catch(err) {
    this.error = err;
  }

  return yield next;
};

module.exports = {
  list,
  download,
};
