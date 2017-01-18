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
 * 短位安全码
 *
 * @param  {Integer} [number=6]     [验证码长度]
 * @throw {Error}                   [当参数不为整型的时候抛出 parameter type error的异常]
 * @returns {string}                [指定长度的验证码字符串]
 */
const securityCode = (number = 6) => {
  if (!Number.isInteger(number)) {
    throw new Error("parameter type error");
  }
  let [need, i] = [[], 0];
  while (i < number){
    let index = Math.floor(Math.random() * securityCodeDictionaryLength);
    need.push(securityCodeDictionary[index]);
    i++;
  }
  return need.join("");
};

/**
 * 生成随机码
 *
 * @param {Integer}  [number=4]     [验证码长度]
 * @throw {Error}                   [当参数不为整型的时候抛出 parameter type error的异常]
 * @returns {string}                [指定长度的验证码字符串]
 */
const randomCode = (number = 4) => {
    if (!Number.isInteger(number)) {
      throw new Error("parameter type error");
    }
    let [need, i] = [[], 0];
    while (i < number) {
      let index = Math.floor(Math.random() * verificationCodeDictionaryLength);
      need.push(verificationCodeDictionary[index]);
      i++;
    }
    return need.join("");
};

/**
 * UUID生成器
 *
 * @return {String} [32位随机字符串]
 */
const uuidCode = () => uuid.v1().split("-").join("");

/**
 * 隐藏邮箱信息
 *
 * @param  {String} mail [需要隐藏的邮箱]
 * @return {String}      [隐藏后的邮箱字符串]
 */
const subMail = mail => {
  let tempStr = "";
  mail = mail.replace(/(..)(.+)(@)/g, ($1, $2, $3, $4) => {
    for (let i = $3.length - 1; i >= 0; i--) {
      tempStr += "*";
    }
    return $2 + tempStr + $4;
  });

  return mail;
};

/**
 * 读取客制化数据
 *
 * @param  {String} __path [客制化文件存放位置]
 * @return {Object}        [key-value 数据]
 */
const readyConfig = __path => {
  try {
    const buf = readFileSync(__path);
    return JSON.parse(buf.toString());
  } catch (error) {
    return {};
  }
};

/**
 * 检查对象是否包含属性
 *
 * @param  {Object} _    [要检测的对象]
 * @param  {String} args [可变参数, 需要检测的属性]
 * @return {String}      [缺少的属性名]
 */
const checkParameter = (_, ...args) => {
  for (let i = 0; i < args.length; i++) {
    if (!_[args[i]]) {
      return args[i];
    }
  }
};

module.exports = {
  randomCode,
  readyConfig,
  uuidCode,
  randomNum: securityCode,
  subMail,
  checkParameter,
};
