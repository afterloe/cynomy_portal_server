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
const [{decipher, cipher}, key, redisService, {randomCode}, errors] = [require(resolve(tools, "security")), "cynomys-portal", require(resolve(__dirname, "..", "services", "redisService")),
  require(resolve(tools, "utilities")), require(resolve(__dirname, "..", "errors"))];

const parseLanguage = header => {
  let {language = header["accept-language"]} = header;
  try {
    language = language.split(";")[0];
    const value = language.split(",");
    language = value.find(v => "en-US" === v);
    if (!language) {
      throw new Error("");
    }
  } catch (err) {
    language = "zh-CN";
  }
  return language;
};

module.exports = function* (next) {
  let [start, cookie, requestIp = "0.0.0.0", header] = [Date.now(), this.cookies.get(key), this.request.ip, this.request.header];
  let {token} = header;
  this.requestIp = requestIp; // 绑定请求Ip到 this对象上
  this.language = parseLanguage(header); // 绑定请求语言
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

  this.getSession = function* (token) {
    try {
			if(token) {
        cookie = token;
      }
      const [permit, to] = security.decipher(cookie).split(":"); // 解构 设备id,用户id,ip
      let session = yield redisService.get(`${to}-${permit}`);
      return session;
    } catch (error) {
      return null;
    }
  };

  this.upDateSession = function* (value) {
    const [permit, to] = security.decipher(cookie).split(":"); // 解构 设备id,用户id,ip
    const _ = yield redisService.get(`${to}-${permit}`);
    Object.assign(session, value);
    return yield redisService.set(`${to}-${permit}`, session);
  };

  this.setSession = function* (seems, token = cookie) {
    const [permit, to] = security.decipher(token).split(":");
    Object.assign(seems, {
      secret: permit,
      timestamp: Date.now(),
    });
    return yield redisService.set(`${to}-${permit}`, seems);
  };

  this.sign = (to, permit) => {
    cookie = security.cipher(`${permit}:${to}`);
    this.cookies.set(key, cookie);
    return cookie;
  };

  yield next;

  console.log("[%s][%s] %s %s - %s ms", new Date().toLocaleString(), requestIp, this.method, this.url, Date.now() - start);
};
