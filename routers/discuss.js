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
  {postDiscusses, readDiscusses, getDiscussesList},
  {throwLackParameters},
] = [
  require(resolve(services, "discussService")),
  require(resolve(__dirname, "..", "errors")),
];

function* receiveDiscuss(next) {
  if (this.error) {
    return yield next;
  }

  try {

    let user;
    try {
      user = yield this.getSession();
    } catch (err) {

    }

    const {mail, content} = this.request.body;
    if (!mail || !content) {
      throwLackParameters();
    }

    if (!user) {
      this.data = yield postDiscusses(content, {mail, name: "轶名"});
    } else {
      this.data = yield postDiscusses(content, user);
    }

  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* info(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {id} = this.params;
    const discuss = yield readDiscusses(id);
    this.data = discuss;
    this.pageName = "discussesInfo";
  } catch (error) {
    this.error = error;
  }
  return yield next;
}

function* list(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const {number, page} = this.params;
    const list = yield getDiscussesList(number, page);
    this.data = list;
    this.pageName = "discussesList";
  } catch (error) {
    this.error = error;
  }
  return yield next;
}

module.exports = {
  receiveDiscuss,
  list,
  info,
};
