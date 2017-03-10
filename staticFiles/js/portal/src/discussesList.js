/**
  * afterloe - cynomy_portal_server/staticFiles/js/portal/src/discussesList.js
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
    $(".discussFooter").on("click", "span:eq(1)", function() {
      const discuss_id = $(this).parent().parent().attr("data-id");
      location.href = `/discuss/${discuss_id}`;
    });
  });
})(jQuery);
