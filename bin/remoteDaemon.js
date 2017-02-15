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

const [{execFile}, {resolve}] = [require("child_process"), require("path")];

module.exports = (...args) => {
  const [host, port] = args;

  if (!host) {
    console.log("remote daemon thread can't connection this host, auto exit.");
    return ;
  }

  const wsCli = execFile(resolve(__dirname, "wsCli"), [host, port, "cynomy://"], (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    console.log(stdout.toString());

    if (stderr) {
      console.log("err");
      console.log(stderr.toString());
    }

  });


  setTimeout(() => {
    wsCli.send({
      act: "sendCynomyCommunication",
      msg: "i'm afterloe "
    });
  }, 1000 * 10);

  wsCli.on("message", msg => {
    if ("receiveCynomyCommunication" === msg.act) {
        console.log("%s:%s", "main process", msg.msg);
    }
  });
};
