/**
  * afterloe - cynomy_portal_server/tools/utilities.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 18:49:50
  */
"use strict";

const [uuid, {readFileSync}] = [require("node-uuid"), require("fs")];

const verificationCodeDictionary = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    securityCodeDictionary = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const [verificationCodeDictionaryLength, securityCodeDictionaryLength] = [verificationCodeDictionary.length, securityCodeDictionary.length];

/**
 * 生成短位安全码
 *
 * @param number
 */
const securityCode = (number = 6) => {
    let [need, i] = [[], 0];
    do {
        let index = Math.floor(Math.random() * securityCodeDictionaryLength);
        need.push(securityCodeDictionary[index]);
        i++;
    } while (i < number);
    return need.join("");
};

/**
 * 生成随机码
 *
 * @param number
 * @returns {string}
 */
const randomCode = (number = 4) => {
    let [need, i] = [[], 0];
    do {
        let index = Math.floor(Math.random() * verificationCodeDictionaryLength);
        need.push(verificationCodeDictionary[index]);
        i++;
    } while (i < number);
    return need.join("");
};

/**
 * UUID 生成器 生成唯一id，标示某个记录
 *
 * @returns {string}
 */
const uuidCode = () => uuid.v1().split("-").join("");

/**
 * 隐藏敏感信息
 *
 * @param mail
 * @returns {*}
 */
const subMail = mail => {
    let tempStr = "";
    mail = mail.replace(/(..)(.+)(@)/g, ($1, $2, $3, $4) => {
        for (var i = $3.length - 1; i >= 0; i--) {
            tempStr += "*";
        }
        return $2 + tempStr + $4;
    });
    return mail;
};

/**
 * 读取客制化数据
 *
 * @param  {String} __path 客制化文件存放位置
 * @return {Object}        key-value 数据
 */
const readyConfig = __path => {
  try {
    const buf = readFileSync(__path);
    return JSON.parse(buf.toString());
  } catch (error) {
    return {};
  }
};

module.exports = {
  randomCode,
  readyConfig,
  uuidCode,
  randomNum: securityCode,
  subMail,
};
