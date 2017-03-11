/**
  * afterloe - cynomy_portal_server/routers/announcement.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-9 22:06:07
  */
"use strict";

const {resolve} = require("path");

const services = resolve(__dirname, "..", "services");

const [
  {readyAnnouncement, getAnnouncementsList},
] = [
  require(resolve(services, "announcementService")),
];

function* info(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {id} = this.params;
    const announcement = yield readyAnnouncement(id);
    this.data = {
      title : announcement.title,
      announcement,
    };
    this.pageName = "noticeInfo";
  } catch (error) {
    this.error = error;
  }
  return yield next;
}

function* list(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {number, page} = this.params;
    const list = yield getAnnouncementsList(number, page);
    this.data = {
      title: "Portal Server - Announcements",
      list,
    };
    this.pageName = "noticeList";
  } catch (error) {
    this.error = error;
  }
  return yield next;
}

module.exports = {
  list,
  info,
};
