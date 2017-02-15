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

// const {resolve} = require("path");

function* login(next) {
  if (this.error) {
    return yield next;
  }

  try {
    if ("web" === this.way) {
      this.render("login", {
        title: "R&D Portal login",
      });
    }
  } catch (err) {
    this.error = err;
  }

  return yield next;
}

function* platform(next) {
  if (this.error) {
    return yield next;
  }
  try {
    if ("web" === this.way) {
      this.render("platform", {
        title: "R&D Portal - platform",
      });
    }
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
    if ("web" === this.way) {
      this.render("home", {
        title: "R&D Portal",
      });
    }
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
    if ("web" === this.way) {
      this.render("product", {
        title: "R&D product",
      });
    }
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
    if ("web" === this.way) {
      this.render("directory", {
        title: "R&D directory",
      });
    }
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
