/**
  * afterloe - cynomy_portal_server/interceptors/session.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 18:45:39
  */
"use strict";

const {resolve} = require("path");
const tools = resolve(__dirname, "..", "tools");
const [security, key, redisService, utilities, errors] = [require(resolve(tools, "security")), "cynomys-sig", require(resolve(__dirname, "..", "services", "redisService")),
  require(resolve(tools, "utilities")), require(resolve(__dirname, "..", "errors"))];

const parseLanguage = header => {
  let {language = header["accept-language"]} = header;
  try {
    language = language.split(";")[0];
    let value = language.split(",");
    language = value.find(v => "en-US" === v);
    if (!language) {
      throw new Error("");
    }
  } catch (error) {
    language = "zh-CN";
  }
  return language;
};

module.exports = function* (next) {
  let [start, cookie, requestIp = "0.0.0.0", header] = [new Date(), this.cookies.get(key), this.request.ip, this.request.header];
  let {token} = header;
  this.requestIp = requestIp; // 绑定请求Ip到 this对象上
  this.language = parseLanguage(header); // 绑定语言
  if (!cookie) {
    cookie = token;
  }

  this.token = cookie;
  this.success = ctx => ({
    code: 200,
    error: null,
    result: ctx,
  });

  this.fail = (msg = "System error", code = 500) => ({
    code,
    error: msg,
    result: null,
  });

  this.cancel = function* () {
    let [, equipmentId, userId] = security.decipher(cookie).split(":"); // 解构 设备id,用户id,ip
    if (equipmentId !== this.equipmentId) {
      errors.throwSessionError(this.language);
    }
    yield redisService.del(`${equipmentId}:${userId}`);
    this.cookies.set(key, requestIp);
  };

  this.getSession = function* (__token) {
    try {
			if(__token) {
        cookie = __token;
      }
      let [secret, equipmentId, userId] = security.decipher(cookie).split(":"); // 解构 设备id,用户id,ip
      if (equipmentId !== this.equipmentId) {
        errors.throwSessionError(this.language);
      }
      let session = yield redisService.get(`${equipmentId}:${userId}`);
      if (session.secret !== secret) {
        errors.throwSessionError(this.language);
      }
      delete session.secret;
      session.cookie = cookie;
      return session;
    } catch (error) {
      return null;
    }
  };

  this.reSetSession = function* (value) {
    let [secret, equipmentId, userId] = security.decipher(cookie).split(":"); // 解构 设备id,用户id,ip
    if (equipmentId !== this.equipmentId) {
      errors.throwSessionError(this.language);
    }
    let session = yield redisService.get(`${equipmentId}:${userId}`);
    if (session.secret !== secret) {
      errors.throwSessionError(this.language);
    }
    Object.assign(session, value);
    return yield redisService.set(`${equipmentId}:${userId}`, session);
  };

  this.setSession = function* (seems, token = cookie) {
    let [secret, equipmentId, userId] = security.decipher(token).split(":");
    if (equipmentId !== this.equipmentId) {
      errors.throwSessionError(this.language);
    }
    seems.secret = secret;
    return yield redisService.set(`${equipmentId}:${userId}`, seems);
  };

  this.sign = function (userId) {
    cookie = security.cipher(`${utilities.randomCode(15)}:${this.equipmentId}:${userId}`);
    this.cookies.set(key, cookie);
    return cookie;
  };

  yield next;

  console.log("[%s][%s] %s %s - %s ms", new Date().toLocaleString(), requestIp, this.method, this.url, new Date() - start);
};
