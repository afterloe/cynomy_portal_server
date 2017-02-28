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
$("#tagsInfo").hide();
$("#filesInfo").hide();

const selectedProcess = [];
let modalService;

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

const appendTag = btn => {
    const [id, name] = [$(btn).attr("data-id"), $(btn).attr("data-name")];
    const exampleId = $("#exampleId-exampleManager").val();
    websocket.send(`node-manager->${modalService}->setTags("${exampleId}"|"${id}")`);
    let html = $("#tags-exampleManager").html();
    html += ` <span class="badge badge-default" data-id="${id}" data-name="${name}"> &nbsp;${name}</span>`;
    $("#tags-exampleManager").html(html);
};

const reflushTag = () => {
	websocket.send("node-manager->tagsService->getTagsList");
};

const exampleManager = (btn, modal) => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->${modal}Service->exampleInfo("${id}")`);
    modalService = `${modal}Service`;
};

const deleteUser = btn => {
    console.log($(btn).attr("data-id"));
    console.log("123");
};

const resetPwd = btn => {
    console.log($(btn).attr("data-id"));
    console.log("123");
};

const deleteTag = btn => {
    btn = $(btn).parent();
    const [name,
        id] = [btn.attr("data-name"), btn.attr("data-id")];
    $("#label-askdeleteTag").html(`删除 ${name}`);
    $("#input-askdeleteTag").val(id);
    $("#askdeleteTag").modal("show");
};

const uploadNode = btn =>  {
    btn = $(btn);
    const [id, nodeName] = [btn.attr("data-id"), btn.attr("data-name")];
    const processName = btn.parent().parent().attr("data-name");
    $("#label-updateNodeProduceList").html(`${processName} - ${nodeName} 节点更新`);
    $("#hidden-views").html(`<input type="hidden" name="workflowId" value="${id}" />`);
    $("#updateNodeProduceList").modal("show");
};

const promoteProcess = btn => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->promoteProcess("${id}")`);
};

const retroversionProcess = btn => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->retroversion("${id}")`);
};

const startUpProcess = btn => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->startUpWorkflow("${id}")`);
};

const membersManager = btn => {
    const id = $(btn).attr("data-id");
    $("#membersManager").modal("toggle");
};

const deleteExampleTag  = btn => {
    const id = $(btn).attr("data-id");
    const tag = $(btn).text();
    const service = $(btn).attr("data-type");
    websocket.send(`node-manager->${service}Service->deleteExampleTag("${id}"|"${tag}")`);
    $("#exampleManager").modal("toggle");
};

registry("exampleInfo", (err, data) => {
    const {tags, name, _id, type} = data;
    const tagsHtml = [];
    tags.map(tag => tagsHtml.push(`<span class="badge badge-default" data-type="${type}" data-id="${_id}" onClick="javascript:deleteExampleTag(this);">${tag}</span>`));
    $("#name-exampleManager").html(name);
    $("#exampleId-exampleManager").val(_id);
    $("#tags-exampleManager").html(tagsHtml.join(" "));
    $("#exampleManager").modal("show");
});

registry("systemInfo", (err, data) => {
    const _ = [];
    const {hostName, cpus, platform, network, uname} = data;

});

registry("memoryInfo", (err, data) => {
    console.log(data);
});

registry("hardDiskInfo", (err, data) => {
    console.log(data);
});

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

registry("userList-xlsx", (err, data) => {
    websocket.send(`node-manager->userService->loaderFromXlsx("${data}")`);
});

