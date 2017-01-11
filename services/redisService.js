/**
  * afterloe - cynomy_portal_server/services/redisService.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 18:48:00
  */
"use strict";

const [{createClient}, {resolve}] = [require("redis"), require("path")];
const {get} = require(resolve(__dirname, "..", "config"));
const {timeout = 60 * 60 * 24 * 2,host = process.env.REDIS_PORT_6379_TCP_ADDR, port = process.env.REDIS_PORT_6379_TCP_PORT} = get("redisConfig");

// 惰性链接 -- 只有在redis使用的时候才开始调用链接
let redisClient;

/**
 * 获取redis连接
 */
const connectionServer = () => redisClient = createClient(port, host);

/**
 * 判断key 是否存在于redis中
 *
 * @param key
 * @returns {*}
 */
const has = function* (key) {
  if (!key) {
    return ;
  }
  if (!redisClient) {
    connectionServer();
  }
  return yield redisClient.exists(key);
};

/**
 * 根据key来从redis中获取信息
 *
 * @param key
 * @returns {*}
 */
const getFromRedis = function* (key) {
  if (!key) {
    return ;
  }
  if (!redisClient) {
    connectionServer();
  }
  const str = yield redisClient.get(key);
  return JSON.parse(str);
};

/**
 * 根据key来从redis中删除信息
 *
 * @param key
 * @returns {*}
 */
const del = function* (key) {
  if (!key) {
    return ;
  }
  if (!redisClient) {
    connectionServer();
  }
  return yield redisClient.del(key);
};

/**
 * 将key 和 value存入redis
 *
 * @param key
 * @param seems
 * @returns {*}
 */
const set = function* (key, seems, _timeout = timeout) {
  if (!key || !seems) {
    return;
  }
  if (!redisClient) {
    connectionServer();
  }
  // 如果传入的value是 对象的话 就使用JSON方法将对象转化为字符串
  if (seems instanceof Object) {
    seems = JSON.stringify(seems);
  }
  const val = yield redisClient.set(key, seems); // 设置key-value
  yield redisClient.expire(key, _timeout); // 设置超时时间
  return val;
};

module.exports = {
  has,
  get: getFromRedis,
  del,
  set,
};
