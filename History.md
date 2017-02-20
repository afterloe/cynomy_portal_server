Portal build历史
###
> MIT Licensed  
> author: afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> mail:   
> webSite:   

Portal build历史
===

0.0.1 / 2017-1-11 14:34:46
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 初始化项目配置文件，采用koa为底层，多线程为基础进行架构

### new files
> .cynomy  
> .jshintrc  
> .tern-project  
> History.md  
> INSTALL.md  
> Makefile  
> config/  
> distributed/  
> index.js  
> package.json  
> routers/  
> servers/  
### modify files
> Makefile  

0.0.1 / 2017-1-11 15:29:38
==================
commit by afterloe (lm6289511@gmail.com)

  * master: http服务初始化完成，postman测试／author成功。

### modify files
> History.md  
> config/index.js  
> distributed/slave.js  
> index.js  
> package.json  
> servers/registry.js  

0.0.3 / 2017-1-11 16:4:46
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 集成webSocket服务，实现双向通讯，在test下有websocket的客户端进行测试，重新构建salve.js

### new files
> servers/websocket.js  
> test/  
### modify files
> .cynomy  
> History.md  
> distributed/slave.js  
> package.json  


0.0.3 / 2017-1-11 18:33:54
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加工具构建页面

### new files
> tools/  
### modify files
> package.json  


0.0.3 / 2017-1-11 22:19:59
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 补充session服务

### new files
> errors/  
> interceptors/  
> services/  
> tools/security.js  
> tools/utilities.js  
### modify files
> config/index.js  


0.0.3 / 2017-1-11 22:25:43
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 调整模块信息，debug注册信息

### modify files
> package.json  
> servers/registry.js  


0.0.3 / 2017-1-11 23:11:8
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复pug模板导致的文件错乱的问题

### new files
> test/buildCli  
> test/funTest.js  
### modify files
> tools/buildPage.js  


0.0.3 / 2017-1-12 15:54:28
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复jade模版倒入的时候公共资源没有引入的异常，修复读取资源的时候没有递归处理

### modify files
> test/buildCli  
> tools/buildPage.js  
> tools/utilities.js  


0.0.3 / 2017-1-12 20:45:0
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加文件删除方法，用于处理构建页面时产生的不必要的文件

### modify files
> tools/buildPage.js  


0.0.3 / 2017-1-13 23:14:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: CouchDB 建模

### new files
> dao/  


0.0.3 / 2017-1-15 22:48:11
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 配置jade模板，动态数据搭建

### new files
> interceptors/jsonSmart.js  
> template/  
### modify files
> .gitignore  
> Makefile  
> package.json  
> routers/index.js  
> servers/registry.js  


0.0.3 / 2017-1-16 14:56:16
==================
commit by afterloe (lm6289511@gmail.com)

  * master: web 初步界面

### new files
> webPage/  


0.0.3 / 2017-1-16 18:31:41
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 弃用couchdb，使用mongodb进行dao层构建

### delete files
> dao/domain/couchDB.js  


0.0.3 / 2017-1-16 22:12:15
==================
commit by afterloe (lm6289511@gmail.com)

  * master: mongodb 接入

### new files
> dao/  
> test/workFlow_test.js  
> test/workNode_test.js  
### modify files
> Makefile  
> config/index.js  
> package.json  


0.0.3 / 2017-1-16 22:31:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: mongodb 连接调试，补全主食信息

### modify files
> config/index.js  
> dao/sequel.js  
> test/workNode_test.js  


0.0.3 / 2017-1-16 22:52:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 异常定制，特殊能力提升

### modify files
> dao/work-node.js  
> errors/i18nError.json  


0.0.3 / 2017-1-16 23:41:50
==================
commit by afterloe (lm6289511@gmail.com)

  * master: docs 添加数据库设计文档

### new files
> doc/  


0.0.3 / 2017-1-16 23:51:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 数据库设计文档添加内容

### modify files
> "doc/db  

0.0.3 / 2017-1-17 10:4:21
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao设计文档升级

### modify files
> History.md  
> "doc/db  


1.0.0 / 2017-1-17 10:46:57
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao层数据搭建，数据库设计文档升级

### new files
> dao/target.js  
> dao/user.js  
### modify files
> dao/index.js  
> "doc/db  


1.0.0 / 2017-1-17 14:58:21
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao层集中升级

### new files
> dao/public.js  
### modify files
> config/index.js  
> dao/target.js  
> dao/user.js  
> dao/work-flow.js  
> dao/work-node.js  


1.0.0 / 2017-1-17 15:29:10
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao联合调试
  * error底层重构
  * 解除dao下的默写文件的异常检测

### modify files
> Makefile  
> dao/public.js  
> dao/sequel.js  
> dao/target.js  
> dao/user.js  
> dao/work-flow.js  
> dao/work-node.js  
> errors/index.js  

1.0.1 / 2017-1-17 15:46:9
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao底层文件结构优化，dao层暴露优化

### new files
> dao/goods.js  
> dao/produce.js  
> dao/workflow-node.js  
> dao/workflow-template.js  
> dao/workflow.js  

### modify files
> .cynomy  
> History.md  
> dao/index.js  
> package.json  

### delete files
> dao/work-flow.js  
> dao/work-node.js  
> test/workFlow_test.js  
> test/workNode_test.js  


1.0.1 / 2017-1-17 15:49:28
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao底层文件结构优化

### modify files
> dao/goods.js  
> dao/produce.js  
> dao/workflow-node.js  
> dao/workflow-template.js  


1.0.1 / 2017-1-17 17:39:17
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao底层文件结构优化

### new files
> services/userService.js  
> test/userService_test.js  
### modify files
> dao/public.js  
> package.json  


1.0.1 / 2017-1-17 18:34:54
==================
commit by afterloe (lm6289511@gmail.com)

  * master: userServer添加方法支持

### new files
> test/dao_test.js  
### modify files
> dao/public.js  
> services/userService.js  
> test/userService_test.js  


1.0.1 / 2017-1-17 19:11:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: userServer方法优化

