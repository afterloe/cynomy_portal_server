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
const [key, {removeSession, getSession, upDateSession, setSession, sign}] = ["cynomys-portal", require(resolve(__dirname, "..", "services", "sessionService"))];

const parseLanguage = header => {
  let {language} = header || header["accept-language"];
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

const delHtmlTag = str => str.replace(/<[^>]+>/g,"");

const filter = (object = {}) => {
    let filterObject = {};

    for (let key in object) {
        let value = object[key];
        value = "string" === typeof value ? delHtmlTag(value) : value;
        key = delHtmlTag(key);
        filterObject[key] = value;
    }

    return filterObject;
};

module.exports = function* (next) {
  let [start, cookie, requestIp, header, __self] = [Date.now(), this.cookies.get(key), this.request.ip,
    this.request.header, this];

  let {params, request, query} = __self;

  this.request.body = filter(request.body);
  this.params = filter(params);
  this.query = filter(query);

  const {token} = header;

  if (!cookie) {
    cookie = token;
  }

  this.token = cookie;
  this.requestIp = requestIp || "0.0.0.0"; // 绑定请求Ip到 this对象上
  this.language = parseLanguage(header); // 绑定请求语言

  this.cancel = function* () {
    return yield removeSession(cookie);
  };

  this.getSession = function* () {
    return yield getSession(cookie);
  };

  this.upDateSession = function* (value) {
    return yield upDateSession(cookie, value);
  };

  this.forceSign = sessionId => {
    __self.cookies.set(key, sessionId);
    return sessionId;
  };

  this.sign = function* (to, permit) {
    cookie = sign(to, permit);
    __self.cookies.set(key, cookie);
    yield setSession(cookie, {});
    return cookie;
  };

  yield next;

  console.log("[%s][%s] %s %s - %s ms by %s", new Date().toLocaleString(), requestIp, this.method, this.url, Date.now() - start, process.pid);
};
