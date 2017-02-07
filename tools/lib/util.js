/**
  * afterloe - cynomy_portal_server/tools/lib/util.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-7 13:55:02
  */
"use strict";

$("#userInfo").hide();
$("#workflowInfo").hide();
$("#filesInfo").hide();

const selectedProcess = [];

const buildSelectProcess = () => {
    const _ = [];
    selectedProcess.map((node, index) => _.push(`<span class="badge badge-default" data-id="${index}">${node.name}</span>`));
    $("#modal-nodeTemplate-selected").html(_.join(" -> "));
    $("#modal-nodeTemplate-selected > span").each(function() {
        $(this).click(function() {
            const index = $(this).attr("data-id");
            selectedProcess.splice(index, 1);
            buildSelectProcess();
        });
    });
};

function deleteUser(btn) {
    console.log($(btn).attr("data-id"));
    console.log("123");
}

function resetPwd(btn) {
    console.log($(btn).attr("data-id"));
    console.log("123");
}

function uploadNode(btn) {
    btn = $(btn);
    const [id,
        nodeName] = [btn.attr("data-id"), btn.attr("data-name")];
    const processName = btn.parent().parent().attr("data-name");
    $("#label-updateNodeProduceList").html(`${processName} - ${nodeName} 节点更新`);
    $("#hidden-views").html(`<input type="hidden" name="workflowId" value="${id}" />`);
    $("#updateNodeProduceList").modal("show");
}

function promoteProcess(btn) {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->promoteProcess("${id}")`);
}

function startUpProcess(btn) {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->startUpWorkflow("${id}")`);
}

registry("getWorkflowTemplateList", (err, data) => {
    const workflowTemplate = [];
    data.map(item => {
        workflowTemplate.push(`<option value="${item._id}">${item.name}</option>`);
    });
    $("#select-workflowTemplate").html(workflowTemplate.join(""));
});

registry("loaderFromXlsx", (err, data) => {
    websocket.send("node-manager->userService->getUserList");
});

registry("binaryFile", (err, data) => {
    websocket.send(`node-manager->userService->loaderFromXlsx("${data}")`);
});

registry("buildProduct", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowList");
});

registry("createWorkflowNode", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowNodeList");
    $("#console").html(`<div class="alert alert-success" role="alert">
  <strong>成功!</strong> 链接节点成功.
  </div>`);
});

registry("getWorkflowNodeList", (err, data) => {
    const nodeTemplate = [];
    data.map(item => {
        nodeTemplate.push(`<span class="badge badge-default" data-id="${item._id}">${item.name}</span>`);
    });
    $("#modal-nodeTemplate-show").html(nodeTemplate.join(" "));
    $("#modal-nodeTemplate-show > span").each(function() {
        const __self = $(this);
        __self.click(function() {
            selectedProcess.push({name: __self.html()});
            buildSelectProcess();
        });
    });
});

registry("createWorkflow", (err, data) => {
    selectedProcess.length = 0;
    buildSelectProcess();
    websocket.send("node-manager->workflowService->getWorkflowTemplateList");
    $("#console").html(`<div class="alert alert-success" role="alert">
  <strong>成功!</strong> 创建工作流模板成功.
  </div>`);
});

registry("promoteProcess", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowList");
});

registry("startUpWorkflow", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowList");
});

registry("updateProcess", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowList");
});

registry("filesInfo", (err, data) => {
    console.log(data);
});

registry("getUserList", (err, data) => {
    const [showUser,
        checkBoxUser] = [
        [], []
    ];
    data.map(item => {
        showUser.push(`<tr scope="row">
      <td>${item._id}</td>
      <td>${item.name}</td>
      <td>${item.mail}</td>
      <td>
        <button type="button" data-id="${item._id}" class="btn btn-link" onClick="javascript:deleteUser(this);">删除</button>
        <button type="button" data-id="${item._id}" class="btn btn-link" onClick="javascript:resetPwd(this);">重置密码</button>
      </td>
    </tr>`);
        checkBoxUser.push(`<label class="form-check-label">
      <input class="form-check-input" type="checkbox" name="members" value="${item._id}">
      ${item.name}
    </label>`);
    });
    $("#table-show-user").html(showUser.join(""));
    $("#checkbox-user").html(checkBoxUser.join(""));
});