### modify files
> services/userService.js  
> test/userService_test.js  


1.0.1 / 2017-1-17 19:22:21
==================
commit by afterloe (lm6289511@gmail.com)

  * master: config 添加邮件配置

### new files
> doc/user.xlsx  
### modify files
> config/index.js  
> test/userService_test.js  


1.0.1 / 2017-1-17 22:32:42
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加tools/utilities.js 文件的底层支持，添加对应的mocha测试用例

### new files
> test/utilities_test.js  
### modify files
> tools/utilities.js  
### delete files
> test/readyConfig_test.js  


1.0.1 / 2017-1-17 23:28:0
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 构建标签服务- 创建标签，扩展doc下数据库设计文档

### new files
> services/targetService.js  
### modify files
> "doc/db  
> errors/i18nError.json  


1.0.1 / 2017-1-17 23:42:51
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 工作流引擎编码开始

### new files
> services/workflowService.js  
### modify files
> services/userService.js  
> tools/utilities.js  


1.0.1 / 2017-1-18 11:40:3
==================
commit by afterloe (lm6289511@gmail.com)

  * master: workflow升级，修改模板，命名规范化

### new files
> dao/tag.js  
> dao/workflow-instance.js  
> services/tagService.js  
### modify files
> dao/index.js  
> "doc/db  
> services/userService.js  
> services/workflowService.js  
> tools/utilities.js  
### delete files
> dao/target.js  
> dao/workflow.js  
> services/targetService.js  


1.0.1 / 2017-1-18 11:48:58
==================
commit by afterloe (lm6289511@gmail.com)

  * master: workflow升级，修改节点模板和节点实例

### modify files
> "doc/db  


1.0.1 / 2017-1-18 15:6:9
==================
commit by afterloe (lm6289511@gmail.com)

  * master: workflow升级，创建工作流，编辑工作流模版，创建工作流节点功能优化

### new files
> dao/workflow-node-instance.js  
> dao/workflow-node-template.js  
### modify files
> dao/index.js  
> dao/public.js  
> "doc/db  
> errors/i18nError.json  
> services/workflowService.js  
### delete files
> dao/workflow-node.js  


1.0.1 / 2017-1-18 16:17:7
==================
commit by afterloe (lm6289511@gmail.com)

  * master: workflow升级，启动工作流功能，自动启动工作流功能

### modify files
> dao/user.js  
> errors/i18nError.json  
> services/userService.js  
> services/workflowService.js  
> test/userService_test.js  


1.0.1 / 2017-1-18 17:25:22
==================
commit by afterloe (lm6289511@gmail.com)

  * master: workflow升级，添加设置节点负责人功能

### modify files
> errors/i18nError.json  
> services/userService.js  
> services/workflowService.js  


1.0.2 / 2017-1-18 17:49:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 底层功能优化，添加全局queryById方法

### modify files
> .cynomy  
> dao/public.js  
> dao/sequel.js  
> dao/user.js  
> package.json  
> test/userService_test.js  


1.0.2 / 2017-1-18 19:29:46
==================
commit by afterloe (lm6289511@gmail.com)

  * master: goodsService升级，生产方法初始搭建，等待优化

### new files
> services/goodsService.js  
### modify files
> "doc/db  
> errors/i18nError.json  
> test/funTest.js  


1.0.2 / 2017-1-19 12:0:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 产出流程文档构建，服务端构建文档功能构建，待优化

### new files
> doc/production.md  
### modify files
> dao/workflow-instance.js  
> services/goodsService.js  
> test/funTest.js  


1.0.2 / 2017-1-19 19:34:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 产出流程优化，workflowService添加对工作流的更新支持
  * master: workflow 优化添加外部方法更新工作流中的节点信息，流程推动和流程回退
  * master: workflow 优化 修复创建工作流模板的时候传入相同节点的节点列表导致后续业务错乱的异常
  * master: workflow 优化 修复工作流实例节点没有同步到工作流实例和节点实例的异常
  * master: workflow 优化 修复启动工作流的时候工作节点没有同步状态
  * master: workflow 优化 修复启动工作流的时未同步当前节点和下一节点的信息
  * master: workflow 优化 回退流程时没有同步节点信息到数据库
  * master: workflow 优化 推进流程时没有同步节点信息到数据库
  * master: workflow 优化 流程推动功能底层优化，节点添加对项目的状态的支持
  * master: workflow 优化 流程推动功能底层优化, 推送数据到工作流失败的异常
  * master: workflow 优化 流程推动功能底层优化，补全注释信息
  * master: workflow 模块进入测试

### modify files
> services/goodsService.js  
> services/workflowService.js  
### new files
> tools/chain.js   

1.0.2 / 2017-01-20 14:47:02
==================
commit by afterloe (lm6289511@gmail.com)

  * master: workflow bug修复：拒绝创建同名工作流节点模版
  * master: workflow bug修复：拒绝创建同名工作流模版
  * master: workflow bug修复：正常流程下创建工作流模版工作流节点模板功能测试代码测试完毕
  * master: workflow bug修复：没有工作节点或节点长度为0的时候也能创建工作流模版
  * master: workflow 单元测试优化，丰富测试用例，异常把控
  * master: 产出方法完成
  * master: userService 单元测试开启，补全测试用例，修改测试异常

### modify files
> errors/i18nError.json  
> services/workflowService.js  
> test/workflowService_test.js  

1.0.2 / 2017-1-22 21:33:59
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 调试创建工作流方法，修正userList，修正筛选方案
  * master: workflow 启动实例流程测试 完成
  * master: workflow 修复设置leader功能
  * master: 添加对底层的支持，修正推送修改信息到工作流节点上，去除设置leader会出现过多信息的bug
  * master: workflow 推进流程 回退流程测试完毕

### modify files
> config/index.js  
> services/userService.js  
> services/workflowService.js  
> test/userService_test.js  
> test/workflowService_test.js  
> dao/public.js  

1.0.3 / 2017-1-22 21:37:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: v1.0.3版本准备完毕，进入发版

