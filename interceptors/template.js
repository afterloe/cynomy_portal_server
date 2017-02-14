/**
  * afterloe - cynomy_portal_server/interceptors/template.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-14 10:27:14
  */
"use strict";

const {resolve} = require("path");
const {get} = require(resolve(__dirname, "..", "config"));
const {setPugTemplatePath, compileTemplate} = require(resolve(__dirname, "..", "tools", "buildPage"));

module.exports = function* (next) {
  setPugTemplatePath(resolve(__dirname, "..", "template"));
  const [{accept = "web"}, __self] = [this.request.header, this];
  if ("application/json" === accept) {
    this.way = "json";
    this.set("Content-Type", "application/json; charset=utf-8");

    this.success = ctx => ({
      code: 200,
      error: null,
      result: ctx,
    });

    this.fail = (msg = "System error", code = 500) => ({
      code,
      error: msg,
      result: null,
    });

  } else {
    this.way = "web";
    this.set("Content-Type", "text/html; charset=utf-8");

    this.render = (template, _) => {
      Object.assign(_, {
        title: "",
        static: get("sourceHost"),
      });
      __self.body = compileTemplate(template , _);
    };
  }

  return yield next;
};
