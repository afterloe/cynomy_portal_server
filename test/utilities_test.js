/**
  * afterloe - cynomy_portal_server/test/utilities_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-17 21:35:59
  */
"use strict";

const [{resolve}, {deepStrictEqual, notDeepStrictEqual, throws}] = [require("path"), require('assert')];
const utilities = require(resolve(__dirname, "..", "tools", "utilities"));

describe("utilities", () => {

  describe("#readyConfig", () => {

    it("json file", () => {
      const obj = utilities.readyConfig(resolve(__dirname, "..", "package.json"));
      notDeepStrictEqual({}, obj);
    });

    it("javascripts file", () => {
      const obj = utilities.readyConfig(resolve(__dirname, __filename));
      deepStrictEqual({}, obj);
    });

    it("wrong path", () => {
      const obj = utilities.readyConfig(resolve(__dirname, Math.random() + ".mocha"));
      deepStrictEqual({}, obj);
    });

    it("no path", () => {
      const obj = utilities.readyConfig();
      deepStrictEqual({}, obj);
    });
  });

  describe("#subMail", () => {

    it("normal treatment", () => {
      const mail = "lm6289511@gmail.com";
      const _ = utilities.subMail(mail);
      notDeepStrictEqual(mail, _);
    });

    it("wrong mail", () => {
      const parameter = "lm6289511";
      const _ = utilities.subMail(parameter);
      deepStrictEqual(parameter, _);
    });

    it("with *", () => {
      const parameter = "lm6289511@";
      const _ = utilities.subMail(parameter);
      notDeepStrictEqual(parameter, _);
    });
  });

  describe("#uuidCode", () => {

    it("normal treatment", () => {
      const uuid = utilities.uuidCode();
      deepStrictEqual(32, uuid.length);
    });
  });

  describe("#randomNum", () => {

    it("normal treatment", () => {
      const str = utilities.randomNum(4);
      deepStrictEqual("string", typeof str);
      deepStrictEqual(4, str.length);
    });

    it("no parameter", () => {
      const str = utilities.randomNum();
      deepStrictEqual("string", typeof str);
      deepStrictEqual(6, str.length);
    });

    it("randomLength", () => {
      const _ = Math.round(Math.random() * 100);
      const str = utilities.randomNum(_);
      deepStrictEqual("string", typeof str);
      deepStrictEqual(_, str.length);
    });

    it("wrong type of parameter with letter", () => {
      throws(() => {
        const str = utilities.randomNum("bidasdoaij");
        console.log(str);
      },/parameter type error/);
    });

    it("negative", () => {
      const str = utilities.randomNum(-25);
      deepStrictEqual("", str);
    });

    it("zero", () => {
      const str = utilities.randomNum(0);
      deepStrictEqual("", str);
    });

    it("decimal", () => {
      throws(() => {
        const str = utilities.randomNum(Math.random());
        console.log(str);
      },/parameter type error/);
    });

    it("object", () => {
      throws(() => {
        const str = utilities.randomNum({name : "afterloe"});
        console.log(str);
      },/parameter type error/);
    });
  });

  describe("#randomCode", () => {

    it("normal treatment", () => {
      const str = utilities.randomCode(4);
      deepStrictEqual("string", typeof str);
      deepStrictEqual(4, str.length);
    });

    it("no parameter", () => {
      const str = utilities.randomCode();
      deepStrictEqual("string", typeof str);
      deepStrictEqual(4, str.length);
    });

    it("randomLength", () => {
      const _ = Math.round(Math.random() * 100);
      const str = utilities.randomCode(_);
      deepStrictEqual("string", typeof str);
      deepStrictEqual(_, str.length);
    });

    it("wrong type of parameter with letter", () => {
      throws(() => {
        const str = utilities.randomCode("bidasdoaij");
        console.log(str);
      },/parameter type error/);
    });

    it("negative", () => {
      const str = utilities.randomCode(-25);
      deepStrictEqual("", str);
    });

    it("zero", () => {
      const str = utilities.randomCode(0);
      deepStrictEqual("", str);
    });

    it("decimal", () => {
      throws(() => {
        const str = utilities.randomCode(Math.random());
        console.log(str);
      },/parameter type error/);
    });

    it("object", () => {
      throws(() => {
        const str = utilities.randomCode({name : "afterloe"});
        console.log(str);
      },/parameter type error/);
    });
  });
});
