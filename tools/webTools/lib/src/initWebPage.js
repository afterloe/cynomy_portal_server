/**
  * afterloe - cynomy_portal_server/tools/webTools/lib/src/initWebPage.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-3-3 13:53:49
  */
"use strict";

const MODULE = Symbol("MODULE");
window[MODULE] = [];

// window[MODULE].push();
// window[MODULE].push();
// window[MODULE].push();
// window[MODULE].push();

/**
 * 工作流节点管理
 * @type {String}
 */
window[MODULE].push(`
<div class="modal fade bd-example-modal-lg" id="nodeInstanceManager" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
          </button>
          <h4 class="modal-title">实例节点管理</h4>
      </div>
      <div class="modal-body">

        <div class="carousel slide" id="nodeInstanceView">
          <ol class="carousel-indicators"></ol>
          <div class="carousel-inner"></div>
          <a class="carousel-control-prev" href="#nodeInstanceManager" onClick="javascript:prevCarousel(this);">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#nodeInstanceManager" onClick="javascript:nextCarousel(this);">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="collapse" id="nodeInstanceSetOwner">
          <div class="card card-block" style="display:block;">
           <label calss="card-title">项目组成员：</label>
           <p class="card-text memberList setOwner"></p>
          </div>
        </div>
        <div class="collapse" id="nodeInstanceSetSVN">
          <div class="card card-block" style="display:block;">
           <label calss="card-title">SVN地址：</label>
           <p class="card-text">
             <div class="form-group">
              <input class="form-control" placeholder="输入svn地址..">
              <small id="emailHelp" class="form-text text-muted">SVN地址为portal日后扫描文件的地方，请正确设置</small>
             </div>
             <a href="javascript:void(0);" onClick="javascript:setSVNAddress(this);" class="btn btn-outline-primary btn-sm pull-right">提交</a>
           </p>
          </div>
        </div>

      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>`);

/**
 * 链接 websocket 节点
 * @type {String}
 */
window[MODULE].push(`
  <div class="modal fade" id="linkNode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                  </button>
                  <h4 class="modal-title" id="myModalLabel">链接远程节点</h4>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group row">
                    <label for="linkNode-input-remote" class="col-sm-2 col-form-label">Remote</label>
                    <div class="col-sm-10">
                      <input type="text" name="remote" class="form-control" id="linkNode-input-remote" placeholder="远程节点ip/host" value="127.0.0.1">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="linkNode-input-port" class="col-sm-2 col-form-label">Port</label>
                    <div class="col-sm-10">
                      <input type="number" name="port" class="form-control" id="linkNode-input-port" placeholder="远程节点端口" value="15024">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="linkNode-input-author" class="col-sm-2 col-form-label">Author</label>
                    <div class="col-sm-10">
                      <input type="password" class="form-control" id="linkNode-input-author" placeholder="授权码">
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" id="module-ok-linkNode">连接</button>
              </div>
          </div>
      </div>
  </div>
`);

/**
 * 导入用户
 *
 * @type {String}
 */
window[MODULE].push(`
  <div class="modal fade" id="importUserInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                  </button>
                  <h4 class="modal-title" id="myModalLabel">导入用户数据</h4>
              </div>
              <div class="modal-body">
                  <div class="form-group">
                      <label for="exampleInputFile">选择xlsx文件导入</label>
                      <input type="file" class="form-control-file" placeholder="选择xlsx文件导入" id="exampleInputFile" aria-describedby="fileHelp">
                      <small id="fileHelp" class="form-text text-muted">上传用户相关的xlsx文件，如果有重复的这不会导入到数据库</small>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
                  <button type="button" class="btn btn-outline-primary" id="module-ok-importUserInfo">导入</button>
              </div>
          </div>
      </div>
  </div>
`);

