/**
  * afterloe - cynomy_portal_server/test/workflowService_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-19 23:23:55
  */
"use strict";

const [{resolve}, {deepStrictEqual}, co] = [require("path"), require('assert'), require("co")];

const workflowService = require(resolve(__dirname, "..", "services", "workflowService"));

describe("workflowService", () => {
  describe("#createWorkFlowNode", () => {
    it("normal treatment", done => {
      co(function* () {
        const node = {
          name: "设计"
        };
        const _ = yield workflowService.createWorkFlowNode(node);
        deepStrictEqual(1, _.result.ok);
        done();
      }).catch(err => done(err));
    });
  });
});
