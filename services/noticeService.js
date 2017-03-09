/**
  * afterloe - cynomy_portal_server/services/noticeService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-9 15:34:54
  */
"use strict";

const {resolve} = require("path");
const [
  {notice_dao},
  {throwNosuchThisNotice}
] = [
  require(resolve(__dirname, "..", "dao")),
  require(resolve(__dirname, "..", "errors")),
];

const buildSystemNotice = notice => {
  const _ = {
    tags : [],
    state: 200,
    readCount: 0,
    createTimestamp: Date.now(),
  };
  Object.assign(_, notice);

  return _;
};

function* readySystemNotice(id) {
  const notice = yield notice_dao.queryById(id);

  if (!notice) {
    throwNosuchThisNotice();
  }

  yield notice_dao.update({
    _id: notice._id,
    upload: {
      $inc: {
        readCount: 1
      }
    }
  });

  return notice;
}

function* getSystemNoticeCount() {
  const count = yield notice_dao.count();
  return count ? count : 0;
}

function* postSystemNotice(title, content) {
  const notice = buildSystemNotice({title, content});
  return yield notice_dao.insert(notice);
}

function* getSystemNotice(number, page) {
  return yield notice_dao.queryAll({}, number, page);
}

module.exports = {
  getSystemNotice,
  getSystemNoticeCount,
  postSystemNotice,
  readySystemNotice,
};
