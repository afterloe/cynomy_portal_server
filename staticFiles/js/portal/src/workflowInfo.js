/**
  * afterloe - cynomy_portal_server/staticFiles/js/portal/src/workflowInfo.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-5 06:35:47
  */
"use strict";

$(function() {
    //进入该页面，content_one从上往下运动
    const width = $(window).width();
    if (width > 768) {
        var contentOne = $(".content_one").height();
        var height = -contentOne;
        $(".content_one").css("margin-top", height);
        $(".content_one").animate({
            "margin-top": 0
        }, 1000, function() {
            $(".content_one").css("margin-top", 0);
        });
    } else {
        $(".content_one").css("margin-top", 0);
    }
});

const cleanSelectd = (nodeName) => {
  $("dl").attr("class", "");
};

const buildInstancePage = ({name, _id, beginTimestamp, owner, svn, uploadCount}) => {
  $("#nodeName").html(name);
  if (owner) {
    $("#nodeOwner").html(`${owner.name} (${owner.mail})`);
  } else {
    $("#nodeOwner").html("未设置负责人");
  }

  $("#nodeBeginTime").html(beginTimestamp === "" ? "未进入该节点": new Date(beginTimestamp).toLocaleString());
  $("#nodeUpdateCount").html(uploadCount);
  if (svn) {
    $("#nodeSvnInfo").html(`<a href="${svn}">${svn}</a>`);
  } else {
    $("#nodeSvnInfo").html(`<a href="javascript:void(0)">-</a>`);
  }
  $(".change").attr("data-id", _id);
};

const loadNodeInstance = btn => {
  const instanceId = $(btn).attr("data-id");
  $.ajax({
    type: "GET",
    url: `/workflow/nodeInstance/${instanceId}`,
    dataType: "json",
    beforeSend: xhr => xhr.setRequestHeader("accept","application/json"),
    success: result => {
      if (401.5 === result.code) {
        alert("登录许可已失效，请重新获取登录许可");
        location.href = "/portal/login";
        return ;
      }
      if (200 !== result.code) {
        alert("服务器繁忙");
      } else {
        cleanSelectd();
        $(btn).parent().attr("class", "processActive");
        buildInstancePage(result.result);
      }
    }
  });
};

// 点击反馈跳转到bbs
$(".proposal").bind("click", function() {
    window.open("http://bbs.jwis.cn/forum.php?mod=forumdisplay&fid=37");
});
