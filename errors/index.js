/**
  * afterloe - cynomy_portal_server/errors/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 21:51:58
  */
"use strict";

const {resolve} = require("path");
const [mapper, TruError] = [require(resolve(__dirname, "i18nError")), require(resolve(__dirname, "truError"))];

Object.keys(mapper).map(m => {
  const funName = `throw${m}`;
  exports[funName] = (language, ...args) => {
    let msg = mapper[m][language] || mapper[m]["zh-CN"];
    msg += " " + args.join(" ");
    throw new TruError(msg, mapper[m].code);
  };
});

exports.equal = error => error instanceof TruError;
