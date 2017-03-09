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
  {getSystemNotice},
] = [
  require(resolve(services, "workflowService")),
  require(resolve(services, "noticeService")),
];


function* home(next) {
  this.pageName = "home";
  const announcement = yield getSystemNotice(10);
  const _ = {
    title: "JWI Portal",
    index: 1,
    systemNotice: null,
    systemAnnouncement: [
      {title: "官方说明", href:"/portal/workflow/58b003524836347c27fcd784", createTimestamp: 1487919369688},
      {title: "2017-3-2更新公告", href:"/portal/workflow/58b003524836347c27fcd784", createTimestamp: 1487919369688},
      {title: "2017-2-29更新公告", href:"/portal/workflow/58b003524836347c27fcd784", createTimestamp: 1487919369688},
      {title: "2016-12-21更新公告", href:"/portal/workflow/58b003524836347c27fcd784", createTimestamp: 1487919369688},
    ],
  };

  if (this.error) {
    delete this.error;
    this.data = _;
    return yield next;
  }

  const {mail, name} = this.authorized;

  Object.assign(_, {
    user: {mail},
    subscribe: [
    {
      title: name,
      items:[
        {title: "Market", href:"/portal/workflow/58b003524836347c27fcd784", createTimestamp: 1487919369688},
        {title: "Mate", href:"/portal/workflow/58b003584836347c27fcd78a", createTimestamp: 1487919329688},
      ]
    },
    {
      title: "TRU 平台",
      items:[
        {title: "Market", href:"/portal/workflow/58b003524836347c27fcd784", createTimestamp: 1487919369688},
        {title: "Mate", href:"/portal/workflow/58b003584836347c27fcd78a", createTimestamp: 1487919329688},
        {title: "Enterprise", href:"/portal/workflow/58b003444836347c27fcd77e", createTimestamp: 1487911369688}
      ]
    }, {
      title: "TRU 产品",
      items:[
        {title: "雨水项目 V1.0", href:"/portal/workflow/58b02e7cb275c088b24065f7", createTimestamp: 1487919359688},
        {title: "设计导引", href:"/portal/workflow/58b006b84836347c27fcd80b", createTimestamp: 1487913329688},
        {title: "PLM数据融合", href:"/portal/workflow/58b006394836347c27fcd7f3", createTimestamp: 1487911361688},
        {title: "销售选配", href:"/portal/workflow/58b006584836347c27fcd7ff", createTimestamp: 1487411361688},
        {title: "My Research V1.1", href:"/portal/workflow/58b02c78b275c088b24065e3", createTimestamp: 1487411391688},
      ]
    }, {
      title: "雨水项目",
      items:[
        {title: "当前节点 - 发布", href:"/portal/workflow/58b02e7cb275c088b24065f7", createTimestamp: 1487919359688},
        {title: "1.0发布.docx", href:"/fs/download/58b02e90b275c088b24065fd", createTimestamp: 1487919359688},
      ]
    }]
  });

  this.data = _;
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
