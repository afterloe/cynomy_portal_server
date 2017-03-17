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

// const [{createServer}, {fork}, {resolve}, cluster] = [require("net"), require("child_process"), require("path"), require("cluster")];
const [{createServer}, {fork}, {resolve}] = [require("net"), require("child_process"), require("path")];
const {get} = require(resolve(__dirname, "config"));
const [threadManager, slavePath ,bindHost, registryPort, {enable, slaveNum = 1}, remote] = [new Map(), resolve(__dirname, "distributed","slave"), get("bindHost"), get("registryPort"), get("distributed"), get("remote")];

const startSlave = socket => {
  const worker = fork(slavePath);
  const {pid} = worker;

  worker.on("message", msg => {
    const {act} = msg;
    if ("suicide" === act) {
      startSlave(socket);
    } else if ("SHUTDOWN" === act) {
      process.exit(0);
    }
  });

  worker.on("exit", () => {
    threadManager.has(pid) ? threadManager.delete(pid) : null;
    startSlave(socket);
  });

  worker.send({act: "start-up"}, socket);
  threadManager.set(pid, worker);
};

if (true === remote.enable) {
  require(resolve(__dirname, "bin", "remoteDaemon"))(remote.host, remote.port);
}

if (enable) {
  console.log("portal server engine use cluster module, %s threads will startup", slaveNum);
  // cluster.schedulingPolicy = cluster.SCHED_RR; // 启用轮叫调度策略 - 不启用轮叫调度模式
  const server = createServer();
  server.listen(registryPort, bindHost, () => {
    console.log("TCP net socket is runnig in %s:%s", bindHost, registryPort);
    for (let i = 0; i < slaveNum; i++) {
      startSlave(server);
    }
  });
} else {
  console.log("portal server engine use sing thread module");
  require(resolve(__dirname, "distributed", "single"));
}

process.on("exit", () => {
  for (let worker of threadManager.values()) {
      worker.kill();
  }

  threadManager.clear();
  console.log("server will shut down safely");
});

process.on('uncaughtException', err => {
  console.log(`[${new Date().toLocaleString()}] catch express :
    ${err.message}
  `);
});
