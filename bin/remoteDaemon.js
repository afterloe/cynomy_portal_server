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

const [{fork, execFileSync}, {resolve}] = [require("child_process"), require("path")];
const Chain = require(resolve(__dirname, "..", "tools", "chain"));
const [FLAG, ARGS, WS, _] = [Symbol("FLAG"), Symbol("ARGS"), Symbol("WS"), []];

module[FLAG] = false;

const isNormalStart = () => {
  const startCount = _.length;
  if (startCount <= 2) {
    return true;
  }
  const [nowLog, lastLog] = [_[startCount - 1], _[startCount - 2]];
  return nowLog.startTime - lastLog.startTime > 500;
};

const cutLog = () => {
  const startCount = _.length;
  if (startCount > 25 ) {
    const [nowLog, lastLog] = [_[startCount - 1], _[startCount - 2]];
    _.length = 0;
    _.push(lastLog, nowLog);
  }

  return;
};

const obmitPermiInfo = (host, port) => {
  const permitBuffer = execFileSync(resolve(__dirname, "registryNodeServer"), [host, port]);
  const length = permitBuffer.length;
  const rst = permitBuffer.slice(0, length - 1);
  const [info, permit] = rst.toString().split("->");
  if ("permit" === info) {
    return permit;
  } else {
    throw new Error(permit);
  }
};

function startDaemon(host, port) {
  let permit;
  try {
    permit = obmitPermiInfo(host, port);
  } catch (err) {
    console.log("remote daemon thread can't connection this host, because %s", err.message);

    return;
  }

  if (!host) {
    console.log("remote daemon thread can't connection this host, auto exit.");
    return ;
  }

  _.push({
    startTime: Date.now()
  });

  cutLog();

  module[WS] = fork(resolve(__dirname, "wsCli"), [host, port, permit]);
  module[WS].on("message", message => {
    const {act, msg} = message;
    LAUNCH_ACTIVITY.passRequest(act, msg);
  });
}

const tryReStartDaemon = () => {
  if (isNormalStart()) {
    process.nextTick(() => {
      startDaemon.apply(null, module[ARGS]);
    });
  } else {
    return ;
  }
};

process.on("sendCynomyCommunication", (msg) => {
  if (module[FLAG] && module[WS].connected) {
    module[WS].send({
      act: "receive",
      msg
    });
  } else {
    tryReStartDaemon();

    process.nextTick(() => {
      process.emit("sendCynomyCommunication", msg);
    });
  }
});

function readyCynomyCommunication(act, msg) {
  if ("launch activity" === act)  {
    module[FLAG] = true;
    console.log("communication daemon thread is ready. %s", msg || "");
  } else {
    Chain.next();
  }
}

function sendCynomyCommunicationSuccess(act, msg) {
  if ("launch ok" === act)  {
    console.log("send msg success. %s");
    process.emit("sendCynomyCommunicationSuccess", msg);
  } else {
    Chain.next();
  }
}

function closeCynomyCommunication(act, msg) {
  if ("launch close" === act)  {
    console.log("communication daemon thread is close. %s", msg);
    module[FLAG] = false;
  } else {
    Chain.next();
  }
}

function receiveCynomyCommunication(act, msg) {
  if ("send result" === act)  {
    console.log("receive msg: %s", msg);
  } else {
    Chain.next();
  }
}

function suicideCynomyCommunication(act, msg) {
  if ("suicide" === act)  {
    console.log("communication daemon thread is suicide. %s", msg);
    module[FLAG] = false;
    tryReStartDaemon();
  } else {
    Chain.next();
  }
}

const [LAUNCH_ACTIVITY, LAUNCH_OK, LAUNCH_CLOSE, SEND_RESULT, SUICIDE] = [new Chain(readyCynomyCommunication), new Chain(sendCynomyCommunicationSuccess), new Chain(closeCynomyCommunication), new Chain(receiveCynomyCommunication), new Chain(suicideCynomyCommunication)];
LAUNCH_ACTIVITY.setNext(LAUNCH_OK).setNext(LAUNCH_CLOSE).setNext(SEND_RESULT).setNext(SUICIDE);

module.exports = (...args) => {
  module[ARGS] = args;
  const [host, port] = args;
  startDaemon(host, port);
};
