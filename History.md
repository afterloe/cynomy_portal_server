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


1.0.6 / 2017-2-25 0:57:35
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 详细请见history  

### modify files
> dao/tag.js  
> routers/index.js  
> template/home.pug  
> template/platform.pug  
> webPage/css/portal/platform.css  
> webPage/css/portal/product.css  
> webPage/js/portal/src/directory.js  
> webPage/js/portal/src/home.js  
> webPage/js/portal/src/platform.js  

2017-2-25 更新内容

portal 登录页
	1）修复 - 页面在屏幕宽度小于768的设备上因自适应而导致的登录功能失常的问题。
	2）优化 - 登录许可由32位uuid字符串修改为4位数字，该许可只能使用1次，登陆过后无效。

portal 首页
	1）优化 - 联系我们 功能优化，直接跳转到论坛反馈区域。可在该页面进行反馈，或留言。
	2）修复 - 点击平台目录下的项目名称时出现404异常，修正为跳转到平台页面进行查看。
	3）修复 - 点击产品目录下的项目名称时出现的404异常，修正为跳转到产品页面进行查看。
	4）修复 - 点击产品目录，产品版本号排序的异常。由按照更新次数排序修正为按产品发布时间排序。

portal 平台页
	1）优化 - 联系我们 功能优化，直接跳转到论坛反馈区域。可在该页面进行反馈，或留言。
	2）修复 - TRU Mate标题对应的平台图标丢失的问题。
	3）修复 - 平台排序异常，由按照更新次数排序修正为按平台发布时间排序。
	4）修复 - 屏幕宽度小于768的设备上查看项目产出文件列表时没有下载提示，由双击文件两次才能下载修正为点击文件名即可下载。
	5）新增 - 屏幕宽度大于768的设备上在查看项目产出文件列表时，可以点击文件名进行下载。

portal 产品页
	1）优化 - 联系我们 功能优化，直接跳转到论坛反馈区域。可在该页面进行反馈，或留言。
	2）修复 - TRU Mate标题对应的平台图标丢失的问题。
	3）修复 - 产品排序异常，由按照更新次数排序修正为按产品发布时间排序。
	4）修复 - 屏幕宽度小于768的设备上查看项目产出文件列表时没有下载提示，由双击文件两次才能下载修正为点击文件名即可下载。
	5）新增 - 屏幕宽度大于768的设备上在查看项目产出文件列表时，可以点击文件名进行下载。

其他
	1）进入R&D首页(http://rd.jwis.cn)的时候出现404的异常。
	2）优化 - 静态资源搜索位置优化。

说明：
	1）在portal登录页点击获取的登录许可是一次性的，使用之后就不能再次使用。
	2）用户采用非注册方式，如果登录时提示用户不存在可以联系网站管理员(lucy.tu@jwis.cn)。
	3）公共页面的内容需要项目上对应的负责人进行管理，所以目前是没有内容的。
	4）部分浏览器可能存在兼容问题，如果出现兼容问题可以邮件联系我(afterloeliu@jwis.cn)，目前不支持ie，如果想获取更好的体验请使用最新版本的google浏览器。
	5）如果有什么建议或许吐槽可以点击页面上的 联系我们 进行留言或发邮件联系我(afterloeliu@jwis.cn)。

1.0.6 / 2017-2-26 14:30:35
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改项目构建History


### modify files
> History.md  


1.0.6 / 2017-2-27 14:57:21
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 开启外网访问权限，修改了requestIP的获取方式，platform，portal添加了user返回，前端页面添加了上传文件列表的方法。


### modify files
> config/index.js  
> interceptors/session.js  
> routers/portal.js  
> template/platform.pug  
> webPage/js/portal/src/platform.js  


1.0.6 / 2017-2-27 15:3:41
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 后端开启访问接口，修改工作流进度


### modify files
> routers/goodses.js  
> routers/index.js  
> template/platform.pug  


1.0.6 / 2017-2-27 15:29:2
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 上传文件接口


### modify files
> package.json  
> routers/goodses.js  
> services/goodsService.js  


1.0.6 / 2017-2-27 16:20:40
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 上传文件接口ready


### modify files
> routers/goodses.js  
> services/goodsService.js  
> services/workflowService.js  


1.0.6 / 2017-2-27 16:51:3
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端单文件上传功能ready


### modify files
> routers/goodses.js  
> services/goodsService.js  


1.0.6 / 2017-2-27 20:43:20
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 增加锁机制


### modify files
> index.js  
> routers/goodses.js  
> services/workflowService.js  


1.0.6 / 2017-2-27 20:57:13
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 支持新版下载功能


### modify files
> routers/goodses.js  
> services/fileSystem.js  
> services/goodsService.js  

