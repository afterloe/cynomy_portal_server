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
const [{equal}, {compileTemplate}] = [require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "buildPage"))];

module.exports = function * (next) {
  if (this.status && 404 !== this.status) {
      return;
  }
  if (this.body) {
      return;
  }
  yield next;
  const error = this.error;
  if (error) {
    if (equal(error)) {
      if ("json" === this.way) {
          this.set("Content-Type", "application/json; charset=utf-8");
          this.body = this.fail(error.message, error.code);
      } else {
          this.set("Content-Type", "text/html; charset=utf-8");
          this.body = compileTemplate("journalError", {
            title: "oh no!",
            msg: error.message,
            code: error.code
          });
      }
    } else {
      if ("json" === this.way) {
          this.set("Content-Type", "application/json; charset=utf-8");
          this.body = this.fail();
      } else {
          this.set("Content-Type", "text/html; charset=utf-8");
          this.body = compileTemplate("systemError", {
            title: "system Error"
          });
      }
    }
  } else {
    if ("json" === this.way) {
        this.set("Content-Type", "application/json; charset=utf-8");
        this.body = this.fail("no this request", 404);
    } else {
        this.set("Content-Type", "text/html; charset=utf-8");
        this.body = compileTemplate("404NotFound", {
          title: "404 not found!",
        });
    }
  }
};
