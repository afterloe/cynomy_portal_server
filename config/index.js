/**
  * afterloe - cynomy_portal_server/config/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 13:52:07
  */
"use strict";

const [{resolve}, {cpus}] = [require("path"), require("os")];

const siteConfig = new Map(); // 主配置列表
const defaultRoot = resolve(process.env.HOME, ".cynomys", "protal");

const [num, dataDir, logDir] = [cpus().length, resolve(defaultRoot, "data"), resolve(defaultRoot, "logs")];

siteConfig.set("distributed", { // 多线程配置
        enable: true,
        slaveNum : num // 奴隶数
});
// siteConfig.set("bindHost", "127.0.0.1"); // 监听IP
siteConfig.set("bindHost", "0.0.0.0"); // 监听端口
siteConfig.set("registryPort", 15024); // 监听端口
siteConfig.set("db", "/home/afterloe/wehouse.db"); // DB 目录
siteConfig.set("dataDir", dataDir); // 数据存储目录
siteConfig.set("logDir", logDir); // 日志存储目录
siteConfig.set("redisConfig", { // redis 设置
  host: "127.0.0.1",
  port: "6379",
  timeout: 172800 // 超时设置 秒
});
siteConfig.set("security", { // 安全设置
  securityKey: "cynomys-redis-oauth",
  outEncoding: "base64",
  algorithm: "aes-256-cbc"
});
siteConfig.set("mailSender", {
  enable : false, // 是否开启邮件发送功能
});

const get = key => siteConfig.has(key)? siteConfig.get(key) : ({});

module.exports = {
        get,
};
