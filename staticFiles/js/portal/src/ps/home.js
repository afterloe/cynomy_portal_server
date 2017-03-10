/**
  * afterloe - cynomy_portal_server/staticFiles/js/portal/src/ps/home.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-10 18:17:21
  */
"use strict";

const changeFrameHeight = () => {
  const ifm = document.getElementById("myiframe");
  ifm.height = window.screen.height;
};

window.onresize= () => changeFrameHeight();
