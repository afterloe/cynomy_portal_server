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

const [{createServer}, {fork}, {resolve}, cluster, co] = [require("net"), require("child_process"), require("path"), require("cluster"), require("co")];
const {get} = require(resolve(__dirname, "config"));

const [threadManager, slavePath ,bindHost, registryPort, {enable, slaveNum = 1}, remote] = [new Map(), resolve(__dirname, "distributed","slave"), get("bindHost"), get("registryPort"), get("distributed"), get("remote")];

const NODELOCK = Symbol("lock");
module[NODELOCK] = {};

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

if (true === remote.enable) {
  require(resolve(__dirname, "bin", "remoteDaemon"))(remote.host, remote.port);

  // process.on("ws");
}

if (enable) {
  console.log("portal server engine use cluster module, %s threads will startup", slaveNum);
  cluster.schedulingPolicy = cluster.SCHED_RR; // 启用轮叫调度策略
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

process.on("hasLock", (lock, callback) => {
  const flag = module[NODELOCK][lock];
  if (callback && callback.apply) {
    callback(flag);
  }
});

process.on("tryObmitLock", (lock, genertaor, callback) => {
  module[NODELOCK][lock].push(genertaor);
  if (callback) {
    process.emit("unLock", lock);
  }
});

process.on("lock", (lock, callback) => {
  module[NODELOCK][lock] = [];
  if (callback && callback.apply) {
    callback();
  }
});

process.on("unLock", lock => {
  const tasks = module[NODELOCK][lock];
  if (tasks && tasks.length > 0) {
    let funs = tasks.shift();
    co(function*() {
      const value = yield funs;
      return value;
    }).then(() => {
      process.emit("unLock", lock);
    }).catch(err => {
      console.log(err);
      process.emit("unLock", lock);
    });
  } else {
    delete module[NODELOCK][lock];
  }
});

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