### modify files
> .cynomy  
> History.md  
> package.json  


1.0.3 / 2017-1-22 22:41:24
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 覆盖率测试方案启动，重写makefile文件，下一步开启用户登录方法编写和tag标签支持，


### modify files
> Makefile  
> webPage/js/home.js  


1.0.3 / 2017-1-23 18:43:15
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改makefile构建流程，忽略测试覆盖率代码生成报表的检测，支持工作流实例添加tag


### modify files
> Makefile  
> "doc/db  
> services/tagService.js  
> services/workflowService.js  


1.0.3 / 2017-1-23 19:23:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: userService 构建基础邮件登录系统


### new files
> bin/  

### modify files
> dao/public.js  
> dao/user.js  
> services/userService.js  


1.0.3 / 2017-1-23 20:13:22
==================
commit by afterloe (lm6289511@gmail.com)

  * dev: 邮件辅助工具 激活邮件发送功能


### new files
> tools/mailHelper.js  

### modify files
> config/index.js  


1.0.3 / 2017-1-24 19:54:32
==================
commit by afterloe (lm6289511@gmail.com)

  * master: user 底层开发


### modify files
> config/index.js  


1.0.3 / 2017-1-24 21:56:15
==================
commit by afterloe (lm6289511@gmail.com)

  * master: dao中公共方法添加对标签的检索功能，workflow新增方法支持标签搜索工作流实例


### modify files
> dao/public.js  
> services/workflowService.js  


1.0.3 / 2017-1-25 20:58:38
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加管理脚本进行数据导入和导出


### new files
> bin/portal  
> services/cliService.js  

### modify files
> package.json  

### delete files
> bin/generatorTar  


1.0.3 / 2017-1-26 22:2:48
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 基础功能添加压缩文件夹


### new files
> lib/  

### modify files
> bin/portal  
> services/workflowService.js  

### delete files
> services/cliService.js  


1.0.3 / 2017-1-27 10:50:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完善tar打包功能


### modify files
> lib/buildTar.js  


1.0.3 / 2017-1-27 11:15:33
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完善tar打包功能，采用相对路径进行操作


### modify files
> lib/buildTar.js  


1.0.3 / 2017-1-28 18:6:27
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加结束流程方法


### modify files
> bin/portal  
> services/workflowService.js  


1.0.3 / 2017-1-28 18:10:45
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 回退流程时自动关闭结束时间戳


### modify files
> services/workflowService.js  


1.0.3 / 2017-1-29 18:46:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: mail sender 配置使用


### modify files
> tools/mailHelper.js  


1.0.3 / 2017-1-29 19:0:51
==================
commit by afterloe (lm6289511@gmail.com)

  * master: websocket 控制台


### new files
> tools/_util.html  


1.0.3 / 2017-1-29 21:43:34
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 接口职责连优化，支持多种协议


### modify files
> distributed/slave.js  
> servers/websocket.js  


1.0.3 / 2017-1-30 18:30:6
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 合并升级websocket 网页客户端


### modify files
> tools/_util.html  


1.0.3 / 2017-1-31 16:5:24
==================
commit by afterloe (lm6289511@gmail.com)

  * master: bootstarap4 + jquery3


### modify files
> tools/_util.html  


1.0.3 / 2017-1-31 17:45:14
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 单击事件


### modify files
> tools/_util.html  


1.0.3 / 2017-1-31 18:14:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 单击事件


### modify files
> tools/_util.html  


1.0.3 / 2017-2-1 13:53:56
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复导航栏和进度条信息


### modify files
> tools/_util.html  


1.0.3 / 2017-2-2 13:42:6
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 工作流页面构建完毕


### modify files
> tools/_util.html  


1.0.3 / 2017-2-2 14:21:25
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 人员信息导入module开发完毕


### modify files
> tools/_util.html  


1.0.3 / 2017-2-2 16:6:42
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 定义http借口


### modify files
> servers/websocket.js  
> tools/_util.html  


1.0.3 / 2017-2-2 18:24:50
==================
commit by afterloe (lm6289511@gmail.com)

  * master: http获取接口调试


### new files
> routers/fileSystem.js  
> routers/user.js  
> routers/workflow.js  

### modify files
> routers/index.js  
> servers/registry.js  


1.0.3 / 2017-2-3 20:58:27
==================
commit by afterloe (lm6289511@gmail.com)

  * master: route添加查询相关信息的方法


### modify files
> routers/fileSystem.js  
> routers/workflow.js  
> services/goodsService.js  
> services/workflowService.js  


1.0.3 / 2017-2-4 22:43:22
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加user选择框导入的事件


### modify files
> tools/_util.html  


1.0.3 / 2017-2-5 11:46:3
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 创建工作流功能获取用户输入数据功能成功


### modify files
> tools/_util.html  


1.0.3 / 2017-2-6 11:13:11
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 消息机制响应机制升级


### modify files
> config/index.js  
> servers/websocket.js  
> tools/_util.html  


1.0.3 / 2017-2-6 11:35:48
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 消息机制升级, 获取用户信息


### modify files
> tools/_util.html  


1.0.3 / 2017-2-6 14:1:11
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 消息机制升级, 获取工作流信息


### modify files
> servers/websocket.js  
> tools/_util.html  


1.0.3 / 2017-2-6 16:17:39
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 消息机制升级, 通过execl导入数据


### modify files
> servers/websocket.js  
> services/userService.js  
> services/workflowService.js  
> test/funTest.js  
> tools/_util.html  


1.0.3 / 2017-2-6 17:24:16
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 消息机制升级, 通过按钮创建流程


### modify files
> servers/websocket.js  
> test/funTest.js  
> tools/_util.html  


1.0.3 / 2017-2-6 17:36:20
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 消息机制升级, 创建流程功能优化，如果勾选了用户则填充用户信息，修正了显示问题


### modify files
> services/userService.js  
> services/workflowService.js  
> tools/_util.html  


1.0.3 / 2017-2-6 17:57:16
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 消息机制升级, 创建流程节点模板功能


