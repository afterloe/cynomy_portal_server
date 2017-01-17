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

