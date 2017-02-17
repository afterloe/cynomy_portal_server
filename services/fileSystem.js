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

const [{resolve, basename}, {spawn}, {EOL, platform}, {statSync, writeFile, existsSync, readFile, readdirSync, mkdirSync, createReadStream, createWriteStream}] = [require("path"), require("child_process"), require("os"), require("fs")];
const [{throwNotExistsFile, throwParametersError}, {uuidCode}, {get}] = [require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities")), require(resolve(__dirname, "..", "config"))];
const CENTER = Symbol("CENTER");

module[CENTER] = {};

/**
 * 复制文件
 *
 * @param  {String} source  复制的目标
 * @param  {String} target    目标路径
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
    solve(resolve(target, name));
  });
});

const realMem = () => new Promise((solve, reject) => {
  const ps = spawn("ps", ["-caxm", "-orss,comm"]);
  const awk = spawn("awk", ["{ sum += $1 } END { print sum/1024}"]);

  let buf = new Buffer(0);

  ps.stdout.on("data", chunk => awk.stdin.write(chunk));
  ps.stderr.on("data", chunk => reject(new Error(chunk.toString())));
  ps.on("error", err => reject(err));
  ps.on("close", code => 0 === code ? awk.stdin.end(): reject(new Error("ps -caxm -orss,comm")));

  awk.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
  awk.stderr.on('data', err => reject(new Error(err.toString())));
  awk.on("error", err => reject(err));
  awk.on("close", code => 0 === code ? solve(buf.toString()): reject(new Error(`ps -caxm -orss= | awk '{ sum += $1 } END { print sum/1024 }' is failed`)));
});

const getSystemMem = () => new Promise((solve, reject) => {
  const vm_stat = spawn("vm_stat");
  const awk = spawn("awk", ["-F", ":" , "{print$2}"]);

  let buf = new Buffer(0);

  vm_stat.stdout.on("data", chunk => awk.stdin.write(chunk));
  vm_stat.stderr.on("data", chunk => reject(new Error(chunk.toString())));
  vm_stat.on("error", err => reject(err));
  vm_stat.on("close", code => 0 === code ? awk.stdin.end(): reject(new Error("vm_stat")));

  awk.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
  awk.stderr.on('data', err => reject(new Error(err.toString())));
  awk.on("error", err => reject(err));
  awk.on("close", code => 0 === code ? solve(buf.toString()): reject(new Error(`vm_stat | awk -F ':' '{print$2}' is failed`)));
});

const readJSON = path => new Promise((solve, reject) => {
  if (!existsSync(path)) {
    reject(throwNotExistsFile());
  }
  readFile(path, (err, buf) => {
    if (err) {
      reject(err);
    }
    let data;
    try {
      data = JSON.parse(buf.toString());
    } catch (error) {
      data = {};
    }
    solve(data);
  });
});

const writeJSON = (data, fullPath) => new Promise((solve, reject) => {
  if (data instanceof Object) {
    data = new Buffer(JSON.stringify(data));
  }
  writeFile(fullPath, data, err => {
    if (err) {
      reject(err);
    }

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
  } else {
    stat = undefined;
    return module[CENTER][identification].push(_path);
  }
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
    const tagDir = resolve(get("tmpDir"), `tmp-${uuidCode()}`);
    mkdirSync(tagDir);
    const tarXZF = spawn("tar", ["xzf", tar], {
      cwd: tagDir,
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

const compression = (name, path, ...args) => {
  if (!existsSync(path)) {
    return Promise.reject(throwNotExistsFile());
  }

  return new Promise((solve, reject) => {
    // tar -czvf *.tar ./file1 ./file1 ./file1
    const fileName = `${name}.tar.gz`;
    args.unshift(fileName);
    args.unshift(`czf`);
    const tarCZF = spawn("tar", args, {
      cwd: path,
    });

    tarCZF.stdout.on("data", chunk => console.log(`[SUCCESS] ${chunk}`));
    tarCZF.on("error", err => reject(err));
    tarCZF.on("close", code => {
      if (0 !== code) {
        reject("[FAILED] 压缩tar失败");
        return ;
      }
      solve(resolve(path, fileName));
    });
  });
};

const checkTargetPath = target => {
  if (!existsSync(target)) {
    mkdirSync(target);
  }
  const _stat = statSync(target);
  if (_stat.isFile()) {
    throwParametersError();
  }
};

function* move(source, ...args) {
  if (!existsSync(source)) {
    return Promise.reject(throwNotExistsFile());
  }
  const [target = get("staticDir")] = args;
  checkTargetPath(target);
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
    return yield Promise.all(tasks);
  } else {
    return yield cp(source, target);
  }
}

function* darwinMemoryInfo() {
  const _ = {};
  let [str, str1] = yield [getSystemMem(), realMem()];
  str = str.split(EOL);
  const datas = str.map(data => Number.parseInt(data));

  str1 = str1.split(EOL);
  _["Wired Memory"] = datas[6]*4096/1024/1024;
  _["Active Memory"] = datas[2]*4096/1024/1024;
  _["Inactive Memory"] = datas[3]*4096/1024/1024;
  _["Free Memory"] = datas[1]*4096/1024/1024;
  _["Real Mem Total"] = str1[0];

  return _;
}

function* memoryInfo() {
  if ("darwin" === platform()) {
    return yield darwinMemoryInfo();
  }
}

module.exports = {
  decompression,
  compression,
  move,
  cp,
  writeJSON,
  readJSON,
  memoryInfo,
};