### modify files
> tools/_util.html  


1.0.3 / 2017-2-6 19:55:27
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws升级，支持节点构建功能


### modify files
> services/workflowService.js  
> tools/_util.html  


1.0.3 / 2017-2-6 20:18:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws升级，支持创建工作流模板


### modify files
> services/workflowService.js  
> test/workflowService_test.js  
> tools/_util.html  


1.0.3 / 2017-2-6 20:35:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws升级，添加按钮事件


### modify files
> tools/_util.html  


1.0.3 / 2017-2-6 21:3:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复单元测试跑动时出现的user不一致的异常，修复无法设置leader的异常，修正部分方法名，规范部分方法使用规则


### modify files
> services/userService.js  
> services/workflowService.js  
> test/userService_test.js  
> test/workflowService_test.js  
> tools/_util.html  


1.0.3 / 2017-2-6 21:14:47
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复点击启动工作流页面不刷新的问题


### modify files
> tools/_util.html  


1.0.3 / 2017-2-7 9:55:11
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws优化，流程节点推进功能实现


### modify files
> services/workflowService.js  
> tools/_util.html  


1.0.3 / 2017-2-7 10:23:56
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws优化，推送数据到选择的节点


### modify files
> tools/_util.html  


1.0.3 / 2017-2-7 11:37:26
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws优化，更新当前节点流程


### modify files
> services/goodsService.js  
> services/workflowService.js  
> test/workflowService_test.js  
> tools/_util.html  


1.0.3 / 2017-2-7 15:56:24
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws 发送文件功能优化，添加对底层的支持


### new files
> tools/lib/  

### modify files
> Makefile  
> servers/websocket.js  
> test/funTest.js  
> tools/_util.html  


1.0.3 / 2017-2-7 16:31:25
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 配置文件中添加临时目录，ws服务端优化


### modify files
> config/index.js  
> servers/websocket.js  
> services/userService.js  
> tools/lib/util.js  


1.0.3 / 2017-2-7 16:56:38
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws前端接口修改，内部样式提升，添加了额工具中部分方法


### modify files
> servers/websocket.js  
> services/userService.js  
> tools/_util.html  
> tools/lib/util.js  


1.0.3 / 2017-2-7 19:30:5
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完成工作流更新节点操作


### new files
> services/fileSystem.js  

### modify files
> config/index.js  
> doc/production.md  
> services/goodsService.js  
> services/workflowService.js  


1.0.3 / 2017-2-7 19:41:23
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 数据底层升级，修复check出现的异常


### modify files
> services/fileSystem.js  
> services/goodsService.js  


1.0.3 / 2017-2-8 14:27:55
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 构建数据包功能完毕


### new files
> lib/initTar.js  

### modify files
> bin/portal  
> services/fileSystem.js  
> test/funTest.js  


1.0.3 / 2017-2-8 14:35:27
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复构建包的时候出现绝对路径的异常


### modify files
> lib/initTar.js  


1.0.3 / 2017-2-8 15:11:22
==================
commit by afterloe (lm6289511@gmail.com)

  * master: fileSystem 添加读取异步读取Json的方法，重构了buildTar功能


### modify files
> bin/portal  
> lib/buildTar.js  
> lib/initTar.js  
> services/fileSystem.js  


1.0.3 / 2017-2-8 16:50:15
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复单点消息超过64k自动关闭的异常


### modify files
> servers/websocket.js  
> tools/_util.html  
> tools/lib/util.js  
> tools/lib/websocket.js  


1.0.3 / 2017-2-8 17:17:32
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复解压tar包的时候-C 导致的子进程失败的异常


### modify files
> services/fileSystem.js  
> test/funTest.js  


1.0.3 / 2017-2-8 17:34:22
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 数据升级，后端通过tar包升级


### modify files
> services/fileSystem.js  
> services/goodsService.js  


1.0.3 / 2017-2-8 18:7:28
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 后端静态数据存储功能升级！


### modify files
> services/fileSystem.js  
> services/goodsService.js  


1.0.3 / 2017-2-8 18:27:9
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 读取服务器文件显示成功


### new files
> routers/goodses.js  

### modify files
> routers/index.js  
> servers/websocket.js  
> tools/_util.html  
> tools/lib/util.js  

### delete files
> routers/fileSystem.js  


1.0.3 / 2017-2-9 11:22:55
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复packejson中丢失redis和mail模块的问题，修复mailHelper发送邮件导致失败的问题，修复redisService中请求方式，重置大部分方法，采用hase进行处理。优化goodsService的数据查询处理


### new files
> test/mail_test.js  
> test/redis_test.js  

### modify files
> config/index.js  
> package.json  
> services/goodsService.js  
> services/redisService.js  
> tools/mailHelper.js  


1.0.3 / 2017-2-9 14:18:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 创建登录模板，重构buidPage工具的逻辑，添加单个方法


### new files
> template/pwdMail.pug  

### modify files
> config/index.js  
> services/userService.js  
> test/funTest.js  
> tools/buildPage.js  
> template/pwdMail.pug  


1.0.3 / 2017-2-9 14:46:49
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 多线程抓取异常功能提示优化，添加RESTfull接口 获取登录许可功能成功。


### modify files
> distributed/slave.js  
> routers/index.js  
> routers/user.js  
> servers/registry.js  
> services/userService.js  
> test/mail_test.js  


1.0.3 / 2017-2-9 15:32:28
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 后端完成登录功能


### modify files
> dao/user.js  
> routers/index.js  
> routers/user.js  
> services/userService.js  


1.0.3 / 2017-2-9 15:34:17
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 代码风格切换调整


### modify files
> servers/websocket.js  
> services/fileSystem.js  
> services/redisService.js  
> tools/buildPage.js  


1.0.3 / 2017-2-9 16:38:58
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 登录接口调入redis


### modify files
> interceptors/session.js  
> servers/registry.js  
> services/userService.js  


1.0.3 / 2017-2-9 17:46:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复server中无法操作session的异常


### new files
> services/sessionService.js  

