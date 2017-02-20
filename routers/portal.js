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
const {searchProduct, workflowInfo} = require(resolve(__dirname, "..", "services", "workflowService"));

function* login(next) {
  if (this.error) {
    return yield next;
  }

  try {
    this.pageName = "login";
    this.data = {
      title: "R&D Portal login",
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
      title: "R&D Portal",
      index: 1,
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

/**
 * 跳转 - 平台页
 *
 * @param  {Function}  next [koa context]
 * @return {Generator}      [next middleware]
 */
function* platform(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const [pcList, androidList] = yield [searchProduct("pc", "平台V1.0"), searchProduct("android", "平台V1.0")];
    let product = null;
    if (pcList.length > 0) {
      product = yield workflowInfo(pcList[0]._id);
    }
    this.pageName = "platform";
    this.data = {
      title: "R&D Portal - platform",
      index: 2,
      product,
      products: {
        pc: pcList,
        android: androidList
      },
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* product(next) {
  if (this.error) {
    return yield next;
  }
  try {
    this.pageName = "product";
    this.data = {
      title: "R&D Portal - product",
      index: 3,
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* directory(next) {
  if (this.error) {
    return yield next;
  }
  try {
    this.pageName = "directory";
    this.data = {
      title: "R&D Portal - directory",
      index: 4,
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

module.exports = {
  home,
  platform,
  login,
  product,
  directory,
};
