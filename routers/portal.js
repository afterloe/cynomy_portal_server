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
] = [
  require(resolve(services, "workflowService")),
];


function* home(next) {
  if (this.error) {
    return yield next;
  }

  this.pageName = "home";
  const _ = {
    title: "JWI Portal",
    index: 1,
  };
  try {
    const user = yield this.getSession();

  } catch (err) {
    this.error = err;
  }

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
