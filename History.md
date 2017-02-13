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

