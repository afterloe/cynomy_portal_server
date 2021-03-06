/**
  * afterloe - cynomy_portal_server/servers/lib/servicesCenter.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-12 16:33:53
  */
"use strict";

const {resolve} = require("path");
const {throwNoThisFunction, throwNoThisServer, throwOperationFailed} = require(resolve(__dirname, "..", "..", "errors"));
const services = resolve(resolve(__dirname, "..", "..", "services"));

const [
  workflowService,
  userService,
  goodsService,
  tagsService,
  {systemInfo, hardDiskInfo, memoryInfo},
  {postSystemNotice, cleanNotice},
  {postAnnouncement},
] = [
  require(resolve(services, "workflowService")),
  require(resolve(services, "userService")),
  require(resolve(services, "goodsService")),
  require(resolve(services, "tagsService")),
  require(resolve(services, "fileSystem")),
  require(resolve(services, "noticeService")),
  require(resolve(services, "announcementService")),
];

const REFISTRY = Symbol("REFISTRY");
module[REFISTRY] = new Map();

module[REFISTRY].set("workflowService", workflowService);
module[REFISTRY].set("userService", userService);
module[REFISTRY].set("goodsService", goodsService);
module[REFISTRY].set("tagsService", tagsService);
module[REFISTRY].set("systemService", {
  systemInfo, hardDiskInfo, memoryInfo, cleanNotice,
  shutDownSystem: function* () {
    if (process.send) {
      process.send({act: "SHUTDOWN"});
    } else {
      process.exit(0);
    }
  },
  postSystemNotice: function* (content, timeout) {
    content = new Buffer(content, "base64").toString("utf8");
    return yield* postSystemNotice(content, timeout);
  },
  postAnnouncement: function* (title, content) {
    title = new Buffer(title, "base64").toString("utf8");
    content = new Buffer(content, "base64").toString("utf8");
    return yield* postAnnouncement(title, content);
  }
});

/**
 * 获取执行方法
 *
 * @param  {[type]} serviceName [description]
 * @param  {[type]} funcName    [description]
 * @param  {[type]} user        [description]
 * @return {[type]}             [description]
 */
const getService = (serviceName, funcName, user) => {
  if (!user) {
    throwOperationFailed();
  }

  const service = module[REFISTRY].get(serviceName);
  if (!service) {
    throwNoThisServer();
  }

  if (!service[funcName]) {
    throwNoThisFunction();
  }

  return service[funcName];
};

module.exports = {
  getService,
};
