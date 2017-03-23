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

const UPLOADLIST = Symbol("UPLOADLIST");

window[UPLOADLIST] = [];

($ => {
  $(() => {
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

    //弹窗出来后的一些操作
    const input = document.getElementById("source");

    //文件域选择文件时, 执行readFile函数,把上传的文档信息放置dataFile中
    input.addEventListener("change", readFile, true);

    function readFile() {
        const file = this.files[0];

        const name = file.name;

        const index = window[UPLOADLIST].findIndex(_file => _file.name === name);

        window[UPLOADLIST].push({
          name,
          file,
        });

        $(".dataFile").html(buildUploadList());
    }

    //关闭遮罩层
    $(".btn_close").on("click", function() {
        $(".popup").css("display", "none");
    });

    //点击关闭按钮，取消该项文档的添加
    $(".dataClose").on("click", function() {
        console.log($(this).parent("div").parent("li"))
        $(this).parent("div").parent("li").remove();
    });

    // 点击svn切换数据源
    $(".header").on("click", ".change", function() {
      const __self = $(this);

      if (__self.hasClass("svn")) {
        $(".data.files").show();
        $(".data.path").hide();
        __self.attr("class", "change cloud");
      } else {
        $(".data.files").hide();
        $(".data.path").show();
        __self.attr("class", "change svn");
      }
    });

    $(".data.path").hide(); // 初始时隐藏datas 列表

  });
})(jQuery);

const uploadTask = (id, file, index, callback) => {
  const [xhr, formData] = [new XMLHttpRequest(), new FormData()];
  formData.append("goods", file);
  xhr.open("POST", `/fs/update/${id}`, true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(formData);
  xhr.onreadystatechange = () => {
      if (4 === xhr.readyState) {
          if (200 === xhr.status) {
              try {
                const result = JSON.parse(xhr.responseText);

                if (200 !== result.code) {
                  callback(new Error(result.error));
                  return ;
                }

                callback(null, result);

              } catch(err) {
                callback(err);
              }
          }
          callback(new Error("callFailed!"));
      }
  };
};

const uploadTasks = (nodeId, index) => {
    const file = window[UPLOADLIST].shift();
    if (!file) {
      return ;
    }
    uploadTask(nodeId, file.file, index, (err, data) => {
      if (err) {
        buildUploadFlag(index, file, "失败");
      } else {
        buildUploadFlag(index, file, "成功");
      }
      index++;
      uploadTasks(nodeId, index);
    });
};

const beginUpload = () => {
    const nodeId = $(".processActive").find("dt").attr("data-id");
    uploadTasks(nodeId, 0);
};

const delUploadFileList = btn => {
    window[UPLOADLIST].splice($(btn).attr("data-index"), 1);
    $(".dataFile").html(buildUploadList());
};

const buildUploadFlag = (index, file, result) => {
  $(`.dataFile>li:eq(${index})`).html(`<li>
      <span>${index + 1}</span>
      <span>${file.name}</span>
      <span><span style="color:red">${result}</span></span>
    </li>
  `);
};

const buildUploadList = () => window[UPLOADLIST].map((file, index) => `<li>
  <span>${index + 1}</span>
  <span>${file.name}</span>
  <span>${new Date().toLocaleDateString()}</span>
  <span class="closeFile" data-index=${index} onClick="javascript:delUploadFileList(this);"><span>
</li>`);

const openUploadView = btn => {
  const __self = $(".processActive").find("dt");
  const workflowName = $(".truTitle").attr("data-name");
  const [nodeId, nodeName] = [__self.attr("data-id"), __self.find("span").html()];
  $(".popup").find(".name").html(`${workflowName} - ${nodeName} 更新`);
  window[UPLOADLIST].length = 0;
  $(".popup").css("display", "block");
};

const cleanSelectd = (nodeName) => {
  $("dl").attr("class", "");
};

const buildInstancePage = ({name, _id, beginTimestamp, produceList = [], owner, svn, uploadCount}) => {
  $("#nodeName").html(name);

  if (owner) {
    $("#nodeOwner").html(`${owner.name} (${owner.mail})`);
  } else {
    $("#nodeOwner").html("未设置负责人");
  }

  $("#nodeBeginTime").html(beginTimestamp || beginTimestamp === "" ? "未进入该节点": new Date(beginTimestamp).toLocaleString());
  $("#nodeUpdateCount").html(uploadCount);
  if (svn) {
    $("#nodeSvnInfo").html(`<a href="${svn}">${svn}</a>`);
  } else {
    $("#nodeSvnInfo").html(`<a href="javascript:void(0)">-</a>`);
  }
  $(".change").attr("data-id", _id);

  if (produceList.length === 0) {
    $(".data.files").html(`<li><div><span class="topic">未上传文件至云服务器</span></div></li>`);
  } else {
    $(".data.files").html(produceList.map(produce => `<li>
      <div>
        <span class="name" data-id=${produce._id} onClick="javascript:downLoadFile(this);">
          <a href="javascript:void(0)">${produce.name}</a>
        </span>
        <span class="time">${timeToDate(produce.uploadTime)}</span>
        <span>${produce.downloadCount || 0}</span>
        <span class="author">${produce.author ? produce.author.name : "admin"}</span>
        <span data-id=${produce._id} class="download" onClick="javascript:downLoadFile(this);"></span>
      </div>
    </li>`).join(""));
  }

  if ($(".header .change").hasClass("svn")) {
    $(".data.files").hide();
    $(".data.path").show();
  } else {
    $(".data.files").show();
    $(".data.path").hide();
  }
};

const timeToDate = time => {
  if (!time) {
    return new Date().toLocaleString();
  }
  const data = new Date(time);
  return data.toLocaleString();
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
        $(".data.files").hide();
        buildInstancePage(result.result);
      }
    }
  });
};

const downLoadFile = (btn) => {
  window.open("/fs/download/" + $(btn).attr("data-id"));
};

// 点击反馈跳转到bbs
$(".proposal").bind("click", function() {
    window.open("http://bbs.jwis.cn/forum.php?mod=forumdisplay&fid=37");
});
