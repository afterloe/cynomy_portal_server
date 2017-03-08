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
  {getPublicGoodsesList},
  {searchProduct, workflowInfo},
  {findTags}
] = [
  require(resolve(services, "goodsService")),
  require(resolve(services, "workflowService")),
  require(resolve(services, "tagsService"))
];

const findWorkflowByTags = function* (equipment, tags, ...hooks) {
  const _ = {};
  for(let tag of tags) {
    const __ = [equipment, tag].concat(hooks);
    const result = yield searchProduct.apply(null, __);
    Object.assign(_, {
      [tag]: result
    });
  }
  return _;
};

const findActiveWorkflowExample = function* (data) {
  for (let equipment in data) {
    for(let list in data[equipment]) {
      if (data[equipment][list].length > 0) {
        return yield workflowInfo(data[equipment][list][0]._id);
      }
    }
  }
};

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

function* home(next) {
  if (this.error) {
    return yield next;
  }
  try {
    this.pageName = "home";
    this.data = {
      title: "JWI Portal",
      index: 1,
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
      title: "JWI Portal - info",
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
