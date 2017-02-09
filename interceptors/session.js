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
const [key, {removeSession, getSession, upDateSession, setSession}] = ["cynomys-portal", require(resolve(__dirname, "..", "services", "sessionService"))];

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
  const {token} = header;
  if (!cookie) {
    cookie = token;
  }

  this.token = cookie;
  this.requestIp = requestIp; // 绑定请求Ip到 this对象上
  this.language = parseLanguage(header); // 绑定请求语言

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
    return yield removeSession(cookie);
  };

  this.getSession = function* () {
    return yield getSession(cookie);
  };

  this.upDateSession = function* (value) {
    return yield upDateSession(cookie, value);
  };

  this.sign = function* (to, permit) {
    cookie = sign(to, permit);
    this.cookies.set(key, cookie);
    yield setSession(cookie, {});
    return cookie;
  };

  yield next;

  console.log("[%s][%s] %s %s - %s ms", new Date().toLocaleString(), requestIp, this.method, this.url, Date.now() - start);
};
