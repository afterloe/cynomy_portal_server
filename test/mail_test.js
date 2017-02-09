/**
  * afterloe - cynomy_portal_server/test/mail_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-9 09:46:27
  */
"use strict";

const {resolve} = require("path");
const {sendPromise} = require(resolve(__dirname, "..", "tools", "mailHelper"));

const {setPugTemplatePath, compileTemplate} = require(resolve(__dirname, "..", "tools", "buildPage"));

setPugTemplatePath(resolve(__dirname, "..", "template"));
const html = compileTemplate("pwdMail", {
  time: new Date().toLocaleString(),
  permit: "0a543e60eddc11e6b321c322b7ea7dc6",
});

sendPromise("lm6289511@gmail.com", "JW R&D Protal System", html).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
