"use strict";

const [mailRegex] = [/^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})$/];

$(function() {
    const [height, width] = [$(window).height(), $(window).width()];
    if (width > 768) {
        $(".wrap").css("height", height);
    }
});

const forgetPassword = () => {
  const email = $("#userName").val();
  if (!email) {
    $("#loginInfoBox").find(".modal-body").html("请输入邮箱！");
    $("#loginInfoBox").modal("show");
    return ;
  }

  if (!mailRegex.test(email)) {
    $("#loginInfoBox").find(".modal-body").html("邮箱格式不正确!");
    $("#loginInfoBox").modal("show");
    return ;
  }

  $.ajax({
    url: `/user/${email}/forgetPassword`,
    type: "GET",
    dataType: "json",
    beforeSend: xhr => xhr.setRequestHeader("accept","application/json"),
    success: result => {
      if (200 !== result.code) {
        $("#loginInfoBox").find(".modal-body").html(result.error);
        $("#loginInfoBox").modal("show");
      } else {
        $("#loginInfoBox").find(".modal-body").html("新密码已发送至邮箱,请查收");
        $("#loginInfoBox").modal("show");
      }
    }
  });
}

const loginSystem = () => {
  const [email, permit] = [$("#userName").val(), $("#userPassword").val()];
  $.ajax({
    type: "POST",
    url: "/user/login",
    dataType: "json",
    beforeSend: xhr => {
      xhr.setRequestHeader("accept","application/json");
    },
    data: {
      mail: email,
      permit: permit,
    },
    success: result => {
      if (200 !== result.code) {
        $("#error").attr("style", "display: block;");
        $("#error").html(result.error);
      } else {
        $("#error").attr("style", "display: none;");
        localStorage.setItem("permit", result.result);
        location.href = $("#fm").attr("data-href");
      }
    }
  });
};
