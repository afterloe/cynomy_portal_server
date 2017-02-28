/**
  * afterloe - cynomy_portal_server/dao/goods.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 15:31:42
  */
"use strict";

const {resolve} = require("path");
const {throwParametersError} = require(resolve(__dirname, "..", "errors"));
const commonsLib = require(resolve(__dirname, "public"))();

const searchByTags = function* (tags, number = 100, page = 0, order = "uploadTime") {
  if (tags instanceof Array) {
    page < 1 ? page = 0 : page--;
    return yield this.find({
      tags: {
        $all: tags
      },
      state: 200,
    }, {
      name : 1,
      downloadCount: 1,
      author:1,
      uploadTime: 1,
    }).sort({[order]: -1}).skip(number * page).limit(number).toArray();
  }

  return [];
};

const searchByWehouse = function* (wehouseId) {
  if (this.valid(wehouseId)) {
    wehouseId = this.newObjectId(wehouseId);
    const queryBody = {instanceNode: wehouseId, state: 200};
    return this.find(queryBody).sort({"uploadTime": -1}).toArray();
  }
  throwParametersError();
};

const classMethod = {
  searchByTags,
  searchByWehouse,
};

Object.assign(commonsLib, classMethod);

const className = "goods";

module.exports = _ => _.definition({classMethod: commonsLib, className});
