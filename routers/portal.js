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
  {workflowInfo, searchProduct},
  {getAnnouncementsList, getAnnouncementCount},
  {getDiscussesList, getDiscussesCount},
  {getSystemNotice},
  {findTags},
] = [
  require(resolve(services, "workflowService")),
  require(resolve(services, "announcementService")),
  require(resolve(services, "discussService")),
  require(resolve(services, "noticeService")),
  require(resolve(services, "tagsService")),
];

function* home(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {mail, name, tags} = this.authorized;

    const [
      announcements,
      discusses,
      discussCount,
      systemNotice,
      departments, // 拉取所有部门信息
    ] = yield [
      getAnnouncementsList(10),
      getDiscussesList(10),
      getDiscussesCount(),
      getSystemNotice(),
      findTags("部门"),
    ];

    const workflowInfo = {};
    for(let department of departments) {
      Object.assign(workflowInfo, {
        [department]: yield searchProduct(department),
      });
    }

    let workflowNums = 0;
    for (let key of workflowInfo) {
      workflowNum += workflowInfo[key].length;
    }

    const _ = {
      title: "JWI Portal",
      index: 1,
      systemNotice,
      chat: {workflowNums, workflowInfo},
      user: {mail, name},
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
