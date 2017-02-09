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

sendPromise("lm6289511@gmail.com", "CES[Host] in this mail", `<div>
  <h1>Host is busy!</h1>
  <h3>services in 120.76.75.43 is running!</h3>
  <button>resolve</button> <button>reject</button>
</div>`).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
