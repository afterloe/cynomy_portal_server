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
const {searchProduct} = require(resolve(__dirname, "..", "services", "workflowService"));

function* login(next) {
  if (this.error) {
    return yield next;
  }

  try {
    if ("web" === this.way) {
      this.render("login", {
        title: "R&D Portal login",
      });
    }
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
    if ("web" === this.way) {
      this.render("home", {
        title: "R&D Portal",
        index: 1,
      });
    }
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
    const _ = {
      title: "R&D Portal - platform",
      index: 2,
      products: {
        pc: pcList,
        android: androidList
      },
    };
    if ("web" === this.way) {
      this.render("platform", _);
    } else if ("json" === this.way) {
      this.body = this.success(_);
    }
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
    if ("web" === this.way) {
      this.render("product", {
        title: "R&D product",
        index: 3,
      });
    }
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
    if ("web" === this.way) {
      this.render("directory", {
        title: "R&D directory",
        index: 4,
      });
    }
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
