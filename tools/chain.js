/**
  * afterloe - cynomy_portal_server/tools/chain.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-19 13:51:37
  */
"use strict";

const NEXT = Symbol("nextChain"); // 下一个节点的标识

/**
 * 职责链
 */
class Chain {
    /**
     *  返回下一个节点的标识
     */
    static next() {
        return NEXT;
    }

    /**
     *  构造函数
     *
     *  @param  {Function} fn [执行函数]
     */
    constructor(fn) {
        if (fn instanceof Function) {
            this.fn = fn;
            this.successor = null;

        } else {
            throw new Error("mast be a function!");
        }
    }

    /**
     *  设置下一个节点
     *
     *  @param  {Chain} chainObject [职责链条对象]
     */
    setNext(chainObject) {
        if (chainObject instanceof Chain) {
            this.successor = chainObject;
            return chainObject;
        } else {
            throw new Error("mast be a chainObject");
        }
    }

    /**
     * 开始请求
     *
     * @param  {[...]} param [职责连数据]
     */
    passRequest(...args) {
        const ret = this.fn.apply(this, args);
        if (NEXT === ret) {
            return this.successor && this.successor.passRequest.apply(this.successor, args);
        }
        return ret;
    }
}

module.exports = Chain;
