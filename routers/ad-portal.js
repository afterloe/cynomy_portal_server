/**
  * afterloe - cynomy_portal_server/routers/rd-portal.js
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
const [
  {getPublicGoodsesList},
  {searchProduct, workflowInfo},
  {findTags}
] = [
  require(resolve(services, "goodsService")),
  require(resolve(services, "workflowService")),
  require(resolve(services, "tagsService"))
];

function* home(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const [user, products] = yield [this.authorized, searchProduct("自主交付部")];
    const product = products.length === 0 ? {} : yield workflowInfo(products[0]._id);
    const {members} = product;

    const index = members.findIndex(member => member.mail === user.mail);

    this.pageName = "adHome";
    this.data = {
      title: "A&D Portal",
      index: 3,
      user,
      products,
      product,
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
    const [equipmentTags, platformTags, user] = yield [findTags("设备"), findTags("平台"), this.authorized];

    const _ = {
      title: "R&D Portal - platform",
      index: 2,
      user,
    };

    const __ = {};

    for(let equipment of equipmentTags) {
      Object.assign(__, {
        [equipment]: yield findWorkflowByTags(equipment, platformTags),
      });
    }

    const product = yield findActiveWorkflowExample(__);
    const {members} = product;

    const index = members.findIndex(member => member.mail === user.mail);

    Object.assign(_, {
      products: __,
      product,
      allowedUpload: index === -1 ? false:true,
    });

    this.pageName = "platform";
    this.data = _;
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* product(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const [equipmentTags, platformTags, user] = yield [findTags("设备"), findTags("产品"), this.authorized];
    const _ = {
      title: "R&D Portal - product",
      index: 2,
      user,
    };

    const __ = {};

    for(let equipment of equipmentTags) {
      Object.assign(__, {
        [equipment]: yield findWorkflowByTags(equipment, platformTags, "应用"),
      });
    }

    const product = yield findActiveWorkflowExample(__);
    const {members} = product;

    const index = members.findIndex(member => member.mail === user.mail);

    Object.assign(_, {
      products: __,
      product,
      allowedUpload: index === -1 ? false:true,
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
      index: 2,
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
  product,
  directory,
};
