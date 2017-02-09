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
const {timeout = 60 * 60 * 24 * 15, host = process.env.REDIS_PORT_6379_TCP_ADDR, port = process.env.REDIS_PORT_6379_TCP_PORT} = get("redisConfig");
const CLIENT = Symbol("CLIENT");

/**
 * 获取redis连接
 */
const connectionServer = () => module[CLIENT] = createClient(port, host);

const end = hook => {
  module[CLIENT].end(true);
  module[CLIENT].quit();
  if (hook) {
    module[CLIENT] = undefined;
  }
};

const objectToArray = (key, seems) => {
  const _ = [];
  _.push(key);
  for (let key in seems) {
    _.push(key);
    _.push(seems[key]);
  }
  return _;
};

const hmset = seems => new Promise((solve, reject) => {
  seems.push((err, _) => {
    if (err) {
      reject(err);
    }
    solve(_);
  });
  module[CLIENT].hmset.apply(module[CLIENT], seems);
});

const hgetall = key => new Promise((solve, reject) => {
  module[CLIENT].hgetall(key, (err, _) => {
    if (err) {
      reject(err);
    }
    solve(_);
  });
});

const expire = (key, timeout) => new Promise((solve, reject) => {
  module[CLIENT].expire(key, timeout, (err, _) => {
    if (err) {
      reject(err);
    }
    solve(_);
  });
});

const exists = key => new Promise((solve, reject) => {
  module[CLIENT].exists(key, (err, _) => {
    if (err) {
      reject(err);
    }
    solve(0 === _ ? false: true);
  });
});

const delKey = key => new Promise((solve, reject) => {
  module[CLIENT].del(key, (err, _) => {
    if (err) {
      reject(err);
    }
    solve(0 === _ ? false: true);
  });
});

/**
 * 判断key 是否存在于redis中
 *
 * @param key
 * @returns {*}
 */
function* has(key) {
  if (!key) {
    return ;
  }
  if (!module[CLIENT]) {
    connectionServer();
  }
  return yield exists(key);
}

/**
 * 根据key来从redis中删除信息
 *
 * @param key
 * @returns {*}
 */
function* del(key) {
  if (!key) {
    return ;
  }
  if (!module[CLIENT]) {
    connectionServer();
  }
  return yield delKey(key);
}

/**
 * 将key 和 value存入redis
 *
 * @param key
 * @param seems
 * @returns {*}
 */
function* set(key, seems, _timeout = timeout) {
  if (!key || !seems) {
    return ;
  }
  if (!module[CLIENT]) {
    connectionServer();
  }
  seems = seems instanceof Object ? objectToArray(key, seems): objectToArray(key, {_default: seems});
  const val = yield hmset(seems); // 设置key-value
  yield expire(key, _timeout); // 设置超时时间
  return val;
}

/**
 * 根据key来从redis中获取信息
 *
 * @param key
 * @returns {*}
 */
function* getFromRedis(key) {
  if (!key) {
    return ;
  }
  if (!module[CLIENT]) {
    connectionServer();
  }
  return yield hgetall(key);
}

module.exports = {
  has,
  get: getFromRedis,
  del,
  set,
  end,
};
