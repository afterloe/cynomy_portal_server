/**
  * afterloe - cynomy_portal_server/test/funTest.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 23:01:15
  */
"use strict";
const {execFileSync} = require("child_process");
const {resolve} = require("path");

const permit = execFileSync(resolve(__dirname, "..", "bin", "registryNodeServer"), ["namo", "15024"]);
console.log(permit.toString().length);

// let _ = ["java", "python", "nodejs", "nodejs"];
// const tags = ["c++", "nodejs"];
// _ = [...new Set(tags.concat(_))];
//
// console.log(_);

// const {resolve} = require("path");
//
// const {setPugTemplatePath, compileTemplate} = require(resolve(__dirname, "..", "tools", "buildPage"));
// setPugTemplatePath(resolve(__dirname, "..", "template"));
// const html = compileTemplate("404NotFound", {
//   title: "page is not found"
// });
//
// console.log(html);

// const {spawn} = require("child_process");
// const tarXZF = spawn("tar", ["xzf", "/tmp/9996e550eddc11e6a87d01486680478a"], {
//   cwd: "/tmp/tmp-0a543e60eddc11e6b321c322b7ea7dc6"
// });
// tarXZF.stdout.on("data", chunk => console.log(`[SUCCESS] ${chunk}`));
// tarXZF.on("error", err => console.log(err));
// tarXZF.on("close", code => {
//   console.log(code);
// });

// const data = `{"name":"afterloe", "age":5, "sex":"man"}`;
// const params = `node-manager->userService->loaderFromXlsx(${data})`;
//
// const [ldap, service, fun] = params.split("->");
// let [_, __] = fun.split(/(?:\()(.*)(?:\))/i);
// console.log(ldap, service, fun);
// const args = __? __.split("|"): null;
// args.map((p,i) => args[i] = JSON.parse(p));
// console.log(_, args);

// const {basename, extname} = require("path"), {statSync, readdirSync} = require("fs"), {resolve} = require("path");
// console.log(basename("/home/afterloe/index.pug", ".pug"));
// console.log(extname("/home/afterloe/index.pug"));
//
// const _ = [];
//
// function scanDir(_path) {
//   let stat = statSync(_path);
//   if (stat.isDirectory()) {
//     let files = readdirSync(_path);
//     for (let i = 0; i < files.length; i++) {
//       scanDir(resolve(_path, files[i]));
//     }
//     files = undefined;
//   }
//   stat = undefined;
//   return _.push(_path);
// }
// const start = Date.now();
// console.log(scanDir(__dirname));
// console.log(_.length);
// console.log((Date.now() - start)/ 1000);
//
// const chainNodes = [{name : "afterloe"},{name : "joe"},{name : "bash"},{name : "yangyangyang"},{name : "zhou"},{name : "ff"}];
// for (let i = 0; i < chainNodes.length; i++){
//   for (let j = i + 1; j < chainNodes.length; j++) {
//     if (chainNodes[i].name === chainNodes[j].name) {
//       throw new Error("有相同的.");
//     }
//   }
// }
