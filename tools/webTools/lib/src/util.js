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

const [MEMBERS, TAGS, TEMPORARY, TEMPORARYSELECT] = [Symbol("MEMBERS"), Symbol("TAGS"), Symbol("TEMPORARY"), Symbol("TEMPORARYSELECT")];

$("#linkNode").modal("show");

$("#userInfo").hide();
$("#workflowInfo").hide();
$("#tagsInfo").hide();
$("#filesInfo").hide();

const selectedProcess = [];
let modalService;

const workflowDataManager = btn => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->workflowInfo("${id}"|${JSON.stringify({nodeList:1, name:1, link: 1, customExtensions: 1})})`);
};

const nodeInstanceManager = btn => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->workflowInfo("${id}"|${JSON.stringify({nodeList:1, status:1})})`);
};

const obmitCardInfo = card => {
    card.addClass("active");
    const id = card.attr("data-id");
    websocket.send(`node-manager->workflowService->getNodeInstance("${id}")`);
};

const prevCarousel = btn => {
    const parent = $(btn).parent();
    const [nav, card] = [parent.find(".carousel-indicators>.active"), parent.find(".carousel-item.active")];
    nav.removeClass("active");
    card.removeClass("active");
    const prevCard = card.prev(".carousel-item");
    if (0 !== prevCard.length) {
      nav.prev("li").addClass("active");
      obmitCardInfo(prevCard);
    } else {
      parent.find(".carousel-indicators>li:last").addClass("active");
      obmitCardInfo(parent.find(".carousel-item:last"));
    }
};

const nextCarousel = btn => {
    const parent = $(btn).parent();
    const [nav, card] = [parent.find(".carousel-indicators>.active"), parent.find(".carousel-item.active")];
    nav.removeClass("active");
    card.removeClass("active");
    const nextCard = card.next(".carousel-item");
    if (0 !== nextCard.length) {
      nav.next("li").addClass("active");
      obmitCardInfo(nextCard);
    } else {
      parent.find(".carousel-indicators>li:first").addClass("active");
      obmitCardInfo(parent.find(".carousel-item:first"));
    }
};

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
    html += `<span class="badge badge-default" data-id="${id}" data-name="${name}"> &nbsp;${name}</span>`;
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
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->userService->deleteUser("${id}")`);
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
    websocket.send(`node-manager->workflowService->workflowMemberList("${id}")`);
};

const deleteExampleTag  = btn => {
    const id = $(btn).attr("data-id");
    const tag = $(btn).text();
    const service = $(btn).attr("data-type");
    websocket.send(`node-manager->${service}Service->deleteExampleTag("${id}"|"${tag}")`);
    $("#exampleManager").modal("toggle");
};

const removeMember = (btn,workflowId) => {
    const id = $(btn).attr("data-id");
    const content = $(btn).text();
    const index = window[TEMPORARYSELECT].findIndex(temporary => temporary._id === id);
    if (-1 !== index) {
      websocket.send(`node-manager->workflowService->removeUserFromMembers("${workflowId}"|"${id}")`);
      const member = window[TEMPORARYSELECT][index];
      window[TEMPORARY].push(member);
      window[TEMPORARYSELECT].splice(index, 1);
      // 已有成员名单
      $(".col-8.memberList").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-primary" onClick="javascript:removeMember(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
      // 工作流owner候选人名单
      $("#setOwner").find(".memberList.setOwner").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-success" onClick="javascript:setOwner(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
      // 全部人员名单
      $("#addUserToMembers").find("p.card-text").html(window[TEMPORARY].map(member => `<span data-id="${member._id}" class="badge badge-primary" onClick="javascript:appendMembers(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
      // 工作流节点owner候选人名单
      $("#nodeInstanceSetOwner").find(".memberList.setOwner").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-warning" onClick="javascript:setNodeInstanceOwner(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
    }
};