registry("getWorkflowList", (err, data) => {
    const showWorkflow = [];
    data.map(item => {
        const {name, _id, nodeList, status} = item;
        if (status) {
            const speed = Math.ceil((status.index + 1) / nodeList.length * 100);
            const reason = status.reason || "未更新节点";
            showWorkflow.push(`<div class="row" style="margin-top: 1rem;" data-name="${name}">
        <div class="col-sm-6">
          <div class="progress">
            <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ${speed}%" aria-valuenow="${speed}" aria-valuemin="0" aria-valuemax="100">${speed} % ${status.name}</div>
          </div>
          ${name} - ${reason}
        </div>
        <div class="col-sm-3">
          <button type="button" data-id="${_id}" data-name="${status.name}" class="btn btn-outline-primary btn-sm" onClick="javascript:uploadNode(this);">
            更新当前节点
          </button>
          <button type="button" data-id="${_id}" class="btn btn-outline-success btn-sm" onClick="javascript:promoteProcess(this);">
            推进流程
          </button>
        </div>
      </div>`);
        } else {
            showWorkflow.push(`<div class="row" style="margin-top: 1rem;">
        <div class="col-sm-6">
          <div class="progress">
            <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0 %</div>
          </div>
          ${name} - 未启动
        </div>
        <div class="col-sm-3">
          <button type="button" data-id="${_id}" class="btn btn-outline-danger btn-sm" onClick="javascript:startUpProcess(this);">
            启动流程
          </button>
        </div>
      </div>`);
        }
    });
    $("#table-show-workflow").html(showWorkflow.join(""));
});

// 左侧导航栏切换效果
const clickFunction = _ => {
    $("#leftItem").find("a").each(function() {
        $(this).removeClass("active");
    });
    _.addClass("active");
}

$("#overwrite").click(function() {
    clickFunction($(this));
    $("#userInfo").hide();
    $("#workflowInfo").hide();
    $("#filesInfo").hide();
});

// 用户数据链接
$("#nav-userInfo").click(function() {
    websocket.send("node-manager->userService->getUserList");
    clickFunction($(this));
    $("#userInfo").show();
    $("#workflowInfo").hide();
    $("#filesInfo").hide();
});

// 工作流数据
$("#nav-workflowInfo").click(function() {
    websocket.send("node-manager->workflowService->getWorkflowList");
    websocket.send("node-manager->userService->getUserList");
    websocket.send("node-manager->workflowService->getWorkflowTemplateList");
    websocket.send("node-manager->workflowService->getWorkflowNodeList");
    clickFunction($(this));
    $("#userInfo").hide();
    $("#workflowInfo").show();
    $("#filesInfo").hide();
});

// 文件信息
$("#nav-filesInfo").click(function() {
    clickFunction($(this));
    $("#userInfo").hide();
    $("#workflowInfo").hide();
    $("#filesInfo").show();
});

// 导入用户数据功能 实现
$("#module-ok-importUserInfo").click(function() {
    const inputElement = document.getElementById("exampleInputFile");
    const xlsx = inputElement.files[0];
    const reader = new FileReader();
    //以二进制形式读取文件
    reader.readAsArrayBuffer(xlsx);
    //文件读取完毕后该函数响应
    reader.onload = evt => {
        const binaryString = evt.target.result; //发送文件
        websocket.send(binaryString);
    };
    $("#importUserInfo").modal("toggle");
});

// 创建工作流功能
$("#module-ok-crearteProcess").click(function() {
    const form = $(this).parent().parent().find("form");
    const data = getFormData(form);
    if (data.name.length === 0) {
        $("#console").html(`<div class="alert alert-danger" role="alert">
  <strong>缺少参数</strong> 请输入产品名!
</div>`);
        $("#crearteProcess").modal("toggle");
        return;
    }
    console.log(data);
    websocket.send(`node-manager->workflowService->buildProduct(${JSON.stringify(data)})`);
    $("#crearteProcess").modal("toggle");
});

// 创建流程节点模板
$("#module-ok-crearteProcessNodeTemplate").click(function() {
    const form = $(this).parent().parent().find("form");
    const data = getFormData(form);
    websocket.send(`node-manager->workflowService->createWorkflowNode(${JSON.stringify(data)})`);
    $("#crearteProcessNodeTemplate").modal("toggle");
});

// 创建流程模板
$("#module-ok-crearteProcessTemplate").click(function() {
    const form = $(this).parent().parent().find("form");
    const data = getFormData(form);
    Object.assign(data, {chainNodes: selectedProcess});
    websocket.send(`node-manager->workflowService->createWorkflow(${JSON.stringify(data)})`);
    $("#crearteProcessTemplate").modal("toggle");
});

// 更新当前节点
$("#module-ok-updateNodeProduceList").click(function() {
    const inputElement = document.getElementById("file-updateNodeProduceList");
    const tar = inputElement.files[0];
    const reader = new FileReader();
    //以二进制形式读取文件
    reader.readAsArrayBuffer(tar);
    //文件读取完毕后该函数响应
    reader.onload = () => {
        const fileBuff = reader.result; //发送文件
        const length = fileBuff.byteLength;

        const wsBuff = ArrayBuffer.transfer(fileBuff, length + 8);
        const dataView = new DataView(wsBuff, length, 8);
        dataView.setUint32(0,23);

        websocket.send(wsBuff);
    };
    const form = $(this).parent().parent().find("form");
    const data = getFormData(form);
    Object.assign(data, {path: "l123s"});
    // websocket.send(`node-manager->workflowService->updateProcess("${data.workflowId}"|${JSON.stringify(data)})`);
    $("#updateNodeProduceList").modal("toggle");
});
