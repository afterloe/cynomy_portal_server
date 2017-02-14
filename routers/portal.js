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
const goodsService = require(resolve(__dirname, "..", "services", "goodsService"));

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

const home = function* (next) {
  if (this.error) {
    return yield next;
  }
  try {
    if ("web" === this.way) {
      this.render("home", {
        title: "R&D Portal",
      });
    }
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

module.exports = {
  home,
  login
};
