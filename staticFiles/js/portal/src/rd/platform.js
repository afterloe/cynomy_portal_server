"use strict";

const [workflowName,UpLoadList, UploadIndex] = [Symbol("workflowName"), Symbol("UpLoadList"), Symbol("UploadIndex")];
window[UpLoadList] = [];

$(function() {
    //弹窗出来后的一些操作
    const input = document.getElementById("source");

    //文件域选择文件时, 执行readFile函数,把上传的文档信息放置dataFile中
    input.addEventListener("change", readFile, true);

    function readFile() {
        const file = this.files[0];

        window[UpLoadList].push({
          name : file.name,
          file,
        });

        $(".dataFile").html(buildUploadList());
    }

    // 点击反馈跳转到bbs
    $(".proposal").bind("click", function() {
        window.open("http://bbs.jwis.cn/forum.php?mod=forumdisplay&fid=37");
    });

    //关闭遮罩层
    $(".btn_close").on("click", function() {
        $(".popup").css("display", "none");
    });

    //点击关闭按钮，取消该项文档的添加
    $(".dataClose").on("click", function() {
        console.log($(this).parent("div").parent("li"))
        $(this).parent("div").parent("li").remove();
    });

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

const uploadTask = (id, file, index) => new Promise((solve, reject) => {
  const [xhr, formData] = [new XMLHttpRequest(), new FormData()];
  formData.append("goods", file);
  /*
    xhr.timeout = 15 * 1000;
    xhr.ontimeout = function (event) {
        alert("请求超时");
    };
  */
  xhr.open("POST", `/fs/update/${id}`);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(formData);
  xhr.onreadystatechange = () => {
      if (4 === xhr.readyState) {
          if (200 === xhr.status) {
              try {
                const result = JSON.parse(xhr.responseText);

                if (200 !== result.code) {
                  reject({
                    msg: result.error,
                    code: result.code,
                  });
                  return ;
                }

                Object.assign(result, {
                  [UploadIndex]: index,
                });

                solve(result);

              } catch(err) {
                reject(xhr.responseText);
              }
          }
          reject();
      }
  };
});

const uploadTasks = nodeId => {
    const tasks = window[UpLoadList].map((object, index) => uploadTask(nodeId, object.file, index));
    return Promise.all(tasks);
};

const beginUpload = () => {
    const nodeId = $(".processActive").find("dt").attr("data-id");
    uploadTasks(nodeId).then(data => {
        window[UpLoadList].length = 0;
        $(".popup").css("display", "none");
        $(".dataFile").html("");
        $.ajax({
          type: "GET",
          url: `/workflow/${nodeId}/files`,
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
              buildFiles(result.result.produceList);
            }
          }
        });
    }).catch(err => {
        err.code === 403? alert("非该项目组成员禁止上传文件") : alert("上传失败 " + err.msg);
    });
};

const delUploadFileList = btn => {
    window[UpLoadList].splice($(btn).attr("data-index"), 1);
    $(".dataFile").html(buildUploadList());
};

const buildUploadList = () => window[UpLoadList].map((file, index) => `<li>
  <span>${index + 1}</span>
  <span>${file.name}</span>
  <span>${new Date().toLocaleDateString()}</span>
  <span class="closeFile" data-index=${index} onClick="javascript:delUploadFileList(this);"><span>
</li>`);

const buildLinkedURL = URL => {
  $(".detail").attr("data-id", URL);
}

const forwardDetail = btn => {
  const id = $(btn).attr("data-id");
  window.location.href = `/portal/workflow/${id}`;
};

const downLoadFile = (btn) => {
  window.open("/fs/download/" + $(btn).attr("data-id"));
};

const cleanSelect = () => {
  $(".aLink").each(function() {
    $(this).css({color: "#333"});
  });
};

const cleanSelectd = (nodeName) => {
  $("dl").attr("class", "");
  $(".data_title").html(`${nodeName} 资料`);
};

const buildUploadItem = (allowedUpload = false) => {
  const uploadButton = $("#uploadButton");
  if (allowedUpload) {
    uploadButton.hasClass("upload") ? "": uploadButton.addClass("upload");
  } else {
    uploadButton.hasClass("upload") ? uploadButton.removeClass("upload"): "";
  }
};

const openUploadView = btn => {
  const __self = $(".processActive").find("dt");
  if (undefined === window[workflowName]) {
    window[workflowName] = $(".aLink.Active").html();
  }
  const [nodeId, nodeName] = [__self.attr("data-id"), __self.find("span").html()];
  $(".popup").find(".name").html(`${window[workflowName]} - ${nodeName} 更新`);
  $(".popup").css("display", "block");
};

const buildProcess = (nodeList, actionNum) => {
  $(".data_title").html(`${nodeList[actionNum].name} 资料`);
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
  const nodeName = $(btn).find("span").html();
  $.ajax({
    type: "GET",
    url: `/workflow/${id}/files`,
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
        cleanSelectd(nodeName);
        $(btn).parent().attr("class", "processActive");
        buildFiles(result.result.produceList);
      }
    }
  });
};

const selectWorkflow = btn => {
  const _id = $(btn).attr("data-id");
  window[workflowName] = $(btn).find("span").html();
  $.ajax({
    type: "GET",
    url: `/workflow/${_id}/simple`,
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
        cleanSelect();
        $(btn).find("span").css({color: "#3d9bff"});
        buildProcess(result.result.nodeList, result.result.status.index);
        buildLinkedURL(result.result._id);
        buildFiles(result.result.status.produceList);
        buildUploadItem(result.result.allowedUpload);
      }
    }
  });
};
