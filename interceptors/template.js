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
const [
  {get},
  {setPugTemplatePath, compileTemplate}
] = [
  require(resolve(__dirname, "..", "config")),
  require(resolve(__dirname, "..", "tools", "buildPage"))
];

const [VERSION, STATIC, NAVBAR] = [Symbol("VERSION"), Symbol("STATIC"), Symbol("NAVBAR")];
module[VERSION] = get("version");
module[STATIC] = get("sourceHost");

module[NAVBAR] = [
  {
    href: "/portal/home",
    name: "首页",
  },
  {
    href: "/portal/rd/home",
    name: "研发部",
    subNav: [
      {
        name : "TRU 平台",
        href : "/portal/rd/platform",
      },
      {
        name: "TRU 产品",
        href: "/portal/rd/product",
      }
    ],
  },
  {
    href: "/portal/ad/home",
    name: "自主交付部",
  },
  {
    href: "/portal/ps/home",
    name: "售前技术部",
  },
];

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
      systemVersion: module[VERSION],
    });

    this.fail = (msg = "system error", code = 500) => ({
      code: Number.parseFloat(code),
      error: msg,
      result: null,
      systemVersion: module[VERSION],
    });

  } else {
    this.way = "web";
    this.set("Content-Type", "text/html;charset=utf-8");
    this.set("systemVersion", module[VERSION]);

    this.render = (template, _) => {
      const defualt = {
        title: "",
        static: module[STATIC],
        cache: false,
        navbar: module[NAVBAR],
        systemVersion: module[VERSION],
      };
      Object.assign(defualt, _);
      __self.body = compileTemplate(template , defualt);
    };
  }

  return yield next;
};
