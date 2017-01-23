/**
  * afterloe - cynomy_portal_server/tools/mailHelper.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-23 19:28:18
  */
"use strict";

const [nodemailer, {noop}, {hostname}, {resolve}] = [require('nodemailer'), require('utility'), require('os'), require("path")];
const {subMail} = require(resolve(__dirname, "utilities"));
const [SMTP, TRANSPORT, NODENAME] = [Symbol("SMTP"), Symbol("TRANSPORT"), Symbol("NODENAME")];
const {get} = require(resolve(__dirname, "..", "config"));

module[SMTP] = get("mailSender");
// let {appName, mailSender, smtpConfig} = administration;

/**
 * 发送日志同知级别邮件
 *
 * @param  {String|Array} to        [被通知用户邮箱号 或一组被通知用户的邮箱号组]
 * @param  {String} level           [日志级别]
 * @param  {String} subject         [邮件标题]
 * @param  {String} html            [邮件内容]
 * @param  {function} [callback=noop] [回调函数]
 */
exports.notice = (to, level, subject, html, callback = noop) => {
  subject = `[${module[NODENAME]}][${level}][${hostname()}] ${subject}`; //标题
  html = String(html);//html内容
  if (mailSender.enable === false) {
    console.log("[send mail debug] [%s] to: %s, subject: %s\n%s", new Date(), to, subject, html);
    return callback();
  }
  exports.sendPromise(to, subject, html.replace(/\n/g, "<br/>"))
    .then(() => callback())
    .catch(err => callback(err));
};

const LEVELS = ["log", "warn", "error"];
LEVELS.map(level => {
  exports[level] = (to, subject, html, callback) => exports.notice(to, level, subject, html, callback);
});

/**
 * 发送邮件
 *
 * @param  {String|Array} to        [被通知用户邮箱号 或一组被通知用户的邮箱号组]
 * @param  {String} subject         [邮件标题]
 * @param  {String} html            [邮件内容]
 */
exports.sendPromise = (to, subject, html) => new Promise((resolve, reject) => {
  if (!module[TRANSPORT]) {
    module[TRANSPORT] = nodemailer.createTransport(smtpConfig);
  }

  transport.sendMail({
    from: module[SMTP].from || module[SMTP].sender,
    to,
    subject,
    html
  }, (err, result) => {
    if (err) {
      reject(err);
    }
    console.log("%s sender mail to %s success", new Date(), to);
    resolve(result);
  });
});

/*
 * Send email -- callback.
 *
 * @param {String|Array} to, email or email list.
 * @param {String} subject
 * @param {String} html
 * @param {Function(err, result)} callback
 */
exports.send = (to, subject, html, callback = noop) => {
  exports.sendPromise(to, subject, html)
    .then(() => callback())
    .catch(err => callback(err));
};
