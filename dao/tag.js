/**
  * afterloe - cynomy_portal_server/dao/tag.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 10:43:31
  */
"use strict";

const {resolve} = require("path");
const commonsLib = require(resolve(__dirname, "public"))();

const searchByTags = function* (keywords) {
  if (keywords instanceof Array) {
    return yield this.find({
      keyWord: {
        $all: keywords
      },
      state: 200,
    }, {
      name : 1,
      createTimestamp: 1,
    }).sort({createTimestamp: -1}).toArray();
  }

  return [];
};

const classMethod = {
  searchByTags,
};

Object.assign(commonsLib, classMethod);

const className = "tag";

module.exports = _ => _.definition({classMethod: commonsLib, className});
