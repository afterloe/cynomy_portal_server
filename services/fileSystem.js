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

const [{resolve, basename}, {spawn}, {EOL, platform, hostname, networkInterfaces, cpus}, {statSync, writeFile, existsSync, readFile, readdirSync, mkdirSync, createReadStream, createWriteStream}] = [require("path"), require("child_process"), require("os"), require("fs")];
const [{throwNotExistsFile, throwParametersError}, {uuidCode}, {get}] = [require(resolve(__dirname, "..", "errors")), require(resolve(__dirname, "..", "tools", "utilities")), require(resolve(__dirname, "..", "config"))];
const [CENTER, MINIMUM] = [Symbol("CENTER"), Symbol("MINIMUM")];

module[CENTER] = {};
module[MINIMUM] = new Map();

module[MINIMUM].set(".doc", "application/msword");
module[MINIMUM].set(".ppt", "application/x-ppt");
module[MINIMUM].set(".pdf", "application/pdf");
module[MINIMUM].set(".xls", "application/vnd.ms-excel");
module[MINIMUM].set(".dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template");
module[MINIMUM].set(".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
module[MINIMUM].set(".ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow");
module[MINIMUM].set(".potx", "application/vnd.openxmlformats-officedocument.presentationml.template");
module[MINIMUM].set(".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
module[MINIMUM].set(".xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template");
module[MINIMUM].set(".js", "application/x-javascript");
module[MINIMUM].set(".rar", "application/x-zip-compressed");
module[MINIMUM].set(".zip", "application/x-zip-compressed");

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

const hardDisk = num => new Promise((solve, reject) => {
  const df = spawn("df", ["-h"]);
  const awk = spawn("awk", [`{print$${num}}`]);

  let buf = new Buffer(0);

  df.stdout.on("data", chunk => awk.stdin.write(chunk));
  df.stderr.on("data", chunk => reject(new Error(chunk.toString())));
  df.on("error", err => reject(err));
  df.on("close", code => 0 === code ? sed.stdin.end(): reject(new Error("ps -caxm -orss,comm")));

  awk.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
  awk.stderr.on('data', err => reject(new Error(err.toString())));
  awk.on("error", err => reject(err));
  awk.on("close", code => 0 === code ? solve(buf.toString().split(EOL)): reject(new Error(`df -h | awk '{print$${num}}' is failed`)));
});

const uname = () => new Promise((solve, reject) => {
  const uname = spawn("uname", ["-a"]);

  let buf = new Buffer(0);

  uname.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
  uname.stderr.on('data', err => reject(new Error(err.toString())));
  uname.on("error", err => reject(err));
  uname.on("close", code => 0 === code ? solve(buf.toString()): reject(new Error(`uname -a is failed`)));
});

const linuxRealMem = () => new Promise((solve, reject) => {
  const ps = spawn("ps", ["-aux"]);
  const awk = spawn("awk", ["{ sum += $6 } END { print sum/1024}"]);

  let buf = new Buffer(0);

  ps.stdout.on("data", chunk => awk.stdin.write(chunk));
  ps.stderr.on("data", chunk => reject(new Error(chunk.toString())));
  ps.on("error", err => reject(err));
  ps.on("close", code => 0 === code ? awk.stdin.end(): reject(new Error("ps -caxm -orss,comm")));

  awk.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
  awk.stderr.on('data', err => reject(new Error(err.toString())));
  awk.on("error", err => reject(err));
  awk.on("close", code => 0 === code ? solve(buf.toString()): reject(new Error(`ps -aux | awk '{ sum += $6 } END { print sum/1024 }' is failed`)));
});

const getLinuxSystemMem = () => new Promise((solve, reject) => {
  const free = spawn("free", ["-m"]);
  const sed = spawn("sed", ["-n 2p"]);

  let buf = new Buffer(0);

  free.stdout.on("data", chunk => sed.stdin.write(chunk));
  free.stderr.on("data", chunk => reject(new Error(chunk.toString())));
  free.on("error", err => reject(err));
  free.on("close", code => 0 === code ? sed.stdin.end(): reject(new Error("ps -caxm -orss,comm")));

  sed.stdout.on("data", chunk => buf = Buffer.concat([buf, chunk], buf.length + chunk.length));
  sed.stderr.on('data', err => reject(new Error(err.toString())));
  sed.on("error", err => reject(err));
  sed.on("close", code => 0 === code ? solve(buf.toString()): reject(new Error(`free -m | sed -n '2p' is failed`)));
});

const darwinRealMem = () => new Promise((solve, reject) => {
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

const getDarwinSystemMem = () => new Promise((solve, reject) => {
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

const getGoodsFileInfo = goods => {
  const {name, type, batch} = goods;
  const goodsFilePath = resolve(get("staticDir"), batch, name);

  if(!existsSync(goodsFilePath)) {
    throwNotExistsFile();
  }

  const mimeType = module[MINIMUM].has(type)? module[MINIMUM].get(type): "application/octet-stream";
  const size = statSync(goodsFilePath).size;
  return {
    fileName: encodeURI(name),
    size,
    mimeType,
    path: goodsFilePath
  }
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

function* linuxMemoryInfo() {
  const _ = {};
  let [str, str1] = yield [getLinuxSystemMem(), linuxRealMem()];
  str = str.split(EOL);
  const datas = str.map(data => Number.parseInt(data));
  _["Used Memory"] = datas[2];
  _["Shared Memory"] = datas[4];
  _["Free Memory"] = datas[3];
  _["Available Memory"] = datas[6];

  str1 = str1.split(EOL);
  _["Real Mem Total"] = str1[0];

  return _;
}

function* darwinMemoryInfo() {
  const _ = {};
  let [str, str1] = yield [getDarwinSystemMem(), darwinRealMem()];
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
  const platform = platform();
  if ("darwin" === platform) {
    return yield darwinMemoryInfo();
  } else if ("linux" === platform) {
    return yield linuxMemoryInfo();
  }

  return {};
}

function* hardDiskInfo() {
  const [diskName, diskSize, diskTotal, diskEnable, diskPercentage, where] = yield [hardDisk(1), hardDisk(2), hardDisk(3), hardDisk(4), hardDisk(5), hardDisk(6)];
  const _ = {};
  diskName.map((name, index) => {
    _[name] = {
      size: diskName[index],
      total: diskTotal[index],
      enable: diskEnable[index],
      percentage: diskPercentage[index],
      where: where[index],
    };
  });

  return _;
}

function* systemInfo() {
  const [hostName, network, platform, cpus] = [hostname(), networkInterfaces(), platform(), cpus()];
  const uname = yield uname();
  return {
    hostName,
    network,
    platform,
    cpus,
    uname,
  };
}

module.exports = {
  decompression,
  compression,
  getGoodsFileInfo,
  move,
  cp,
  writeJSON,
  readJSON,
  memoryInfo,
  systemInfo,
};
