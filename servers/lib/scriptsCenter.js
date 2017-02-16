/**
  * afterloe - cynomy_portal_server/servers/lib/scriptsCenter.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-2-16 17:06:34
  */
"use strict";

const getScript = (scriptName, arg) => {
  console.log("execute %s %s", scriptName, arg);
  return () => Promise.resolve(2);
};

module.exports = {
  getScript,
};