### modify files
> errors/i18nError.json  
> interceptors/session.js  
> routers/user.js  
> services/redisService.js  
> services/userService.js  


1.0.3 / 2017-2-9 17:48:10
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复router中直接操作session出现异常


### modify files
> interceptors/session.js  


1.0.3 / 2017-2-9 18:0:8
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 调整session提交内容，重置部分方法


### modify files
> interceptors/session.js  
> routers/user.js  
> services/userService.js  


1.0.3 / 2017-2-10 9:58:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws模块升级，返回值标识字符编码，添加智能响应功能，不在出现系统原生提示信息，template添加404，500，提示的也面模板


### new files
> interceptors/smartNotFound.js  
> template/404NotFound.pug  
> template/journalError.pug  
> template/systemError.pug  

### modify files
> package.json  
> routers/goodses.js  
> routers/user.js  
> routers/workflow.js  
> servers/registry.js  
> test/funTest.js  

### delete files
> interceptors/jsonSmart.js  


1.0.3 / 2017-2-10 10:34:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复启动单节点失败的异常，能够单点启动服务


### new files
> distributed/single.js  

### modify files
> config/index.js  
> index.js  


1.0.3 / 2017-2-10 10:58:4
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 管理工具添加对标签的支持


### modify files
> tools/_util.html  
> tools/lib/util.js  


1.0.3 / 2017-2-10 14:23:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加标签模块的 ws删除标签功能


### new files
> services/tagsService.js  

### modify files
> index.js  
> servers/websocket.js  
> tools/_util.html  
> tools/lib/util.js  

### delete files
> services/tagService.js  


1.0.3 / 2017-2-10 15:1:44
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端完成删除标签，创建标签功能


### modify files
> tools/_util.html  
> tools/lib/util.js  


1.0.3 / 2017-2-10 15:31:38
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 版本升级，后端ws添加对标签功能的支持


### modify files
> errors/i18nError.json  
> services/tagsService.js  
> tools/_util.html  
> tools/lib/util.js  


1.0.3 / 2017-2-10 17:2:30
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 升级tagsServer支持删除标签功能


### modify files
> dao/public.js  
> tools/lib/util.js  


1.0.3 / 2017-2-11 15:48:12
==================
commit by afterloe (lm6289511@gmail.com)

  * master: tags 添加获取一组tag信息的方法，用于快速添加和处理tag


### modify files
> services/tagsService.js  


1.0.3 / 2017-2-12 14:48:22
==================
commit by afterloe (lm6289511@gmail.com)

  * master: userService 添加searchByTags方法


### modify files
> dao/public.js  
> interceptors/session.js  
> services/userService.js  


1.0.3 / 2017-2-12 16:15:56
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 职责链优化websocket链接


### new files
> servers/lib/  

### modify files
> services/userService.js  
> tools/chain.js  


1.0.3 / 2017-2-12 16:29:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws职责链调优


### modify files
> servers/lib/ws-handlerChain/echoChain.js  
> servers/lib/ws-handlerChain/index.js  
> servers/lib/ws-handlerChain/managerChain.js  
> servers/websocket.js  


1.0.3 / 2017-2-12 17:8:37
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws职责链调优


### new files
> servers/lib/servicesCenter.js  

### modify files
> servers/lib/ws-handlerChain/echoChain.js  
> servers/lib/ws-handlerChain/index.js  
> servers/lib/ws-handlerChain/managerChain.js  


1.0.3 / 2017-2-12 17:19:0
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws职责链调优


### modify files
> distributed/single.js  
> servers/lib/servicesCenter.js  
> servers/lib/ws-handlerChain/echoChain.js  
> servers/lib/ws-handlerChain/index.js  
> servers/lib/ws-handlerChain/managerChain.js  


1.0.3 / 2017-2-13 10:48:45
==================
commit by afterloe (lm6289511@gmail.com)

  * master: userService 添加tags系列服务，支持增加tags，查询。同时优化tools下web工具，添加系列辅助代码


### new files
> tools/webTools/  

### modify files
> Makefile  
> dao/public.js  
> errors/i18nError.json  
> servers/lib/ws-handlerChain/managerChain.js  
> services/tagsService.js  
> services/userService.js  
> test/funTest.js  

### delete files
> tools/_util.html  
> tools/lib/util.js  
> tools/lib/websocket.js  


1.0.3 / 2017-2-13 11:17:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: WS server添加执行方法拦截器，用于权限验证


### modify files
> servers/lib/servicesCenter.js  
> servers/lib/ws-handlerChain/managerChain.js  


1.0.3 / 2017-2-13 11:32:0
==================
commit by afterloe (lm6289511@gmail.com)

  * master: WS server添加用户权限拦截器，用于ws执行方法认证


### modify files
> errors/i18nError.json  
> servers/lib/servicesCenter.js  
> servers/lib/ws-handlerChain/managerChain.js  


1.0.3 / 2017-2-13 11:45:13
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws protocol echo服务测试


### modify files
> servers/lib/ws-handlerChain/managerChain.js  
> test/websocketCli  
> tools/webTools/lib/websocket.js  


1.0.3 / 2017-2-13 16:28:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加实例管理模态框，详细功能后续开发。后端userService添加方法支持实例信息查询


### new files
> tools/webTools/lib/.util.js.swp  

### modify files
> services/userService.js  
> tools/webTools/_util.html  
> tools/webTools/lib/util.js  


1.0.3 / 2017-2-13 18:11:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: tag添加service，修正之前导致的数据出现null的问题


### new files
> test/tagsService_test.js  

### modify files
> services/tagsService.js  
> tools/webTools/lib/util.js  


1.0.3 / 2017-2-13 18:35:3
==================
commit by afterloe (lm6289511@gmail.com)

  * master: server里全面部署exampleInfo方法，用于获取实例信息


### modify files
> services/goodsService.js  
> services/userService.js  
> services/workflowService.js  
> tools/webTools/_util.html  
> tools/webTools/lib/util.js  