/**
 * 导出用户
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="exportUserInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">导出用户数据</h4>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>`);

/**
 * 创建流程
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="crearteProcess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">创建工作流</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">产品名*</label>
                        <input type="text" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="请输入产品名">
                        <small id="emailHelp" class="form-text text-muted">*为必须输入内容</small>
                    </div>
                    <div class="form-group">
                        <label>产品主页</label>
                        <input type="text" name="link" class="form-control" aria-describedby="emailHelp" placeholder="请输入产品主页" value="http://tru.jwis.cn">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">选择工作流模板</label>
                        <select class="form-control" name="template" id="select-workflowTemplate"></select>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">选择参与人员</label>
                        <div class="form-check" id="checkbox-user"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-outline-primary" id="module-ok-crearteProcess">创建</button>
            </div>
        </div>
    </div>
</div>`);

/**
 * 创建流程模版
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="crearteProcessTemplate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">创建工作流模板</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">模板名</label>
                        <input type="text" class="form-control" name="name" aria-describedby="emailHelp" placeholder="输入模板名">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">选择节点</label>
                        <div id="modal-nodeTemplate-show"></div>
                        <small id="emailHelp" class="form-text text-muted">单击添加到末尾</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">流程</label>
                        <div id="modal-nodeTemplate-selected"></div>
                        <small id="emailHelp" class="form-text text-muted">单击删除节点</small>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-outline-primary" id="module-ok-crearteProcessTemplate">创建流程模板</button>
            </div>
        </div>
    </div>
</div>`);

/**
 * 创建流程节点模版
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="crearteProcessNodeTemplate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">创建工作流节点模板</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">流程节点名</label>
                        <input type="text" class="form-control" name="name" aria-describedby="emailHelp" placeholder="输入节点名">
                        <small id="emailHelp" class="form-text text-muted">节点名用于标识流程进行到哪一步</small>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-outline-primary" id="module-ok-crearteProcessNodeTemplate">创建</button>
            </div>
        </div>
    </div>
</div>`);

/**
 * 更新流程
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="updateNodeProduceList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="label-updateNodeProduceList">更新节点</h4>
            </div>
            <div class="modal-body">
                <form id="form-updateNodeProduceList">
                    <div id="hidden-views"></div>
                    <div class="form-group">
                        <label for="exampleInputFile">更新数据包</label>
                        <input type="file" class="form-control-file" placeholder="选择数据tar包" id="file-updateNodeProduceList" aria-describedby="fileHelp">
                        <small id="fileHelp" class="form-text text-muted">数据tart包来自服务器打包工具或自己的打包工具的更新数据包</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea">更新理由</label>
                        <textarea class="form-control" name="reason" id="exampleTextarea" rows="3"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-outline-primary" id="module-ok-updateNodeProduceList">更新</button>
            </div>
        </div>
    </div>
</div>`);

/**
 * 创建标签
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="crearteTag" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">创建标签</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">*标签名</label>
                        <input type="text" class="form-control" name="name" placeholder="输入标签名">
                        <small id="emailHelp" class="form-text text-muted">标签用于给工作流节点用户来进行分类</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">关键字</label>
                        <select class="form-control" name="keyWord">
                          <option value="平台">平台</option>
                          <option value="产品">产品</option>
                          <option value="应用">应用</option>
                          <option value="类型">类型</option>
                          <option value="用户">用户</option>
                          <option value="设备">设备</option>
                          <option value="权限">权限</option>
                          <option value="公共">公共</option>
                        </select>
                        <small id="emailHelp" class="form-text text-muted">关键字用于给标签标识领域，可以使得标签能够通过搜索来获取，用`,`来分隔</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">特殊属性</label>
                        <input type="text" class="form-control" name="pro" placeholder="输入特殊属性">
                        <small id="emailHelp" class="form-text text-muted">使得被标签贴上的对象拥有该属性，用`,`来分隔</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">访问域</label>
                        <input type="text" class="form-control" name="domain" placeholder="输入访问域">
                        <small id="emailHelp" class="form-text text-muted">依靠标签来决定用户的访问权限，用`,`来分隔</small>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-outline-primary" id="module-ok-crearteTag">创建</button>
            </div>
        </div>
    </div>
</div>`);

/**
 * 询问是否删除标签
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="askdeleteTag" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-sm">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="label-askdeleteTag"></h4>
            </div>
            <div class="modal-body modal-sm">
                <input type="hidden" name="tagetId" value="null" id="input-askdeleteTag" />
                <small>删除之后将无法显示标签相关内容，请谨慎选择!</small>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-outline-primary" id="module-ok-askdeleteTag">确认</button>
            </div>
        </div>
    </div>
</div>`);

/**
 * 成员管理
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade bd-example-modal-lg" id="membersManager" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
          </button>
          <h4 class="modal-title">成员管理</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <label class="col-3 col-form-label">已有成员:</label>
          <div class="col-8 memberList"></div>
          <span>
            <a class="btn btn-outline-success btn-sm" data-toggle="collapse" href="#addUserToMembers" aria-expanded="false" aria-controls="collapseExample">
              +
            </a>
          </span>
        </div>
        <div class="row">
          <label class="col-3 col-form-label">主流程负责人:</label>
          <div class="col-8 owner"></div>
          <span>
            <a class="btn btn-outline-success btn-sm" data-toggle="collapse" href="#setOwner" aria-expanded="false" aria-controls="collapseExample">
              +
            </a>
          </span>
        </div>
        </br>
        <div class="collapse" id="setOwner">
          <div class="card card-block" style="display:block;">
           <label calss="card-title">项目组成员：</label>
           <p class="card-text memberList setOwner"></p>
          </div>
        </div>
        <div class="collapse" id="addUserToMembers">
          <div class="card card-block" style="display:block;">
           <label calss="card-title">已导入成员：</label>
           <p class="card-text"></p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>`);

/**
 * 实例标签管理
 * @type {String}
 */
window[MODULE].push(`<div class="modal fade" id="exampleManager" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title">实例信息</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <label class="col-3 col-form-label">实例名</label>
                <div class="col-9" id="name-exampleManager"></div>
                <input type="hidden" id="exampleId-exampleManager" value="" />
              </div>
              <div class="row">
                <label class="col-2 col-form-label">标签列表</label>
                <div class="col-8" id="tags-exampleManager"></div>
                <span>
                  <a class="btn btn-outline-success" data-toggle="collapse" href="#addTags" aria-expanded="false" aria-controls="collapseExample">
                    +
                  </a>
                </span>
              </div>
              </br>
              <div class="collapse" id="addTags" aria-expanded="true">
                <div class="card card-block" style="display:block;">
                 <label calss="card-title">贴标签</label>
                 <p class="card-text"></p>
                 <a href="#" class="btn btn-outline-danger btn-sm" onclick="javascript:reflushTag(this);">换一批</a>
                </div>
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>`);

document.getElementById("module-export").innerHTML = window[MODULE].join("");
delete window[MODULE];
