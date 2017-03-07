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

const {resolve} = require("path");

const security = require(resolve(__dirname, "..", "tools", "security"));

const value = "afterloe";

const d = security.encryptWithPublicKey(value);
console.log(d);

const _value = security.decryptWithPrivateKey(d);
console.log(_value);

console.log(value === _value);

// const [{resolve}, co] = [require("path"), require("co")];
// // const workflowService = require(resolve(__dirname, "..", "services", "workflowService"));
// const {workFlow_instance_dao} = require(resolve(__dirname, "..", "dao"));
//
// co(function* () {
//   // const data = yield workflowService.searchProduct("pc", "平台V1.0");
//   // return data;
//   //
//   return yield workFlow_instance_dao.searchByTags(["pc", "平台V1.0"]);
// }).then(data => console.log(data)).catch(err => console.log(err));

// vm_stat | awk -F ':' {'print$2.'}
// ps -caxm -orss,comm
// const {spawn} = require("child_process");
// const {EOL} = require("os");
//
// const realMem = () => new Promise((solve, reject) => {
//   const ps = spawn("ps", ["-caxm", "-orss,comm"]);
//   const awk = spawn("awk", ["{ sum += $1 } END { print sum/1024}"]);
//
//   let buf = new Buffer(0);
//
//   ps.stdout.on("data", chunk => awk.stdin.write(chunk));
//   ps.stderr.on("data", chunk => reject(new Error(chunk.toString())));
//   ps.on("error", err => reject(err));
//   ps.on("close", code => 0 === code ? awk.stdin.end(): reject(new Error("git remote -v maybe generator an error")));
//
//   awk.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
//   awk.stderr.on('data', err => reject(new Error(err.toString())));
//   awk.on("error", err => reject(err));
//   awk.on("close", code => 0 === code ? solve(buf.toString()): reject(new Error(`git remote -v | grep push | awk '{print $1}' is failed`)));
// });
//
// const getSystemMem = () => new Promise((solve, reject) => {
//   // const ps =
//   const vm_stat = spawn("vm_stat");
//   const awk = spawn("awk", ["-F", ":" , "{print$2}"]);
//
//   let buf = new Buffer(0);
//
//   vm_stat.stdout.on("data", chunk => awk.stdin.write(chunk));
//   vm_stat.stderr.on("data", chunk => reject(new Error(chunk.toString())));
//   vm_stat.on("error", err => reject(err));
//   vm_stat.on("close", code => 0 === code ? awk.stdin.end(): reject(new Error("git remote -v maybe generator an error")));
//
//   awk.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
//   awk.stderr.on('data', err => reject(new Error(err.toString())));
//   awk.on("error", err => reject(err));
//   awk.on("close", code => 0 === code ? solve(buf.toString()): reject(new Error(`git remote -v | grep push | awk '{print $1}' is failed`)));
// });
//
// getSystemMem().then(str => {
//   // console.log(str);
//   str = str.split(EOL);
//   const datas = str.map(data => Number.parseInt(data));
//   console.log("Wired Memory: %s MB", datas[6]*4096/1024/1024);
//   console.log("Active Memory: %s MB", datas[2]*4096/1024/1024);
//   console.log("Inactive Memory: %s MB", datas[3]*4096/1024/1024);
//   console.log("Free Memory: %s MB", datas[1]*4096/1024/1024);
//
// }).catch(err => console.log(err));
//
// realMem().then(str => {
//   str = str.split(EOL);
//   console.log("Real Mem Total %s MB", str[0]);
// }).catch(err => console.log(err));

// const {execFileSync} = require("child_process");
// const {resolve} = require("path");
//
// const permit = execFileSync(resolve(__dirname, "..", "bin", "registryNodeServer"), ["namo", "15024"]);
// console.log(permit.toString().length);

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
