/**
  * afterloe - cynomy_portal_server/tools/webTools/lib/src/registry.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-6 16:58:55
  */
"use strict";

registry("getNodeInstance", (err, data) => {
    const ownerInfo = data.owner && data.owner.name ? `${data.owner.name} (${data.owner.mail})`:"未设置负责人";
    const timeInfo = data.beginTimestamp ? new Date(data.beginTimestamp).toLocaleString(): "未到达该节点";
    const svnInfo = data.svn ? data.svn : "-";
    $("#nodeInstanceSetSVN").find("input").attr("placeholder", svnInfo);
    $("#nodeInstanceView").find(".carousel-item.active").html(`
      <div class="card">
        <div class="card-block">
          <h4 class="card-title">${data.name}</h4>
          <p class="card-text">${data.reason}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item status">状态: ${data.stat}</li>
          <li class="list-group-item beginTimestamp">启动时间: ${timeInfo}</li>
          <li class="list-group-item leader">节点负责人: ${ownerInfo} <span class="btn btn-outline-danger btn-sm cardButton" data-toggle="collapse" href="#nodeInstanceSetOwner" aria-expanded="false" aria-controls="collapseExample">修改负责人</span></li>
          <li class="list-group-item count">节点更新次数: ${data.uploadCount}</li>
          <li class="list-group-item svnAddress">svn地址: ${svnInfo} <span class="btn btn-outline-danger btn-sm cardButton" data-toggle="collapse" href="#nodeInstanceSetSVN" aria-expanded="false" aria-controls="collapseExample">修改svn地址</span></li>
        </ul>
        <div class="card-block">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    `);
});

registry("setLeader", (err, data) => {
    const {mail, name} = data;
    $("#nodeInstanceView").find(".list-group-item.leader").html(`节点负责人: ${name} (${mail}) <span class="btn btn-outline-danger btn-sm cardButton" data-toggle="collapse" href="#nodeInstanceSetOwner" aria-expanded="false" aria-controls="collapseExample" style="margin-top: 0em;">修改负责人</span>`);
});

registry("workflowInfo", (err, data) => {
    const {nodeList, status, customExtensions, link, name} = data;

    if (name) {
      console.log(customExtensions, name);
      // TODO
      return ;
    }

    if (status && nodeList) {
      const [olHtml, cardHtml] = [[], []];

      for (let node of nodeList) {
        if (node.index === status.index) {
          const ownerInfo = status.owner ? `${status.owner.name} (${status.owner.mail})` : "未设置负责人";
          const svnInfo = status.svn ? status.svn : "-";
          olHtml.push(`<li class="active"></li>`);
          cardHtml.push(`<div class="carousel-item active" data-id="${status._id}">
            <div class="card">
              <div class="card-block">
                <h4 class="card-title">${status.name}</h4>
                <p class="card-text">${status.reason}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item status">状态: ${status.stat}</li>
                <li class="list-group-item beginTimestamp">启动时间: ${new Date(status.beginTimestamp).toLocaleString()}</li>
                <li class="list-group-item leader">节点负责人: ${ownerInfo} <span class="btn btn-outline-danger btn-sm cardButton" data-toggle="collapse" href="#nodeInstanceSetOwner" aria-expanded="false" aria-controls="collapseExample">修改负责人</span></li>
                <li class="list-group-item count">节点更新次数: ${status.uploadCount}</li>
                <li class="list-group-item svnAddress">svn地址: ${svnInfo} <span class="btn btn-outline-danger btn-sm cardButton" data-toggle="collapse" href="#nodeInstanceSetSVN" aria-expanded="false" aria-controls="collapseExample">修改svn地址</span></li>
              </ul>
              <div class="card-block">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
          </div>`);
          $("#nodeInstanceSetSVN").find("input").attr("placeholder", svnInfo);
        } else {
          olHtml.push(`<li></li>`);
          cardHtml.push(`
            <div class="carousel-item" data-id="${node._id}">
              <div class="card">
                <div class="card-block">
                  <h4 class="card-title">${node.name}</h4>
                  <p class="card-text">未收到信息</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">状态: - </li>
                  <li class="list-group-item">启动时间: - </li>
                  <li class="list-group-item">节点负责人: - </li>
                  <li class="list-group-item">节点跟新次数: - </li>
                  <li class="list-group-item">svn地址: - </li>
                </ul>
                <div class="card-block">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
              </div>
            </div>
          `);
        }
      }

      $("#nodeInstanceView").find(".carousel-indicators").html(olHtml.join(""));
      $("#nodeInstanceView").find(".carousel-inner").html(cardHtml.join(""));

      $("#nodeInstanceManager").modal("show");
    }
});

