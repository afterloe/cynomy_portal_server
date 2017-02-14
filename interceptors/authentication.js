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

module.exports = function* (next) {
  if (this.error) {
    return yield next;
  }
  try {
    const user = yield this.getSession();
    console.log(user);
  }catch(err) {
    this.error = err;
  }

  return yield next;
};
