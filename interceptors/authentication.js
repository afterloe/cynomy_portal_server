/**
  * afterloe - cynomy_portal_server/interceptors/authentication.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-14 14:40:02
  */
"use strict";

const {resolve} = require("path");
const {throwNeedSignIn} = require(resolve(__dirname, "..", "errors"));

module.exports = function* (next) {
  if (this.error) {
    return yield next;
  }
  try {
    const user = yield this.getSession();
    if (!user) {
      throwNeedSignIn(this.language);
    }
    this.authorized = user;
  }catch(err) {
    this.error = err;
  }

  return yield next;
};
