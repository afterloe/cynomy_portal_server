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
      const buildProjectList = workflows => {
        const _ = [];
        for (let index in workflows) {
          _.push(`<li>
            <div>
              <i></i>
              <span class="lump">${Number.parseInt(index) + 1}</span>
              <span class="content" data-href="/portal/workflow/${workflows[index]._id}">${workflows[index].name}</span>
              <span class="processView">
                <ul class="data process">
                  ${workflows[index].process.map(item => `<li><span class="ProceIcon ${item.stat}"></span><span class="line">•••••</span></li>`).join("")}
                </ul>
              </span>
            </div>
          </li>`);
        }
        $(".projectList").find(".data.project").html(_.join(""));
      };

      const obmitWorkflowInfoByDepartment = (departmentName, chatId) => {
        $.ajax({
          url: `/workflow/department/${departmentName}`,
          type: "GET",
          dataType: "json",
          beforeSend: xhr => xhr.setRequestHeader("accept", "application/json"),
          success: result => {
            if (401.5 === result.code) {
              alert("登录许可已失效，请重新获取登录许可");
              location.href = "/portal/login";
              return ;
            }
            if (200 !== result.code) {
              alert("服务器繁忙");
            } else {
              $(".chatFooter .legend").find(`div:eq(${chatId})`).addClass("active");
              $(".projectList .catalogShadow").find("span.name").html(`${departmentName} 项目列表 (正在进行的项目)`);
              buildProjectList(result.result);
            }
          }
        });
      };

      obmitWorkflowInfoByDepartment($(".legend div:eq(0)").html(), 0);

      // 点击反馈
      $(".feedback").bind("click", () => {
          $(".popup").show();
      });

      // 点击图表 切换 工作流列表
      $(".chat").on("click", "div", function() {
        const department = $(this).attr("data-key");
        $(".chatFooter .legend").find("div").removeClass("active");
        obmitWorkflowInfoByDepartment(department, Number.parseInt($(this).attr("data-index")));
      });

      // 绑定data 下的li的单击事件
      $(".data").on("click", "li", function() {
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
