/**
  * afterloe - cynomy_portal_server/services/sessionService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-9 16:55:08
  */
"use strict";

const {resolve} = require("path");
const tools = resolve(__dirname, "..", "tools");
const [
  {decipher, cipher},
  redisService,
  {randomNum},
  {throwNeedSignIn, throwTokenError}
] = [
  require(resolve(tools, "security")),
  require(resolve(__dirname, "redisService")),
  require(resolve(tools, "utilities")),
  require(resolve(__dirname, "..", "errors"))
];

const sign = (to, permit) => cipher(`${permit}:${to}`);

function* removeSession(token) {
  if (!token) {
    throwNeedSignIn();
  }
  try {
    const [, to] = decipher(token).split(":");
    return yield redisService.del(`${to}-portal`);
  } catch (err) {
    throwTokenError();
  }
}

function* getSession(token) {
  if (!token) {
    throwNeedSignIn();
  }
  try {
    const [permit, to] = decipher(token).split(":");
    const session = yield redisService.get(`${to}-portal`);

    if (!session || permit !== session.secret) {
      throwNeedSignIn();
    }
    
    return session;
  } catch (err) {
    throwNeedSignIn();
  }
}

function* upDateSession(token, value) {
  if (!token) {
    throwNeedSignIn();
  }
  try {
    const [, to] = decipher(token).split(":");
    const _ = yield redisService.get(`${to}-portal`);
    Object.assign(_, value);
    return yield redisService.set(`${to}-portal`, _);
  } catch (err) {
    throwTokenError();
  }
}

function* setSession(token, seems = {}) {
  if (!token) {
    throwNeedSignIn();
  }
  try {
    const [permit, to] = decipher(token).split(":");
    Object.assign(seems, {
      secret: permit,
      timestamp: Date.now(),
    });
    return yield redisService.set(`${to}-portal`, seems);
  } catch (err) {
    console.log(err);
    throwTokenError();
  }
}

function* flushSession(token) {
  if (!token) {
    throwNeedSignIn();
  }
  try {
    const [, to] = decipher(token).split(":");
    const seems = yield getSession(token);
    yield removeSession(token);
    const newPermit = randomNum(6);
    Object.assign(seems, {
      secret: newPermit,
      timestamp: Date.now(),
    });
    const newToken = sign(to, newPermit);
    return yield setSession(newToken, seems);
  } catch (err) {
    throwTokenError();
  }
}

module.exports = {
  getSession,
  upDateSession,
  setSession,
  sign,
  removeSession,
  flushSession,
};
