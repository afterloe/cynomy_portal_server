/**
  * afterloe - cynomy_portal_server/tools/security.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 18:50:03
  */
"use strict";

const [{createCipher, createDecipher, createHmac, createHash}, {resolve}, {existsSync, createReadStream}] = [require("crypto"), require("path"), require("fs")];
const {get} = require(resolve(__dirname, "..", "config"));
const {outEncoding = "hex", algorithm = "des3", intEncoding = "ascii", securityKey = "cynomy_mkt"} = get("security");
const secret = "afterloe <lm6289511@gmail.com> (https://github.com/afterloe)";

/**
 * 加密
 *
 * @param buf
 * @returns {string}
 */
const cipher = buf => {
    let encrypted = "",
        cip = createCipher(algorithm, securityKey);
    encrypted += cip.update(buf, intEncoding, outEncoding);
    encrypted += cip.final(outEncoding);
    return encrypted;
};

/**
 * 解密
 *
 * @param encryptedBuf
 * @returns {string}
 */
const decipher = encryptedBuf => {
    let decrypted = "",
        decipher = createDecipher(algorithm, securityKey);
    decrypted += decipher.update(encryptedBuf, outEncoding, intEncoding);
    decrypted += decipher.final(intEncoding);
    return decrypted;
};

/**
 * 签名校验
 *
 * @param buf
 * @returns {*}
 */
const sign = buf => {
    const hash = createHmac("RSA-SHA512", secret)
        .update(buf)//有记忆功能，将字符串相加
        .digest("base64");//将字符串以base64格式打印出来
    return hash;
};

/**
 * 计算文件的Hash 值 - sha256
 *
 * @param path
 * @returns {Promise}
 * @constructor
 */
const hash_sha256 = __path => new Promise((solve, reject) => {
  if (!existsSync(__path)) {
    reject(new Error("file is not exist"));
    return ;
  }
  let [input, hash, code] = [createReadStream(__path), createHash("sha256")];
  input.pipe(hash);
  hash.on("data", chunk => code = chunk.toString("hex"));
  hash.on("end", () => solve(code));
  hash.on("error", error => reject(error));
});

module.exports = {cipher, decipher, sign, hash_sha256};
