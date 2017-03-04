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

    /**
     * 如果存在异常
     */
    if (equal(error)) {
      /**
       * 异常是 自定义异常 按照请求方式进行分发处理
       */
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
      /**
       * 异常是 系统异常 按照请求方式进行分发处理
       */
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
    /**
     * 如果存在数据对象的话就按照请求方式进行分发处理
     */
    if ("web" === this.way) {
      this.render(pageName, data);
    } else if ("json" === this.way) {
      this.body = this.success(data);
    }
  } else {
    /**
     * 如果都不存在 则返回404
     */
    if ("json" === this.way) {
        this.body = this.fail("no this request", 404);
    } else {
        this.render("404NotFound", {
          title: "404 not found!",
        });
    }
  }
};
