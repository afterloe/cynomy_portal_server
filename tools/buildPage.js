/**
  * afterloe - cynomy_portal_server/tools/buildPage.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 16:31:37
  */
"use strict";

const [pug, {resolve, extname, basename}, {existsSync, statSync, readdirSync, writeFile}] = [require("pug"), require("path"), require("fs")];
const [PATH, DATA, SUFFIX] = [Symbol("PATH"), Symbol("DATA"), ".pug"];

/**
 * 设置jade模板的文件夹目录
 *
 * @param {String} __path 文件夹路径
 */
const setPugTemplatePath = __path => {
  if (!existsSync(__path)) {
    throw new Error(`${__path} is not exists.`);
  }

  const stat = statSync(__path);
  if (stat.isFile()) {
    throw new Error(`${__path} is a file!`);
  }

  module[PATH] = __path;
};

/**
 * 设置模板文件的动态数据
 *
 * @param {Object} json 每个文件的动态数据,key的名字要和模板的名字一致
 */
const setPortalData = json => {
  if (json instanceof Object) {
    module[DATA] = json;
    return ;
  }

  throw new Error("data mast be a json");
};

/**
 * 写入HTML
 *
 * @param  {String} key     文件的名字对应的是对象中的key的名字
 * @param  {String} file    模板文件
 * @param  {String} outPath 转换之后输出的文件位置
 * @return {Promise}
 */
const writeHTML = (key, file, outPath) => {
  return new Promise((solve, reject) => {
    const [pugPath, config] = [resolve(module[PATH], file), module[DATA][key]];
    writeFile(outPath, pug.renderFile(pugPath, config), err => {
      if (err) {
        reject(err);
      }
      console.log(`build ${key}.html ...done`);
      resolve();
    });
  });
};

/**
 * 模板转换
 *
 * @param  {String} outPath 转换之后输出的文件夹
 * @return {Promise}          Promise
 */
const compileTemplates = outPath => {
  const [files, tasks] = [readdirSync(module[PATH]), []];
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let suffix = extname(file);
    if (SUFFIX !== suffix) {
      continue ;
    }
    let key = basename(file, SUFFIX);
    tasks.push(writeHTML(key, file, resolve(outPath, `${key}.html`)));
  }
  return Promise.all(tasks);
};

module.exports = {
  setPugTemplatePath,
  setPortalData,
  compileTemplates,
};
