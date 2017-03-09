/**
  * afterloe - cynomy_portal_server/routers/discuss.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-9 16:30:29
  */
"use strict";

const {resolve} = require("path");

const services = resolve(__dirname, "..", "services");
const [

] = [

];

function* receiveDiscuss(next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {mail, content} = this.request.body;
    if (!mail || !content) {
      throwLackParameters();
    }
    this.data = {mail, content};
    
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

module.exports = {
  receiveDiscuss,
};
