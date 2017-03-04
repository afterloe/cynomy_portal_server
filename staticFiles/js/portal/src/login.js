$(function() {
    //占满屏幕
    //获取窗口高度
    var height = $(window).height();
    var width = $(window).width();
    if (width > 768) {
        $(".wrap").css("height", height);
    }

    const loginSystem = () => {
      const [email, permit] = [$("#userName").val(), $("#userPassword").val()];
      $.ajax({
        type: "POST",
        url: "/user/login",
        dataType: "json",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("accept","application/json");
        },
        data: {
          mail: email,
          permit: permit,
        },
        success: function(result) {
          if (200 !== result.code) {
            $("#error").attr("style", "display: block;");
            $("#error").html(result.error);
          } else {
            $("#error").attr("style", "display: none;");
            localStorage.setItem("permit", result.result);
            location.href = "/portal/home";
          }
        }
      });
    };

    $("#obmitLoginPermit").click(function() {
      var email = $("#userName").val();
      if (!email) {
        $("#error").attr("style", "display: block;");
        $("#error").html("请输入邮箱！");
        return ;
      }

      $.ajax({
        url: "/user/" + email +"/loginPermit",
        type: "GET",
        dataType: "json",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("accept","application/json");
        },
        success: function(result) {
          if (200 !== result.code) {
            $("#error").attr("style", "display: block;");
            $("#error").html(result.error);
          } else {
            $("#error").attr("style", "display: none;");
            alert("许可已发送至邮箱请查收");
          }
        }
      });
    });
});
