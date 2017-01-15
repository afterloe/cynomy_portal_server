/**
  * afterloe - cynomy_portal_server/routers/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 14:28:12
  */
"use strict";

module.exports = _ => {
  _.get("/test", function* (next) {
    this.render("index", {
      title: "首页",
      static: "http://almcloud.jwis.cn/",
    });

    return yield next;
  });

  _.get("/author", function* (next) {
    this.body = JSON.stringify({
        name: "afterloe",
        mail: "lm6289511@gmail.com",
    });

    return yield next;
  });
};