const appendMembers = (btn,workflowId) => {
    const id = $(btn).attr("data-id");
    const content = $(btn).text();
    const index = window[TEMPORARY].findIndex(temporary => temporary._id === id);
    if (-1 !== index) {
      websocket.send(`node-manager->workflowService->appendUser2Members("${workflowId}"|"${id}")`);
      const member = window[TEMPORARY][index];
      window[TEMPORARYSELECT].push(member);
      window[TEMPORARY].splice(index, 1);
      // 已有成员名单
      $(".col-8.memberList").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-primary" onClick="javascript:removeMember(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
      // 工作流owner候选人名单
      $("#setOwner").find(".memberList.setOwner").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-success" onClick="javascript:setOwner(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
      // 全部人员名单
      $("#addUserToMembers").find("p.card-text").html(window[TEMPORARY].map(member => `<span data-id="${member._id}" class="badge badge-primary" onClick="javascript:appendMembers(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
      // 工作流节点owner候选人名单
      $("#nodeInstanceSetOwner").find(".memberList.setOwner").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-warning" onClick="javascript:setNodeInstanceOwner(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
    }
};

const deleteFile = btn => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->goodsService->deleteFile("${id}")`);
};

const setOwner = (btn,workflowId) => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->setOwner("${workflowId}"|"${id}")`);
    $(".owner").html(`<span data-id="${id}" class="badge badge-danger" onClick="javascript:cancelOwner(this, '${workflowId}');">${$(btn).text()}</span>`);
};

const cancelOwner = (btn,workflowId) => {
    const id = $(btn).attr("data-id");
    websocket.send(`node-manager->workflowService->cancelOwner("${workflowId}"|"${id}")`);
    $(".owner").html("未设置负责人");
};

const setNodeInstanceOwner = (btn, workflowId) => {
    const userId = $(btn).attr("data-id");
    const nodeInstanceId = $("#nodeInstanceView").find(".carousel-item.active").attr("data-id");
    websocket.send(`node-manager->workflowService->setLeader("${workflowId}"|"${nodeInstanceId}"|"${userId}")`);
};

const setSVNAddress = btn => {
    const nodeInstanceId = $("#nodeInstanceView").find(".carousel-item.active").attr("data-id");
    const input = $(btn).parent().find("input");
    const value = input.val();
    websocket.send(`node-manager->workflowService->setNodeInstanceSVNAddress("${nodeInstanceId}"|"${value}")`);
    $("#nodeInstanceView").find(".list-group-item.svnAddress").html(`svn地址: ${value} <span class="btn btn-outline-danger btn-sm cardButton" data-toggle="collapse" href="#nodeInstanceSetSVN" aria-expanded="false" aria-controls="collapseExample" style="margin-top: 0em;">修改svn地址</span>`);
    input.val("");
    input.attr("placeholder", value);
};

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
    $("#noticeInfo").hide();
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
    $("#noticeInfo").hide();
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
    $("#noticeInfo").hide();
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
    $("#noticeInfo").hide();
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
    $("#noticeInfo").hide();
});

// 公告管理
$("#nav-noticeInfo").click(function() {
    clickFunction($(this));
    $("#userInfo").hide();
    $("#tagsInfo").hide();
    $("#workflowInfo").hide();
    $("#filesInfo").hide();
    $("#overwriteInfo").hide();
    $("#noticeInfo").show();
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
    data.keyWord = keyWord === "" ? [] : keyWord.split(",");
    data.pro = pro === "" ? [] : pro.split(",");
    data.domain = domain === "" ? [] : domain.split(",");
    websocket.send(`node-manager->tagsService->createTag(${JSON.stringify(data)})`);
});

// 确认删除标签
$("#module-ok-askdeleteTag").click(() => {
    const id = $("#input-askdeleteTag").val();
    websocket.send(`node-manager->tagsService->deleteTag("${id}")`);
    $("inp-askdeleteTag").val(null);
});
