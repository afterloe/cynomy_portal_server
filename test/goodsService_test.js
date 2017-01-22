/**
  * afterloe - cynomy_portal_server/test/goodsService_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-22 14:43:27
  */
"use strict";

const [{resolve}, co] = [require("path"), require("co")];
const services = resolve(__dirname, "..", "services");
const goodsService = require(resolve(services, "goodsService"));

describe("goodsService", () => {

  before(done => {
    co(function* (){
      return goodsService.cleanDocuments();
    }).then(() => done()).catch(err => done(err));
  });
});
