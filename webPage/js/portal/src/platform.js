$(function() {
    //弹窗出来后的一些操作
    var input = document.getElementById("source");
    //文件域选择文件时, 执行readFile函数,把上传的文档信息放置dataFile中
    input.addEventListener('change', readFile, false);
    var i = 1;
    function readFile() {
        var file = this.files[0];
        console.log(file);
        console.log("文件名:" + file.name);
        console.log("文件类型:" + file.type);
        console.log("文件大小:" + file.size);
        var date = new Date();
        var dateString = date.toLocaleDateString();

        //把每次上传的文档名字传入dataFile
        var html = "<li><span>" + (i++) + "、</span><span>" + file.name + "</span><span>" + dateString + "</span><span class='closeFile'></span></li>";
        $(".dataFile").append(html);
        //点击关闭按钮，取消该项文档的添加
        $(".closeFile").on("click", function() {
            console.log($(this).parent("li"))
            $(this).parent("li").remove();
        });
    }

    // 点击反馈跳转到bbs
    $(".proposal").bind("click", function() {
        window.open("http://bbs.jwis.cn/forum.php?mod=forumdisplay&fid=37");
    });

    //关闭遮罩层
    $(".btn_close").on("click", function() {
        $(".popup").css("display", "none");
    });
    //打开遮罩层
    $(".upload").on("click", function() {
        $(".popup").css("display", "block");
    });

    //点击关闭按钮，取消该项文档的添加
    $(".dataClose").on("click", function() {
        console.log($(this).parent("div").parent("li"))
        $(this).parent("div").parent("li").remove();
    });
    //进入该页面，content_one从上往下运动
    var width = $(window).width();
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

    //点击不同端的不同产品，显示wrapper 默认显示第一个
    $(".aLink").on("click", function() {
        //动态wrapper

        //tab切换
        $("body .tab_process").find("dl").on("click", function() {
            $(this).addClass("processActive").siblings("dl").removeClass("processActive");
            //每次点击更换 dataBox中的内容
        });
    });

});

const downLoadFile = (btn) => {
  window.open("/fs/download/" + $(btn).attr("data-id"));
};

const cleanSelect = () => {
  $(".aLink").each(function() {
    $(this).css({color: "#333"});
  });
};

const cleanSelectd = () => {
  $("dl").attr("class", "");
}

const buildProcess = (nodeList, actionNum) => {
  const html = nodeList.map((node, index) => `<dl class=${actionNum === index? "processActive":""}>
    <dt data-id=${node._id} onClick="javascript:showFiles(this);">
      <a class="tabIcon tabIcon_plan" href="javascript:void(0);"></a>
      <span>${node.name}</span>
    </dt>
    <dd>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</dd>
    <div class="clear"></div>
  </dl>`);
  $(".tab_process:first").html(html.join(""));
};

const timeToDate = time => {
  if (!time) {
    return new Date().toLocaleString();
  }
  const data = new Date(time);
  return data.toLocaleString();
};

const buildFiles = (files) => {
  const html = files.map((file) => `<li>
    <div>
      <i></i>
      <span class="name" data-id=${file._id} onClick="javascript:downLoadFile(this);">
        <a href="javascript:void(0)">${file.name}</a>
      </span>
      <span class="time">${timeToDate(file.uploadTime)}</span>
      <span>${file.downloadCount || 0}</span>
      <span>${file.author ? file.author.name : "admin"}</span>
      <span data-id=${file._id} class="download" onClick="javascript:downLoadFile(this);"></span>
    </div>
  </li>`);
  $(".data:last").html(html.join(""));
};

const showFiles = btn => {
  const id = $(btn).attr("data-id");
  $.ajax({
    type: "GET",
    url: `/workflow/${id}/files`,
    dataType: "json",
    beforeSend: xhr => xhr.setRequestHeader("accept","application/json"),
    success: result => {
      if (200 !== result.code) {
        alert("服务器繁忙");
      } else {
        cleanSelectd();
        $(btn).parent().attr("class", "processActive");
        buildFiles(result.result.produceList);
      }
    }
  });
};

const selectWorkflow = btn => {
  const _id = $(btn).attr("data-id");
  $.ajax({
    type: "GET",
    url: `/workflow/${_id}/simple`,
    dataType: "json",
    beforeSend: xhr => xhr.setRequestHeader("accept","application/json"),
    success: result => {
      if (200 !== result.code) {
        alert("服务器繁忙");
      } else {
        cleanSelect();
        $(btn).find("span").css({color: "#3d9bff"});
        buildProcess(result.result.nodeList, result.result.status.index);
        buildFiles(result.result.status.produceList);
      }
    }
  });
};
