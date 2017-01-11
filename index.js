/**
  * afterloe - cynomy_portal_server/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 13:49:00
  */
"use strict";

const [{createServer}, {fork}, {resolve}, cluster] = [require("net"), require("child_process"), require("path"), require("cluster")];
const {get} = require(resolve(__dirname, "config"));

const [threadManager, slavePath ,bindHost, registryPort, {enable, slaveNum = 1}] = [new Map(), resolve(__dirname, "distributed","slave"), get("bindHost"), get("registryPort"), get("distributed")];

const startSlave = socket => {
  const worker = fork(slavePath);
  const {pid} = worker;

  worker.on("message", msg => {
    if ("suicide" === msg.act) {
        startSlave(socket);
    }
  });

  worker.on("exit", () => {
    threadManager.has(pid) ? threadManager.delete(pid) : null;
    startSlave(socket);
  });
  worker.send("start-up", socket);
  threadManager.set(pid, worker);
};

if (enable) {
  cluster.schedulingPolicy = cluster.SCHED_RR; // 启用轮叫调度策略
  const server = createServer();
  server.listen(registryPort, bindHost, () => {
    console.log("TCP net socket is runnig in %s:%s", bindHost, registryPort);
    for (let i = 0; i < slaveNum; i++) {
      startSlave(server);
    }
  });
} else {
  // 单进程
  console.log("sing thread runner");
}

process.on("exit", () => {
  for (let worker of threadManager.values()) {
      worker.kill();
  }

  threadManager.clear();
  console.log("server will shut down safely");
});

process.on('uncaughtException', err => {
  console.log(`${new Date().toLocaleString()} catch express :
    ${err.message}
    ${err.stack}
  `);
});
