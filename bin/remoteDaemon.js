/**
  * afterloe - cynomy_portal_server/bin/remoteDaemon.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-2-15 15:38:59
  */
"use strict";

const [{fork}, {resolve}] = [require("child_process"), require("path")];

module.exports = (...args) => {
  const [host, port] = args;

  if (!host) {
    console.log("remote daemon thread can't connection this host, auto exit.");
    return ;
  }

  const wsCli = fork(resolve(__dirname, "wsCli"), [host, port, "cynomy://"]);

  wsCli.on("message", msg => {
    if ("receiveCynomyCommunication" === msg.act) {
        console.log("%s:%s", "main process", msg.msg);
    } else if ("readyCynomyCommunication" === msg.act) {
      wsCli.send({
        act: "sendCynomyCommunication",
        msg: "i'm afterloe "
      });
    }
  });
};
