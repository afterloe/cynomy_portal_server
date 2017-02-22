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
const [{get}, {setPugTemplatePath, compileTemplate}] = [require(resolve(__dirname, "..", "config")), require(resolve(__dirname, "..", "tools", "buildPage"))];

const defualt = {
  title: "",
  static: get("sourceHost"),
};

module.exports = function* (next) {
  setPugTemplatePath(resolve(__dirname, "..", "template"));
  const [{accept = "web"}, __self] = [this.request.header, this];
  if ("application/json" === accept) {
    this.way = "json";
    this.set("Content-Type", "application/json;charset=utf-8");

    this.success = ctx => ({
      code: 200,
      error: null,
      result: ctx,
    });

    this.fail = (msg = "System error", code = 500) => ({
      code: Number.parseInt(code),
      error: msg,
      result: null,
    });

  } else {
    this.way = "web";
    this.set("Content-Type", "text/html;charset=utf-8");

    this.render = (template, _) => {
      const _default = defualt;
      Object.assign(_default, _);
      __self.body = compileTemplate(template , _default);
    };
  }

  return yield next;
};
