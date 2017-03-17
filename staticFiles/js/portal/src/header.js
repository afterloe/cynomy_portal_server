/**
  * afterloe - cynomy_portal_server/staticFiles/js/portal/src/header.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-10 18:02:35
  */
"use strict";

($ => {
    $(() => {

      $("#cynomy-portal-collapse").children("li").bind("mouseenter", function() {
          const subNav = $(this).find(".dropdown-menu");
          if (subNav.length === 0) {
            return ;
          }
          subNav.attr("style", "display:block;");
      });

      $("#cynomy-portal-collapse").children("li").bind("mouseleave", function() {
          const subNav = $(this).find(".dropdown-menu");
          if (subNav.length === 0) {
            return ;
          }
          subNav.removeAttr("style");
      });

    });
})(jQuery);
