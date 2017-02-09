/**
  * afterloe - cynomy_portal_server/test/redis_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-9 09:58:47
  */
"use strict";

const [{resolve}, co] = [require("path"), require("co")];
const redisService = require(resolve(__dirname, "..", "services", "redisService"));

co(function* (){
  const key = "afterloe-test";
  const timeout = 10;
  const _ = yield redisService.set(key, {name: "afterloe", age: 4, sex: "man"}, timeout);
  console.log(_);
  const object = yield redisService.get(key);
  console.log(object);

  const __ = yield redisService.has(key);
  console.log(__);

  const ___ = yield redisService.del(key);
  console.log(___);
  const object1 = yield redisService.get(key);
  console.log(object1);

  redisService.end();
}).then(() => console.log("redis test is over!")).catch(err => {
  console.log("[INFO]: somethin Error!");
  console.log(err);
});
