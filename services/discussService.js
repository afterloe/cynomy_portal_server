/**
  * afterloe - cynomy_portal_server/services/discussService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-9 16:05:34
  */
"use strict";

const {resolve} = require("path");

const [
  {discuss_dao},
  {throwNosuchThisNotice},
] = [
  require(resolve(__dirname, "..", "dao")),
  require(resolve(__dirname, "..", "errors")),
];

const buildDiscuss = notice => {
  const _ = {
    tags : [],
    state: 200,
    readCount: 0,
    createTimestamp: Date.now(),
  };
  Object.assign(_, notice);

  return _;
};

function* getDiscussesList(number, page) {
  return yield discuss_dao.queryAll({}, number, page);
}

function* getDiscussesCount() {
  const count = yield discuss_dao.count();
  return count ? count : 0;
}

function* postDiscusses(content, user, title) {
  if (!title) {
    title = content.length > 10 ? content.substr(0, 6) + "...": content;
  }
  const discuss = buildDiscuss({user, content, title});
  yield discuss_dao.insert(discuss);
  return discuss;
}

function* readDiscusses(id) {
  const discuss = yield discuss_dao.queryById(id);

  if (!discuss) {
    throwNosuchThisNotice();
  }

  yield discuss_dao.update({
    _id: discuss._id,
    upload: {
      $inc: {
        readCount: 1
      }
    }
  });

  return discuss;
}

module.exports = {
  getDiscussesList,
  getDiscussesCount,
  postDiscusses,
  readDiscusses,
};
