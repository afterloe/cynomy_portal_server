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

siteConfig.set("remote", { // 远程节点设置
  enable : false, // 是否开启远程
  host: "namo", // 远程服务器ip
  port: 15024 // 远程服务对外节点
});
siteConfig.set("tmpDir", "/tmp"); // 临时目录，用于存放上传的临时文件
siteConfig.set("staticDir", "/tmp/staticDir"); // 静态资源目录，用于存放静态资源
siteConfig.set("sourceHost", "http://almcloud.jwis.cn/"); // Nginx 静态资源地址
siteConfig.set("distributed", { // 多线程配置
  enable: false, // 是否开启多线程模式
  slaveNum : num // 奴隶数
});
siteConfig.set("bindHost", "0.0.0.0"); // 监听IP
siteConfig.set("db", { // 数据库链接配置
  name: "cynomy_portal", // 数据库名
  dialect: "mongodb", // 数据库类型
  host: "namo", // 数据库远程地址
  port: 27017 // 数据库连接端口
});
siteConfig.set("registryPort", 15024); // 监听端口
siteConfig.set("dataDir", dataDir); // 数据存储目录
siteConfig.set("logDir", logDir); // 日志存储目录
siteConfig.set("redisConfig", { // redis 设置
  host: "namo", // redis服务器地址
  port: "6379", // redis端口
  timeout: 604800 // 超时设置 秒
});
siteConfig.set("security", { // 安全设置
  securityKey: "APP://cynomy-portal/oauth", // 安全密钥
  outEncoding: "hex", // 明文表示编码
  algorithm: "aes-256-cbc" // 前端cookie，tooken 加密方式
});
siteConfig.set("mailSender", { // 邮件功能设置
  enable : true, // 是否开启邮件发送功能
  from: "tru@jwis.cn", // 你的邮件的发件人
  port: 25, // 邮件端口
  host: "smtp.jwis.cn", // 发件箱端口
  auth: {  // 发件人设置
    user: "tru@jwis.cn", // 发件人账号
    pass: "Qwer1234" // 发件人密码
  }
});

/**
 * 获取配置
 *
 * @param  {String} key [配置项]
 * @return {Object, String}     [配置内容]
 */
const getConfig = key => siteConfig.has(key)? siteConfig.get(key) : ({});

module.exports = {
  get: getConfig,
};
