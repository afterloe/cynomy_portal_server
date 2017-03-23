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
  {searchProduct, workflowInfo},
] = [
  require(resolve(services, "workflowService")),
];

function* home(next) {
  if (this.error) {
    return yield next;
  }
  try {
    const [user, products] = yield [this.authorized, searchProduct("自主交付部")];
    const product = products.length === 0 ? {} : yield workflowInfo(products[0]._id);
    const {members = []} = product;

    const index = members.findIndex(member => member.mail === user.mail);

    this.pageName = "adHome";
    this.data = {
      title: "A&D Portal",
      index: 3,
      user,
      products,
      product,
      allowedUpload: index === -1 ? false:true,
    };

  } catch (err) {
    this.error = err;
  }

  return yield next;
}

module.exports = {
  home,
};
