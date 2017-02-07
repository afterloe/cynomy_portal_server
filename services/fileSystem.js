/**
  * afterloe - cynomy_portal_server/services/fileSystem.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-7 17:07:09
  */
"use strict";

const [{resolve, basename}, {spawn}, {statSync, existsSync, readdirSync, mkdirSync, createReadStream, createWriteStream}] = [require("path"), require("child_process"), require("fs")];
const [{throwNotExistsFile, throwParametersError}, {uuidCode}, {get}] = [require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities")),
  require(resolve(__dirname, "..", "config"))];
const CENTER = Symbol("CENTER");

module[CENTER] = {};

/**
 * 复制文件
 *
 * @param  {String} targrt  复制的目标
 * @param  {String} root    项目根路径
 * @return {Promise}
 */
const cp = (source, target) => new Promise((solve, reject) => {
  const name = basename(source);
  const targetPath = resolve(target, name);
  const [sourceStream, targetStream] = [createReadStream(source), createWriteStream(targetPath)];
  sourceStream.pipe(targetStream);

  targetStream.on("error", err => {
      console.log(`create file ${target} ... FAILED! `);
      reject(err);
  });

  sourceStream.on("error", err => {
    console.log(`read file ${source} ... FAILED! `);
    reject(err);
  });

  sourceStream.on("close", () => {
    console.log(`cp file to ${targetPath} ... SUCCESS! `);
    solve();
  });
});

const scanDir = (_path, identification) => {
  let stat = statSync(_path);
  if (stat.isDirectory()) {
    let files = readdirSync(_path);
    for (let i = 0; i < files.length; i++) {
      scanDir(resolve(_path, files[i]), identification);
    }
    files = undefined;
  }
  stat = undefined;
  return module[CENTER][identification].push(_path);
};

const decompression = tar => {
  if (!existsSync(tar)) {
    return Promise.reject(throwNotExistsFile());
  }

  const _stat = statSync(tar);
  if (_stat.isDirectory()) {
    return Promise.reject(throwParametersError());
  }

  return new Promise((solve, reject) => {
    const [cwd, relative] = [resolve(tar, ".."), basename(tar)];
    const tagDir = resolve(get("tmpDir"), `tmp-${uuidCode()}`);
    mkdirSync(tagDir);
    const tarXZF = spawn("tar", ["xzf", relative, "C", tagDir], {
      cwd,
    });

    tarXZF.stdout.on("data", chunk => console.log(`[SUCCESS] ${chunk}`));
    tarXZF.on("error", err => reject(err));
    tarXZF.on("close", code => {
      if (0 !== code) {
        reject("[FAILED] 解压tar包失败");
        return ;
      }
      solve(tagDir);
    });
  });
};

const compression = dir => {
  if (!existsSync(dir)) {
    return Promise.reject(throwNotExistsFile());
  }

  return new Promise((solve, reject) => {
    const [cwd, relative] = [resolve(dir, ".."), basename(dir)];
    const tarCZF = spawn("tar", ["czf", `${relative}.tar.gz`, `${relative}`], {
      cwd,
    });

    tarCZF.stdout.on("data", chunk => console.log(`[SUCCESS] ${chunk}`));
    tarCZF.on("error", err => reject(err));
    tarCZF.on("close", code => {
      if (0 !== code) {
        reject("[FAILED] 压缩tar失败");
        return ;
      }
      solve(resolve(cwd, `${relative}.tar.gz`));
    });
  });
};

function* move(source, ...args) {
  if (!existsSync(source)) {
    return Promise.reject(throwNotExistsFile());
  }
  const [target = get("staticDir")] = args;
  const _stat = statSync(source);
  if (_stat.isDirectory()) {
    const identification = new Date().toLocaleString();
    module[CENTER][identification] = [];
    scanDir(source, identification);
    const tasks = [];
    for (let i = 0; i < module[CENTER][identification].length; i++) {
      tasks.push(cp(module[CENTER][identification][i], target));
    }
    delete module[CENTER][identification];
    return Promise.all(tasks);
  } else {
    return yield cp(source, target);
  }
}

module.exports = {
  decompression,
  compression,
  move,
};
