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
const {getWorkflowList, workflowInfo, getWorkflowNode} = require(resolve(__dirname, "..", "services", "workflowService"));

const data = [
    {
        platformName:'平台1',
        products:[
            {
                productName:'TRU Matsfsdfsdfsdsde V1.0.1',
                productLink:'tru.jwis.cn',
                status:[1,2,3,4]
            },
            {
                productName:'TRU Matsfsdfsdfsdsde V1.0.1',
                productLink:'tru.jwis.cn',
                status:[1,2,3,4]
            }
        ]
    },
    {
        platformName:'平台1',
        products:[
            {
                productName:'TRU Matsfsdfsdfsdsde V1.0.1',
                productLink:'tru.jwis.cn',
                status:[1,2,3,4]
            },
            {
                productName:'TRU Matsfsdfsdfsdsde V1.0.1',
                productLink:'tru.jwis.cn',
                status:[1,2,3,4]
            }
        ]
    },
    {
        platformName:'平台1',
        products:[
            {
                productName:'TRU Matsfsdfsdfsdsde V1.0.1',
                productLink:'tru.jwis.cn',
                status:[1,2,3,4]
            },
            {
                productName:'TRU Matsfsdfsdfsdsde V1.0.1',
                productLink:'tru.jwis.cn',
                status:[1,2,3,4]
            }
        ]
    }
];

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
    this.data = data;
  } catch (err) {
    this.error = err;
  }

  return yield next;
};
module.exports = {
  list,
  nodeFiles,
  simpleInfo,
  overviewsPlatform,
  overviewsProduct,
  overviewsDirectory,
};
