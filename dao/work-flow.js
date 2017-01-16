/**
  * afterloe - cynomy_portal_server/dao/work-flow.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 21:13:30
  */
"use strict";

function* insert(_workflow) {
  const {} = _workflow;
  return yield this.insertOne();
}

const classMethod = {
  insert,
};

const className = "workflow";

module.exports = _ => _.definition({classMethod, className});
