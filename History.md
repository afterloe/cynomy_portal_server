History.md
###
> MIT Licensed  
> author: afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> mail:   
> webSite:   

Portal 资源开发历史
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