1.0.3 / 2017-2-13 18:43:26
==================
commit by afterloe (lm6289511@gmail.com)

  * master: server里全面部署setTags方法，用于给常用对象设置标签


### modify files
> services/goodsService.js  
> services/workflowService.js  


1.0.3 / 2017-2-13 18:55:8
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复添加标签出现异常


### modify files
> services/goodsService.js  
> tools/webTools/lib/util.js  


1.0.3 / 2017-2-14 10:46:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 构建页面中间件，移除多余注入信息和方法


### new files
> interceptors/template.js  

### modify files
> interceptors/session.js  
> interceptors/smartNotFound.js  
> routers/goodses.js  
> routers/index.js  
> routers/user.js  
> routers/workflow.js  
> servers/registry.js  
> tools/buildPage.js  


1.0.3 / 2017-2-14 11:45:9
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 启动html转jade模板，去除css，js，images。将引用转到Nginx静态资源服务器


### new files
> template/login.pug  

### modify files
> config/index.js  
> interceptors/template.js  
> routers/user.js  
> template/journalError.pug  

### delete files
> webPage/css/bootstrap.min.css  
> webPage/css/directory.css  
> webPage/css/footer.css  
> webPage/css/header.css  
> webPage/css/home.css  
> webPage/css/login.css  
> webPage/css/mask.css  
> webPage/css/platform.css  
> webPage/css/product.css  
> webPage/css/public.css  
> webPage/fonts/glyphicons-halflings-regular.eot  
> webPage/fonts/glyphicons-halflings-regular.svg  
> webPage/fonts/glyphicons-halflings-regular.ttf  
> webPage/fonts/glyphicons-halflings-regular.woff  
> webPage/fonts/glyphicons-halflings-regular.woff2  
> webPage/fonts/ionicons.eot  
> webPage/fonts/ionicons.svg  
> webPage/fonts/ionicons.ttf  
> webPage/fonts/ionicons.woff  
> webPage/images/1-default.png  
> webPage/images/1.1.png  
> webPage/images/1.3.png  
> webPage/images/1.4.png  
> webPage/images/1.5.png  
> webPage/images/1.6.png  
> webPage/images/1.7.png  
> webPage/images/1.png  
> webPage/images/19.png  
> webPage/images/2-selected.png  
> webPage/images/2.2.png  
> webPage/images/2.png  
> webPage/images/3.1.1.png  
> webPage/images/3.1.png  
> webPage/images/3.2.2.png  
> webPage/images/3.2.png  
> webPage/images/3.3.1.png  
> webPage/images/3.3.3.png  
> webPage/images/3.3.png  
> webPage/images/3.4.4.png  
> webPage/images/3.4.png  
> webPage/images/3.5.5.png  
> webPage/images/3.5.png  
> webPage/images/3.png  
> webPage/images/4.4.png  
> webPage/images/4.png  
> webPage/images/5.5.png  
> webPage/images/5.png  
> webPage/images/6.png  
> webPage/images/bg.png  
> webPage/images/c4.png  
> webPage/images/c44.png  
> webPage/images/c5.png  
> webPage/images/c55.png  
> webPage/images/c6.png  
> webPage/images/c66.png  
> webPage/images/c7.png  
> webPage/images/c77.png  
> webPage/images/c8.png  
> webPage/images/c88.png  
> webPage/images/close-2.png  
> webPage/images/close-bounced-default.png  
> webPage/images/close-bounced-selected.png  
> webPage/images/close1.png  
> webPage/images/design.png  
> webPage/images/development.png  
> webPage/images/error.png  
> webPage/images/feedback.png  
> webPage/images/login-selected.png  
> webPage/images/login.png  
> webPage/images/logo.png  
> webPage/images/logoin.png  
> webPage/images/pc.png  
> webPage/images/plaformCatalog.png  
> webPage/images/plaformCatalogSel.png  
> webPage/images/plan.png  
> webPage/images/productCatalog.png  
> webPage/images/productCatalogSel.png  
> webPage/images/productDesignStatus.png  
> webPage/images/productDesignStatus1.png  
> webPage/images/productDesignStatus2.png  
> webPage/images/productDesignStatus3.png  
> webPage/images/productDesignStatus4.png  
> webPage/images/productDevelopStatus.png  
> webPage/images/productDevelopStatus1.png  
> webPage/images/productDevelopStatus2.png  
> webPage/images/productDevelopStatus3.png  
> webPage/images/productDevelopStatus4.png  
> webPage/images/productLink.png  
> webPage/images/productPlanStatus.png  
> webPage/images/productPlanStatus1.png  
> webPage/images/productPlanStatus2.png  
> webPage/images/productPlanStatus3.png  
> webPage/images/productPlanStatus4.png  
> webPage/images/productReleaseStatus.png  
> webPage/images/productReleaseStatus1.png  
> webPage/images/productReleaseStatus2.png  
> webPage/images/productReleaseStatus3.png  
> webPage/images/productReleaseStatus4.png  
> webPage/images/productTestStatus.png  
> webPage/images/productTestStatus1.png  
> webPage/images/productTestStatus2.png  
> webPage/images/productTestStatus3.png  
> webPage/images/productTestStatus4.png  
> webPage/images/publicCatalog.png  
> webPage/images/publicCatalogSel.png  
> webPage/images/release.png  
> webPage/images/save.png  
> webPage/images/save1.png  
> webPage/images/searchIcon.png  
> webPage/images/sj.png  
> webPage/images/ss.png  
> webPage/images/test.png  
> webPage/images/upload.png  
> webPage/images/upload1.png  
> "webPage/images/\344\270\213\350\275\275.png"  
> "webPage/images/\344\272\247\345\223\201\347\233\256\345\275\225-selected.png"  
> "webPage/images/\344\272\247\345\223\201\347\233\256\345\275\225.png"  
> "webPage/images/\345\205\254\345\205\261\347\233\256\345\275\225-selected.png"  
> "webPage/images/\345\205\254\345\205\261\347\233\256\345\275\225.png"  
> "webPage/images/\345\271\263\345\217\260\347\233\256\345\275\225-selected.png"  
> "webPage/images/\345\271\263\345\217\260\347\233\256\345\275\225.png"  
> "webPage/images/\346\265\213\350\257\225-1.png"  
> "webPage/images/\351\223\276\346\216\245-default-.png"  
> webPage/js/bootstrap.min.js  
> webPage/js/directory.js  
> webPage/js/footer.js  
> webPage/js/header.js  
> webPage/js/home.js  
> webPage/js/jquery-2.1.1.js  
> webPage/js/jquery.easing.min.js  
> webPage/js/jquery.flexslider-min.js  
> webPage/js/login.js  
> webPage/js/masonry.pkgd.min.js  
> webPage/js/platform.js  
> webPage/js/product.js  
> webPage/js/rem.js  
> webPage/login.html  


