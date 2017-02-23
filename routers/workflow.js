/**
  * afterloe - cynomy_portal_server/routers/workflow.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-2 16:14:38
  */
"use strict";

const {resolve} = require("path");
const services = resolve(__dirname, "..", "services");
const [{getWorkflowList, workflowInfo, getWorkflowNode, searchProduct}, {findTags}, {getPublicGoodsesList}] =
[require(resolve(services, "workflowService")), require(resolve(services, "tagsService")), require(resolve(services, "goodsService"))];

const list = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {number, page} = this.params;
    this.data = yield getWorkflowList(number, page);
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

const simpleInfo = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {id} = this.params;
    this.data = yield workflowInfo(id, {name : 1, nodeList: 1, status: 1});
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

const nodeFiles = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {nodeId} = this.params;
    this.data = yield getWorkflowNode(nodeId, {produceList: 1});
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

const overviewsPlatform = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const platformTags = yield findTags("平台");// 获取平台标签
    const data = [];
    for (let tag of platformTags) {
      const products = yield searchProduct(tag, "平台");
      data.push({
        platformName: tag,
        products: products.map(product => ({
          produceId: product._id,
          productName: product.name,
          productLink:"https://www.baidu.com",
          status: product.process
        })),
      });
    }
    this.data = data;
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

const overviewsProduct = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const platformTags = yield findTags("平台");// 获取平台标签
    const data = [];
    for (let tag of platformTags) {
      const products = yield searchProduct(tag, "app");
      data.push({
        platformName: tag,
        products: products.map(product => ({
          produceId: product._id,
          productName: product.name,
          productLink:"https://www.baidu.com",
          status: product.process
        })),
      });
    }
    this.data = data;
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

const overviewsDirectory = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const _ = yield getPublicGoodsesList();
    this.data = [{
      platformName: "公用文件",
      products: _.map(file => ({
        produceId: file._id,
        productName: file.name,
        productLink: `/fs/download/${file._id}`,
      }))
    }];
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

const detail = function* (next) {
  if (this.error) {
    return yield next;
  }

  try {
    const {id} = this.params;
    this.data = yield workflowInfo(id, {name : 1, nodeList: 1, status: 1});
  } catch (err) {
    this.error = err;
  }

  return yield next;
};

module.exports = {
  list,
  nodeFiles,
  simpleInfo,
  detail,
  overviewsPlatform,
  overviewsProduct,
  overviewsDirectory,
};
