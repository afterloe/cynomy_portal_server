/**
  * afterloe - cynomy_portal_server/routers/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 14:28:12
  */
"use strict";

const {resolve} = require("path");
const interceptors = resolve(__dirname, "..", "interceptors");
const [
  user,
  workflow,
  goodses,
  portal,
  rdPortal,
  adPortal,
  psPortal,
  node
] = [
  require(resolve(__dirname, "user")),
  require(resolve(__dirname, "workflow")),
  require(resolve(__dirname, "goodses")),
  require(resolve(__dirname, "portal")),
  require(resolve(__dirname, "rd-portal")),
  require(resolve(__dirname, "ad-portal")),
  require(resolve(__dirname, "ps-portal")),
  require(resolve(__dirname, "nodeManager")),
];

const [authentication] = [require(resolve(interceptors, "authentication"))];

module.exports = _ => {
  /*
   * 默认首页
   */
  _.get("/", authentication, portal.home); // 默认首页

  /*
   * 节点 模块
   */
  _.post("/node", node.registry);

  /*
   * portal 模块
   */
  _.get("/portal/login", portal.login); // *页面跳转 -> 登录页
  _.get("/portal/home", portal.home); // *页面跳转 -> 首页
  _.get("/portal/workflow/:id", authentication, portal.info); // *页面跳转 -> 工作流详情页

  /** 研发部 **/
  _.get("/portal/rd/home", authentication, rdPortal.home); // *页面跳转 -> 研发部首页
  _.get("/portal/rd/platform", authentication, rdPortal.platform); // *页面跳转 -> 研发部 平台
  _.get("/portal/rd/product", authentication, rdPortal.product); // *页面跳转 -> 产品
  _.get("/portal/rd/directory", authentication, rdPortal.directory); // *页面跳转 -> 产品

  /** 自主交付部 **/
  _.get("/portal/ad/home", authentication, adPortal.home); // *页面跳转 -> 自主交付部首页

  /** 售前技术部 **/
  _.get("/portal/ps/home", authentication, psPortal.home); // *页面跳转 -> 售前技术部部首页


  /*
   *  用户模块
   */
  _.get("/user/list", authentication, user.list); // 用户信息列表
  _.get("/user/:mail/forgetPassword", user.forgetPwd); // 登录申请
  _.post("/user/login", user.login); // 登录

  /*
   *  工作流模块
   */
  _.get("/workflow/list", authentication, workflow.list); // 工作流信息列表
  _.get("/workflow/:id", authentication, workflow.detail);// 工作流详细信息
  _.get("/workflow/:id/simple", authentication, workflow.simpleInfo); // 获取工作流实例简单信息
  _.get("/workflow/:nodeId/files", authentication, workflow.nodeFiles); // 获取工作流某实例下的文件列表
  _.get("/workflow/nodeInstance/:id", authentication, workflow.nodeInstance); // 获取工作流下实例节点信息

  _.get("/workflow/overviews/rd/platform", authentication, workflow.rdOverviewsPlatform); // 总览 - rd部门 平台预览
  _.get("/workflow/overviews/rd/product", authentication, workflow.rdOverviewsProduct);// 总览 - rd部门 产品预览
  _.get("/workflow/overviews/rd/directory", authentication, workflow.rdOverviewsDirectory); // 总览 - rd部门 公共目录预览

  /*
   *  文件系统模块
   */
  _.get("/fs/list", authentication, goodses.list); // 更新文件信息列表
  _.get("/fs/download/:id", authentication, goodses.download); // 文件下载
  _.post("/fs/update/:nodeId", authentication, goodses.updateNode); // 节点更新

  /*
   *  测试：开发者信息
   */
  _.post("/test/echo", function* (next) {
    const {info} = this.request.body;
    process.emit("sendCynomyCommunication", info);
    this.body = this.success("send success");
    return yield next;
  });
  _.post("/test/call", function* (next) {
    const {info} = this.request.body;
    process.emit("sendRemotesInfo", info);
    this.body = this.success("send " + info + "success");
    return yield next;
  });
  _.get("/author", function* (next) {
    this.body = JSON.stringify({
        name: "afterloe",
        mail: "lm6289511@gmail.com",
    });

    return yield next;
  });
};
