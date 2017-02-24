/**
  * afterloe - cynomy_portal_server/routers/portal.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-14 14:35:58
  */
"use strict";

const {resolve} = require("path");
const services = resolve(__dirname, "..", "services");
const [{getPublicGoodsesList}, {searchProduct, workflowInfo}, {findTags}] = [require(resolve(services, "goodsService")), require(resolve(services, "workflowService")), require(resolve(services, "tagsService"))];

const findWorkflowByTags = function* (equipment, tags, ...hooks) {
  const _ = {};
  for(let tag of tags) {
    const __ = [equipment, tag].concat(hooks);
    const result = yield searchProduct.apply(null, __);
    Object.assign(_, {
      [tag]: result
    });
  }
  return _;
};

const findActiveWorkflowExample = function* (data) {
  for (let equipment in data) {
    for(let list in data[equipment]) {
      if (data[equipment][list].length > 0) {
        return yield workflowInfo(data[equipment][list][0]._id);
      }
    }
  }
};

function* login(next) {
  if (this.error) {
    return yield next;
  }

  try {
    this.pageName = "login";
    this.data = {
      title: "R&D Portal login",
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* home(next) {
  if (this.error) {
    return yield next;
  }
  try {
    this.pageName = "home";
    this.data = {
      title: "R&D Portal",
      index: 1,
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

/**
 * 跳转 - 平台页
 *
 * @param  {Function}  next [koa context]
 * @return {Generator}      [next middleware]
 */
function* platform(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const [equipmentTags, platformTags] = yield [findTags("设备"), findTags("平台")];

    const _ = {
      title: "R&D Portal - platform",
      index: 2,
    };

    const __ = {};

    for(let equipment of equipmentTags) {
      Object.assign(__, {
        [equipment]: yield findWorkflowByTags(equipment, platformTags),
      });
    }

    Object.assign(_, {
      products: __,
      product: yield findActiveWorkflowExample(__),
    });

    this.pageName = "platform";
    this.data = _;
  } catch (err) {
    console.log(err);
    this.error = err;
  }

  return yield next;
}

function* product(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const [equipmentTags, platformTags] = yield [findTags("设备"), findTags("产品")];
    const _ = {
      title: "R&D Portal - product",
      index: 3,
    };

    const __ = {};

    for(let equipment of equipmentTags) {
      Object.assign(__, {
        [equipment]: yield findWorkflowByTags(equipment, platformTags, "应用"),
      });
    }

    Object.assign(_, {
      products: __,
      product: yield findActiveWorkflowExample(__),
    });

    this.pageName = "platform";
    this.data = _;
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* directory(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const produceList = yield getPublicGoodsesList();
    this.pageName = "directory";
    this.data = {
      title: "R&D Portal - directory",
      index: 4,
      produceName: "",
      produceList,
    };
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

module.exports = {
  home,
  platform,
  login,
  product,
  directory,
};
