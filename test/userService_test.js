/**
  * afterloe - cynomy_portal_server/test/userService_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 16:24:06
  */
"use strict";

const [{resolve}, co, {ok, throws, deepStrictEqual}] = [require("path"), require("co"), require("assert")];
const userService = require(resolve(__dirname, "..", "services", "userService"));

describe("userService", () => {

  before(done => {
    co(function* () {
      yield userService.cleanDocuments();
    }).then(() => done()).catch(err => done(err));
  });

  describe("#loaderFromXlsx", () => {
    it("normal treatment", () => {
      const user_xlsxPath = resolve(__dirname, "..", "doc", "user.xlsx");
      const users = userService.loaderFromXlsx(user_xlsxPath);
      ok(users instanceof Array);
    });

    it("wrong path", () => {
      throws(() => {
        const user_xlsxPath = resolve(__dirname, "..", "doc", Math.random()+".mocha");
        const users = userService.loaderFromXlsx(user_xlsxPath);
        ok(users instanceof Array);
      }, /no such file or directory, open/);
    });

    it("wrong path", () => {
      throws(() => {
        const user_xlsxPath = resolve(__filename);
        const users = userService.loaderFromXlsx(user_xlsxPath);
        ok(users instanceof Array);
      }, /Unsupported file/);
    });

  });

  describe("#createUser", () => {
    it("normal treatment", done => {
      co(function* () {
        const user = {
          name : "mocha0",
          mail: "test@mocha0.com"
        };
        const _ = yield userService.createUser(user);
        deepStrictEqual(1, _.result.ok);
      }).then(() => done()).catch(err => done(err));
    });

    it("same user", done => {
      co(function* () {
        const user = {
          name : "mocha0",
          mail: "test@mocha0.com"
        };
        const _ = yield userService.createUser(user);
        deepStrictEqual(0, _.result.ok);
      }).catch(err => {
        if (/用户已存在/.test(err)) {
          done();
        } else {
          done(err);
        }
      });
    });

    it("wrong mail", done => {
      co(function* () {
        const user = {
          name : "mocha0",
          mail: "test"
        };
        const _ = yield userService.createUser(user);
        deepStrictEqual(0, _.result.ok);
      }).catch(err => {
        if (/参数类型错误/.test(err)) {
          done();
        } else {
          done(err);
        }
      });
    });

    it("lack mail", done => {
      co(function* () {
        const user = {
          name : "mocha0",
        };
        const _ = yield userService.createUser(user);
        deepStrictEqual(0, _.result.ok);
      }).catch(err => {
        if (/缺少参数/.test(err)) {
          done();
        } else {
          done(err);
        }
      });
    });

  });

  describe("#createUsers", () => {
    it("normal treatment", done => {
      co(function* () {
        const users = [{
          name : "mocha1",
          mail: "test@mocha1.com"
        },{
          name : "mocha2",
          mail: "test@mocha2.com"
        },{
          name : "mocha3",
          mail: "test@mocha3.com"
        }];
        const _ = yield userService.createUsers(users);
        deepStrictEqual(3, _.result.n);
      }).then(() => done()).catch(err => done(err));
    });

    it("same user in the list", done => {
      co(function* () {
        const users = [{
          name : "mocha4",
          mail: "test@mocha4.com"
        },{
          name : "mocha5",
          mail: "test@mocha5.com"
        },{
          name : "mocha4",
          mail: "test@mocha4.com"
        }];
        const _ = yield userService.createUsers(users);
        deepStrictEqual(2, _.result.n);
      }).then(() => done()).catch(err => done(err));
    });

    it("empty of array", done => {
      co(function* () {
        const users = [];
        const _ = yield userService.createUsers(users);
        deepStrictEqual(2, _.result.n);
      }).catch(err => {
        if (/length = 0/.test(err)) {
          done();
        } else {
          done(err);
        }
      });
    });

    it("wrong paramete", done => {
      co(function* () {
        const users = "[]";
        const _ = yield userService.createUsers(users);
        deepStrictEqual(2, _.result.n);
      }).catch(err => {
        if (/参数类型错误/.test(err)) {
          done();
        } else {
          done(err);
        }
      });
    });

    it("wrong paramete of items", done => {
      co(function* () {
        const users = [123,456,789];
        const _ = yield userService.createUsers(users);
        deepStrictEqual(2, _.result.n);
      }).catch(err => {
        if (/缺少参数/.test(err)) {
          done();
        } else {
          done(err);
        }
      });
    });

    it("wrong paramete of items", done => {
      co(function* () {
        const users = [{},{},{
          name : "mocha6",
          mail: "test@mocha6.com"
        }];
        const _ = yield userService.createUsers(users);
        deepStrictEqual(1, _.result.n);
      }).catch(err => {
        if (/缺少参数/.test(err)) {
          done();
        } else {
          done(err);
        }
      });
    });

  });

  describe("#getUserList", () => {
    it("normal treatment", done => {
      co(function* () {
        const _ = yield userService.getUserList();
        deepStrictEqual(6, _.length);
      }).then(() => done()).catch(err => done(err));
    });
  });

});
