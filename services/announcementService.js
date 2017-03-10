/**
  * afterloe - cynomy_portal_server/services/announcementService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-10 14:52:08
  */
"use strict";

const {resolve} = require("path");

const [
  {announcement_dao},
  {throwNosuchThisNotice}
] = [
  require(resolve(__dirname, "..", "dao")),
  require(resolve(__dirname, "..", "errors")),
];

const buildAnnouncement = notice => {
  const _ = {
    tags : [],
    state: 200,
    readCount: 0,
    createTimestamp: Date.now(),
  };
  Object.assign(_, notice);

  return _;
};

function* readyAnnouncement(id) {
  const notice = yield announcement_dao.queryById(id);

  if (!notice) {
    throwNosuchThisNotice();
  }

  yield announcement_dao.update({
    _id: notice._id,
    upload: {
      $inc: {
        readCount: 1
      }
    }
  });

  return notice;
}

function* getAnnouncementCount() {
  const count = yield announcement_dao.count();
  return count ? count : 0;
}

function* postAnnouncement(title, content) {
  const notice = buildAnnouncement({title, content});
  return yield announcement_dao.insert(notice);
}

function* getAnnouncementsList(number, page) {
  return yield announcement_dao.queryAll({}, number, page);
}

module.exports = {
  getAnnouncementCount,
  getAnnouncementsList,
  postAnnouncement,
  readyAnnouncement,
};