1.0.3 / 2017-2-14 14:31:27
==================
commit by afterloe (lm6289511@gmail.com)

  * master: login功能实现


### modify files
> interceptors/template.js  
> template/login.pug  


1.0.3 / 2017-2-14 14:48:21
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完成登录功能，编写拦截器


### new files
> interceptors/authentication.js  
> routers/portal.js  

### modify files
> routers/index.js  
> routers/user.js  


1.0.3 / 2017-2-14 14:54:43
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 权限拦截器编写完成


### modify files
> interceptors/authentication.js  
> template/login.pug  


1.0.3 / 2017-2-14 15:14:54
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加统一的header和footer信息，修改404，journal，systemError页面


### new files
> template/home.pug  

### modify files
> routers/portal.js  
> template/404NotFound.pug  
> template/footer.pug  
> template/header.pug  
> template/journalError.pug  
> template/systemError.pug  


1.0.3 / 2017-2-14 15:39:15
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加home.pug文件，修改公共头部和尾部信息


### modify files
> template/home.pug  


1.0.3 / 2017-2-14 17:26:46
==================
commit by afterloe (lm6289511@gmail.com)

  * master: platform页面跳转


### new files
> template/platform.pug  
> webPage/platform.js  

### modify files
> interceptors/authentication.js  
> routers/index.js  
> routers/portal.js  
> template/header.pug  
> webPage/platform.html  


1.0.3 / 2017-2-14 17:31:56
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 同步文件


### new files
> webPage/css/  
> webPage/images/  
> webPage/js/  

### delete files
> webPage/font-awesome/css/font-awesome.css  
> webPage/font-awesome/css/font-awesome.min.css  
> webPage/font-awesome/fonts/FontAwesome.otf  
> webPage/font-awesome/fonts/fontawesome-webfont.eot  
> webPage/font-awesome/fonts/fontawesome-webfont.svg  
> webPage/font-awesome/fonts/fontawesome-webfont.ttf  
> webPage/font-awesome/fonts/fontawesome-webfont.woff  
> webPage/font-awesome/less/bordered-pulled.less  
> webPage/font-awesome/less/core.less  
> webPage/font-awesome/less/fixed-width.less  
> webPage/font-awesome/less/font-awesome.less  
> webPage/font-awesome/less/icons.less  
> webPage/font-awesome/less/larger.less  
> webPage/font-awesome/less/list.less  
> webPage/font-awesome/less/mixins.less  
> webPage/font-awesome/less/path.less  
> webPage/font-awesome/less/rotated-flipped.less  
> webPage/font-awesome/less/spinning.less  
> webPage/font-awesome/less/stacked.less  
> webPage/font-awesome/less/variables.less  
> webPage/font-awesome/scss/_bordered-pulled.scss  
> webPage/font-awesome/scss/_core.scss  
> webPage/font-awesome/scss/_fixed-width.scss  
> webPage/font-awesome/scss/_icons.scss  
> webPage/font-awesome/scss/_larger.scss  
> webPage/font-awesome/scss/_list.scss  
> webPage/font-awesome/scss/_mixins.scss  
> webPage/font-awesome/scss/_path.scss  
> webPage/font-awesome/scss/_rotated-flipped.scss  
> webPage/font-awesome/scss/_spinning.scss  
> webPage/font-awesome/scss/_stacked.scss  
> webPage/font-awesome/scss/_variables.scss  
> webPage/font-awesome/scss/font-awesome.scss  


1.0.3 / 2017-2-14 17:33:0
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加备注


### modify files
> config/index.js  


1.0.3 / 2017-2-14 17:54:58
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 删除多余文件


### delete files
> platform.js  


1.0.3 / 2017-2-15 11:14:4
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 产品页面html转jade完毕


### new files
> template/product.pug  

### modify files
> interceptors/smartNotFound.js  
> routers/index.js  
> routers/portal.js  
> template/header.pug  
> template/platform.pug  
> webPage/css/portal/product.css  
> webPage/js/portal/product.js  
> webPage/product.html  


1.0.3 / 2017-2-15 11:42:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 公共目录html转pug


### new files
> template/directory.pug  

### modify files
> routers/index.js  
> routers/portal.js  
> template/header.pug  
> webPage/css/portal/directory.css  
> webPage/js/portal/directory.js  


1.0.3 / 2017-2-15 11:46:12
==================
commit by afterloe (lm6289511@gmail.com)

  * master: mask样式丢失的问题


### modify files
> webPage/css/portal/mask.css  


1.0.3 / 2017-2-15 14:13:16
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 动态header实现


### modify files
> routers/portal.js  
> template/header.pug  


1.0.3 / 2017-2-15 14:32:27
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 404, journalError, SystemError pug模板 按钮方法完善


### modify files
> template/404NotFound.pug  
> template/header.pug  
> template/journalError.pug  
> template/systemError.pug  


1.0.3 / 2017-2-15 14:38:46
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完善代码风格


### modify files
> config/index.js  
> distributed/single.js  
> interceptors/smartNotFound.js  
> servers/lib/ws-handlerChain/managerChain.js  


1.0.3 / 2017-2-15 14:49:50
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 调整代码位置，捕获SystemError


