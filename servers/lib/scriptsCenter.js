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

const {resolve} = require("path");
const services = resolve(__dirname, "..", "..", "services");
const {throwNoThisFunction, throwNoThisServer} = require(resolve(__dirname, "..", "..", "errors"));
const {memoryInfo, systemInfo} = require(resolve(services, "fileSystem"));

const SCRIPTS = new Map();

SCRIPTS.set("system", {
  memoryInfo,
  systemInfo,
});

const getScript = (scriptName, command) => {
  if (SCRIPTS.has(scriptName)) {
    const _ = SCRIPTS.get(scriptName);
    if (_[command]) {
      return _[command];
    }

    throwNoThisFunction();
  }
  throwNoThisServer();
};

module.exports = {
  getScript,
};
