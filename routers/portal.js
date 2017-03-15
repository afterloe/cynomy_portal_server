/**
  * afterloe - cynomy_portal_server/routers/portal.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-14 14:35:58
  */
"use strict";

const {resolve} = require("path");
const services = resolve(__dirname, "..", "services");
const [
  {workflowInfo},
  {getAnnouncementsList, getAnnouncementCount},
  {getDiscussesList, getDiscussesCount},
  {getSystemNotice},
] = [
  require(resolve(services, "workflowService")),
  require(resolve(services, "announcementService")),
  require(resolve(services, "discussService")),
  require(resolve(services, "noticeService")),
];


function* home(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {mail, name} = this.authorized;
    const [
      announcements,
      announcementsCount,
      discusses,
      discussCount,
      systemNotice,
    ] = yield [
      getAnnouncementsList(10),
      getAnnouncementCount(),
      getDiscussesList(10),
      getDiscussesCount(),
      getSystemNotice(),
    ];
    const _ = {
      title: "JWI Portal",
      index: 1,
      systemNotice ,
      user: {mail, name},
      systemAnnouncementNum: announcementsCount,
      systemAnnouncement: announcements.map(announcement => ({title: announcement.title, createTimestamp: announcement.createTimestamp, href:`/notice/${announcement._id}`})),
      discussCount,
      discuss: discusses.map(discuss => ({title: discuss.title, createTimestamp: discuss.createTimestamp, href: `/discuss/${discuss._id}`}))
    };


    this.data = _;
    this.pageName = "home";
  } catch (error) {
    this.error = error;
  }

  return yield next;
}

function* login(next) {
  if (this.error) {
    return yield next;
  }

  try {
    this.pageName = "login";
    this.data = {
      title: "JWI Portal login",
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* info(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {id} = this.params;
    const {name, createTimestamp, nodeList, status, owner, members} = yield workflowInfo(id);

    this.data = {
      title: `JWI Portal - ${name}`,
      index: 8,
      name,
      createTimestamp,
      status,
      owner,
      nodeList,
      members,
    };

    this.pageName = "workflowInfo";

  } catch (err) {
    this.error = err;
  }

  return yield next;
}

module.exports = {
  home,
  login,
  info,
};