### modify files
> config/index.js  
> distributed/single.js  
> distributed/slave.js  
> interceptors/authentication.js  
> interceptors/session.js  
> interceptors/smartNotFound.js  
> servers/registry.js  


1.0.4 / 2017-2-15 14:55:13
==================
commit by afterloe (lm6289511@gmail.com)

  * master: tag 1.0.4 发布


### modify files
> .cynomy  
> README.md  
> package.json  

### delete files
> README.md  


1.0.5 / 2017-2-15 18:31:12
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 1.0.5开发开始，远程功能开始构建


### new files
> bin/remoteDaemon.js  
> bin/wsCli  
> servers/lib/ws-handlerChain/remoteChain.js  

### modify files
> .cynomy  
> config/index.js  
> index.js  
> package.json  
> servers/lib/ws-handlerChain/index.js  
> servers/lib/ws-handlerChain/managerChain.js  
> servers/websocket.js  
> template/login.pug  
> tools/webTools/lib/websocket.js  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-15 18:51:35
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 消息机制升级，接受发送信息待优化


### modify files
> bin/remoteDaemon.js  
> bin/wsCli  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-16 11:30:8
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 消息组件组装完毕


### modify files
> bin/remoteDaemon.js  
> bin/wsCli  
> interceptors/template.js  

### delete files
> bin/remoteDaemon.js  
> test/websocketCli  


1.0.5 / 2017-2-16 15:5:20
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 远端管理，http注册活动


### new files
> bin/registryNodeServer  
> routers/nodeManager.js  

### modify files
> bin/remoteDaemon.js  
> bin/wsCli  
> config/index.js  
> routers/index.js  
> servers/lib/ws-handlerChain/remoteChain.js  
> test/funTest.js  
> routers/nodeManager.js  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-16 15:6:30
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 删除测试数据


### modify files
> routers/index.js  


1.0.5 / 2017-2-16 17:11:9
==================
commit by afterloe (lm6289511@gmail.com)

  * master: remote service 部署


### new files
> servers/lib/scriptsCenter.js  

### modify files
> config/index.js  
> servers/lib/ws-handlerChain/remoteChain.js  


1.0.5 / 2017-2-16 17:31:38
==================
commit by afterloe (lm6289511@gmail.com)

  * master: remote serivce 丰富功能，添加测试


### modify files
> routers/index.js  
> servers/lib/ws-handlerChain/remoteChain.js  


1.0.5 / 2017-2-16 18:26:25
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws bug WS 断开连接的时候无法自动重连,发送时容易出现太多异常，启动的时候有时连接不到ws


### modify files
> bin/remoteDaemon.js  
> routers/index.js  
> servers/lib/scriptsCenter.js  
> servers/lib/ws-handlerChain/remoteChain.js  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-17 11:28:5
==================
commit by afterloe (lm6289511@gmail.com)

  * master: ws切断重连机制


### modify files
> bin/remoteDaemon.js  
> bin/wsCli  
> index.js  
> servers/lib/ws-handlerChain/remoteChain.js  
> servers/registry.js  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-17 14:35:16
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 优化ws重启活动，发送机制


### modify files
> bin/remoteDaemon.js  
> bin/wsCli  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-17 14:38:3
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 优化ws重启发送机制，只发送最近的100条离线消息


### modify files
> bin/remoteDaemon.js  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-17 17:4:48
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加查看内存的方法


### modify files
> bin/remoteDaemon.js  
> index.js  
> services/fileSystem.js  
> test/funTest.js  

### delete files
> bin/remoteDaemon.js  


1.0.5 / 2017-2-17 17:30:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 内存查询扩展至linux平台


### modify files
> services/fileSystem.js  


1.0.5 / 2017-2-17 18:23:49
==================
commit by afterloe (lm6289511@gmail.com)

  * master: system添加系统信息方法


### modify files
> services/fileSystem.js  


1.0.5 / 2017-2-18 23:10:46
==================
commit by afterloe (lm6289511@gmail.com)

  * master: system 添加方法hardDiskInfo


### modify files
> services/fileSystem.js  


1.0.5 / 2017-2-19 21:5:35
==================
commit by afterloe (lm6289511@gmail.com)

  * master: script添加执行获取系统信息的方法


### modify files
> servers/lib/scriptsCenter.js  
> servers/lib/ws-handlerChain/remoteChain.js  


1.0.5 / 2017-2-20 10:55:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改fileSystem脚本启动异常


### modify files
> servers/lib/scriptsCenter.js  


1.0.5 / 2017-2-20 11:11:31
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 更新platform 页面模板


### modify files
> template/platform.pug  


1.0.5 / 2017-2-20 11:17:29
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 更新产品页面


### modify files
> template/product.pug  


1.0.5 / 2017-2-20 11:27:57
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 公共目录升级优化


### modify files
> template/directory.pug  
> webPage/css/portal/directory.css  


1.0.5 / 2017-2-20 15:40:56
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 后端数据升级，提供产品真实数据


### modify files
> config/index.js  
> dao/public.js  
> doc/user.xlsx  
> interceptors/smartNotFound.js  
> routers/portal.js  
> servers/registry.js  
> services/workflowService.js  
> template/platform.pug  
> test/funTest.js  


1.0.5 / 2017-2-20 16:16:44
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 提升中间件smartNotFound功能，自动匹配页面和json文件


### modify files
> interceptors/smartNotFound.js  
> routers/goodses.js  
> routers/index.js  
> routers/nodeManager.js  
> routers/portal.js  
> routers/user.js  
> routers/workflow.js  


1.0.5 / 2017-2-20 16:57:50
==================
commit by afterloe (lm6289511@gmail.com)

  * master: platform页面数据动态化完毕


### modify files
> template/platform.pug  


1.0.5 / 2017-2-20 18:28:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改三个点导致消息益处


### modify files
> template/platform.pug  
> webPage/css/portal/directory.css  
> webPage/css/portal/platform.css  
> webPage/css/portal/product.css  


1.0.5 / 2017-2-20 18:39:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 扩展css


### modify files
> template/directory.pug  
> template/product.pug  