registry("goodsList-tar.gz", (err, data) => {
    const form = $("#form-updateNodeProduceList");
    const _data = getFormData(form);
    Object.assign(_data, {path: data});
    websocket.send(`node-manager->workflowService->updateProcess("${_data.workflowId}"|${JSON.stringify(_data)})`);
    $("#updateNodeProduceList").modal("toggle");
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

registry("getTagsList", (err, data) => {
    const [tagsTemplate,
        tagsList] = [
        [], []
    ];
    const colors = [
        "default",
        "info",
        "primary",
        "success",
        "warning",
        "danger"
    ];
    data.map(item => {
        let color = item.count > 50
            ? item.count % 50
            : 0;
        if (color >= colors.length) {
            color = colors.length - 1;
        }
        tagsTemplate.push(`<span class="badge badge-${colors[color]}" data-id="${item._id}" data-name="${item.name}">
				<span aria-hidden="true" onClick="javascript:deleteTag(this);" class="deleteTags" style="cursor: pointer;">&times;</span> &nbsp;${item.name}</span>`);
        tagsList.push(`<span class="badge badge-${colors[color]}" data-id="${item._id}" data-name="${item.name}" onClick="javascript:appendTag(this);"> &nbsp;${item.name}</span>`);
    });
    $("#table-show-tags").html(tagsTemplate.join("  "));
    $("#addTags > p").html(tagsList.join(" "));
});

registry("createTag", (err, data) => {
    websocket.send("node-manager->tagsService->getTagsList");
    $("#crearteTag").modal("toggle");
});

registry("deleteTag", (err, data) => {
    websocket.send("node-manager->tagsService->getTagsList");
    $("#askdeleteTag").modal("toggle");
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

registry("retroversion", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowList");
});

registry("startUpWorkflow", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowList");
});

registry("updateProcess", (err, data) => {
    websocket.send("node-manager->workflowService->getWorkflowList");
});

registry("getGoodsList", (err, data) => {
    const fileList = [];
    data.map(item => {
        fileList.push(`<div class="card" style="height: 11rem;">
        <div class="card-block">
          <h4 class="card-title">${item.name}</h4>
          <p class="card-text">${item.author.name} - ${item.version}</p>
          <a href="${item.path}" class="btn btn-outline-primary">下载</a>
          <a href="#" class="btn btn-outline-danger">删除</a>
		  <a href="#" data-id="${item._id}" class="btn btn-outline-warning" onClick="javascript:exampleManager(this, 'goods');">管理</a>
        </div>
      </div>`);
    });
    $("#table-show-files").html(fileList.join(""));
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
		<button type="button" data-id="${item._id}" class="btn btn-link" onClick="javascript:exampleManager(this, 'user');">管理</button>
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
            const reason = status.reason || "未更新";
            showWorkflow.push(`<div class="row" style="margin-top: 1rem;" data-name="${name}">
        <div class="col-sm-5">
          <div class="progress">
            <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ${speed}%" aria-valuenow="${speed}" aria-valuemin="0" aria-valuemax="100">${speed} % ${status.name}</div>
          </div>
          ${name} - ${reason}
        </div>
        <div class="col-sm-7">
          <button type="button" data-id="${_id}" data-name="${status.name}" class="btn btn-outline-primary btn-sm" onClick="javascript:uploadNode(this);">
            更新节点
          </button>
          <button type="button" data-id="${_id}" class="btn btn-outline-success btn-sm" onClick="javascript:promoteProcess(this);">
            推进流程
          </button>
          <button type="button" data-id="${_id}" class="btn btn-outline-danger btn-sm" onClick="javascript:retroversionProcess(this);">
    			  回退流程
    		  </button>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-warning btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              管理
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="javascript:void(0);" data-id="${_id}" onClick="javascript:exampleManager(this, 'workflow')">贴标签</a>
              <a class="dropdown-item" href="javascript:void(0);" data-id="${_id}" onClick="javascript:membersManager(this, 'workflow')">成员管理</a>
              <a class="dropdown-item" href="#">删除工作流</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">文件仓库管理</a>
            </div>
          </div>
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
          <button type="button" data-id="${_id}" class="btn btn-outline-warning btn-sm" onClick="javascript:exampleManager(this, 'workflow')">
    			管理
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
};

$("#overwrite").click(function() {
    websocket.send("node-manager->systemService->systemInfo");
    websocket.send("node-manager->systemService->memoryInfo");
    websocket.send("node-manager->systemService->hardDiskInfo");
    clickFunction($(this));
    $("#userInfo").hide();
    $("#workflowInfo").hide();
    $("#filesInfo").hide();
    $("#tagsInfo").hide();
    $("#overwriteInfo").show();
});

// 用户数据链接
$("#nav-userInfo").click(function() {
    websocket.send("node-manager->userService->getUserList");
    clickFunction($(this));
    $("#userInfo").show();
    $("#workflowInfo").hide();
    $("#tagsInfo").hide();
    $("#filesInfo").hide();
    $("#overwriteInfo").hide();
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
    $("#tagsInfo").hide();
    $("#filesInfo").hide();
    $("#overwriteInfo").hide();
});

// 标签管理
$("#nav-tags").click(function() {
    websocket.send("node-manager->tagsService->getTagsList");
    clickFunction($(this));
    $("#userInfo").hide();
    $("#workflowInfo").hide();
    $("#filesInfo").hide();
    $("#tagsInfo").show();
    $("#overwriteInfo").hide();
});

// 文件信息
$("#nav-filesInfo").click(function() {
    websocket.send("node-manager->goodsService->getGoodsList");
    clickFunction($(this));
    $("#userInfo").hide();
    $("#tagsInfo").hide();
    $("#workflowInfo").hide();
    $("#filesInfo").show();
    $("#overwriteInfo").hide();
});

// 导入用户数据功能 实现
$("#module-ok-importUserInfo").click(function() {
    const inputElement = document.getElementById("exampleInputFile");
    const xlsx = inputElement.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(xlsx);
    reader.onload = () => {
        const fileBuff = reader.result;
        const length = fileBuff.byteLength;
        const wsBuff = ArrayBuffer.transfer(fileBuff, length + 8);
        const dataView = new DataView(wsBuff, length, 8);
        dataView.setUint32(0, 1001);
        websocket.send(wsBuff);
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
$("#module-ok-updateNodeProduceList").click(() => {
    const inputElement = document.getElementById("file-updateNodeProduceList");
    const tar = inputElement.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(tar);
    reader.onload = () => {
        const fileBuff = reader.result;
        const length = fileBuff.byteLength;
        const wsBuff = ArrayBuffer.transfer(fileBuff, length + 8);
        const dataView = new DataView(wsBuff, length, 8);
        dataView.setUint32(0, 2001);
        websocket.send(wsBuff);
    };
});

// 连接节点
$("#module-ok-linkNode").click(function() {
    const form = $(this).parent().parent().find("form");
    const data = getFormData(form);
    const {remote, port} = data;
    setLinkInfo(remote, port);
    tryToLink();

    $("#linkNode").modal("toggle");
});

// 创建标签
$("#module-ok-crearteTag").click(function() {
    const form = $(this).parent().parent().find("form");
    const data = getFormData(form);
    const {keyWord, pro, domain} = data;
    data.keyWord = keyWord === ""
        ? []
        : keyWord.split(",");
    data.pro = pro === ""
        ? []
        : pro.split(",");
    data.domain = domain === ""
        ? []
        : domain.split(",");
    websocket.send(`node-manager->tagsService->createTag(${JSON.stringify(data)})`);
});

// 确认删除标签
$("#module-ok-askdeleteTag").click(() => {
    const id = $("#input-askdeleteTag").val();
    websocket.send(`node-manager->tagsService->deleteTag("${id}")`);
    $("inp-askdeleteTag").val(null);
});
