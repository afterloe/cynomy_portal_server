/**
  * afterloe - cynomy_portal_server/staticFiles/js/portal/src/home.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-10 18:07:26
  */
"use strict";

const openNotice = () => location.href = `/notice/50/1`;
const openDiscuss = () => location.href = `/discuss/50/1`;

($ => {
  $(() => {

    // 点击反馈
    $(".feedback").bind("click", () => {
        $(".popup").show();
    });

    $(".data > li").bind("click", function() {
        const href = $(this).find(".content").attr("data-href");
        location.href = href;
    });

    // 关闭反馈
    $(".popup").on("click", ".btn_close", () => {
        $(".popup").css("display", "none");
    });

    // 关闭反馈
    $(".popup").on("click", ".submit_re", () => {
      const content = $(".feedbackContent.form-control").val();
      const mail = $(".last").find("input").val();
      $(".popup").css("display", "none");
      $.ajax({
        type: "POST",
        url: `/discuss`,
        dataType: "json",
        data: {
          content, mail
        },
        beforeSend: xhr => xhr.setRequestHeader("accept","application/json"),
        success: result => {
          if (200 !== result.code) {
            alert("服务器繁忙");
          } else {
            $(".feedbackContent.form-control").val("");
          }
        }
      });
    });

    $(".downButton").bind("click", function() {
        const __self = $(this);
        const className = __self.hasClass("down") ? "up":"down";
        __self.attr("class","");
        __self.attr("class", `downButton ${className}`);
    });

  });
})(jQuery);
