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
const [{searchProduct, workflowInfo}, {findTags}] = [require(resolve(services, "workflowService")), require(resolve(services, "tagsService"))];

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

const findWorkflowByTags = function* (equipment, tags) {
  const _ = {};
  for(let tag of tags) {
    const result = yield searchProduct(equipment, tag);
    Object.assign(_, {
      [tag]: result
    });
  }
  return _;
};

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
      const list = yield findWorkflowByTags(equipment, platformTags);
      Object.assign( __, {
        [equipment]: list
      });
    }

    Object.assign(_, {
      products: __
    });

    // if (_[equipmentTags[0]].length > 0) {
    //   Object.assign( _, {
    //     product: yield workflowInfo(_[equipmentTags[0]][0]._id)
    //   });
    // }

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
    this.pageName = "product";
    this.data = {
      title: "R&D Portal - product",
      index: 3,
    };
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
    this.pageName = "directory";
    this.data = {
      title: "R&D Portal - directory",
      index: 4,
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