registry("workflowMemberList", (err, data) => {
    if (!window[MEMBERS]) {
      websocket.send("node-manager->userService->getUserList");
      return ;
    }
    const {members, workflowId, owner} = data;
    window[TEMPORARYSELECT] = members;
    window[TEMPORARY] = [];
    let flag;
    for(let member of window[MEMBERS]) {
      flag = false;
      for (let _member of members) {
        if (member.name === _member.name && member.mail === _member.mail) {
          flag = true;
        }
      }

      if (!flag) {
        window[TEMPORARY].push(member);
      }
    }

    // 已有成员名单
    $(".col-8.memberList").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-primary" onClick="javascript:removeMember(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
    // 工作流owner候选人名单
    $("#setOwner").find(".memberList.setOwner").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-success" onClick="javascript:setOwner(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
    // 全部人员名单
    $("#addUserToMembers").find("p.card-text").html(window[TEMPORARY].map(member => `<span data-id="${member._id}" class="badge badge-primary" onClick="javascript:appendMembers(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
    // 工作流节点owner候选人名单
    $("#nodeInstanceSetOwner").find(".memberList.setOwner").html(window[TEMPORARYSELECT].map(member => `<span data-id="${member._id}" class="badge badge-warning" onClick="javascript:setNodeInstanceOwner(this, '${workflowId}');">${member.name}(${member.mail})</span>`).join(""));
    if (owner) {
      $(".owner").html(`<span data-id="${owner._id}" class="badge badge-danger" onClick="javascript:cancelOwner(this, '${workflowId}');">${owner.name}(${owner.mail})</span>`);
    } else {
      $(".owner").html("未设置负责人");
    }
    $("#membersManager").modal("toggle");
});

registry("exampleInfo", (err, data) => {
    const {tags = [], name, _id, type} = data;
    const tagsHtml = [];
    tags.map(tag => tagsHtml.push(`<span class="badge badge-default" data-type="${type}" data-id="${_id}" onClick="javascript:deleteExampleTag(this);">${tag}</span>`));
    $("#name-exampleManager").html(name);
    $("#exampleId-exampleManager").val(_id);
    $("#addTags").hasClass("show")? $("#addTags").removeClass("show"):null;
    $("#tags-exampleManager").html(tagsHtml.join(" "));
    $("#exampleManager").modal("show");
});

registry("systemInfo", (err, data) => {
    const _ = [];
    const {hostName, cpus, platform, network, uname} = data;
    // TODO
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
    const [tagsTemplate, tagsList] = [[], []];
    window[TAGS] = true;
    const colors = ["default", "info", "primary", "success", "warning", "danger"];
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
    $("#addTags").find("p.card-text").html(tagsList.join(" "));
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
          <a href="javascript:void(0);" class="btn btn-outline-primary">下载</a>
          <a data-id="${item._id}" href="javascript:void(0);" class="btn btn-outline-danger" onClick="javascript:deleteFile(this);">删除</a>
		      <a href="#" data-id="${item._id}" class="btn btn-outline-warning" onClick="javascript:exampleManager(this, 'goods');">管理</a>
        </div>
      </div>`);
    });
    $("#table-show-files").html(fileList.join(""));
});

registry("deleteFile", (err, data) => {
    websocket.send("node-manager->goodsService->getGoodsList");
});

registry("deleteUser", (err, data) => {
    websocket.send("node-manager->userService->getUserList");
});

registry("getUserList", (err, data) => {
    const [showUser, checkBoxUser] = [[], []];
    window[MEMBERS] = data;
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
              <a class="dropdown-item" href="javascript:void(0);" data-id="${_id}" onClick="javascript:exampleManager(this, 'workflow')">标签管理</a>
              <a class="dropdown-item" href="javascript:void(0);" data-id="${_id}" onClick="javascript:membersManager(this, 'workflow')">成员管理</a>
              <a class="dropdown-item" href="javascript:void(0);" data-id="${_id}" onClick="javascript:nodeInstanceManager(this)">节点管理</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void(0);" data-id="${_id}" onClick="javascript:workflowDataManager(this), 'workflow'">基础数据管理</a>
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
