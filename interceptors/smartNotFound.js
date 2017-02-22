/**
  * afterloe - cynomy_portal_server/interceptors/smartNotFound.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-9 18:01:34
  */
"use strict";

const {resolve} = require("path");
const {equal} = require(resolve(__dirname, "..", "errors"));

module.exports = function * (next) {
  if (this.status && 404 !== this.status) {
      return;
  }
  if (this.body) {
      return;
  }

  yield next;
  const {error, pageName, data} = this;

  if (error) {
    /**
     * 出现401.5 直接跳转 登录页
     */
    if("401.5" === error.code) {
      if ("json" === this.way) {
        this.body = this.fail(error.message, error.code);
      } else {
        this.status = 302;
        this.set("Location", "/portal/login");
      }
      return ;
    }

    console.log(error);
    if (equal(error)) {
      if ("json" === this.way) {
          this.body = this.fail(error.message, error.code);
      } else {
          this.render("journalError", {
            title: "oh no!",
            msg: error.message,
            code: error.code
          });
      }
    } else {
      if ("json" === this.way) {
          this.body = this.fail();
      } else {
          process.emit("systemError", error);
          this.render("systemError", {
            title: "system Error"
          });
      }
    }
  } else if (pageName || data) {
    if ("web" === this.way) {
      this.render(pageName, data);
    } else if ("json" === this.way) {
      this.body = this.success(data);
    }
  } else {
    if ("json" === this.way) {
        this.body = this.fail("no this request", 404);
    } else {
        this.render("404NotFound", {
          title: "404 not found!",
        });
    }
  }
};
