Portal build历史
###
> MIT Licensed  
> author: afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> mail: lm6289511@gmail.com  
> webSite: https://github.com/afterloe  

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

1.0.7 / 2017-3-1 20:6:51
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 2017-3-1 20:06:51 commit change.


### modify files
> .cynomy  
> config/index.js  
> package.json  
> template/platform.pug  
> webPage/js/portal/src/platform.js  

2017-3-2 更新公告 更新内容  

1）优化 util工具页面工作流管理页面，人员管理页面布局优化。  
2）优化 util工具页面工作流管理页面，标签添加页面布局优化。  
3）新功能 全局开放工作流文件上传功能。只有本项目组成员才能进行文件上传操作，上传支持多文件并发上传。非项目组成员无法查看上传文件的按钮，当前节点管理员或工作流总负责人拥有删除文件的按钮。  
4）新功能 util工具页面开放删除用户功能。  
5）新功能 util工具页面开放删除删除文件功能。  
6）新功能 util工具页面开放工作流添加项目成员功能。  
7）修复 portal home 页面的工作流图标不显示或显示错误的异常。  
8）修复 portal home 页面最后一个工作流出现延长线的异常。  
9）修复 util工具页面获取概况功能时websocket自动断开的异常。  

1.0.7 / 2017-3-2 10:16:33
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改build log History


### modify files
> History.md  


1.0.7 / 2017-3-2 10:22:8
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改文件目录


### new files
> staticFiles/  

### modify files
> Makefile  

### delete files
> webPage/css/portal/bootstrap.min.css  
> webPage/css/portal/directory.css  
> webPage/css/portal/footer.css  
> webPage/css/portal/header.css  
> webPage/css/portal/home.css  
> webPage/css/portal/login.css  
> webPage/css/portal/mask.css  
> webPage/css/portal/platform.css  
> webPage/css/portal/product.css  
> webPage/css/portal/public.css  
> webPage/directory.html  
> webPage/home.html  
> webPage/images/portal/1-default.png  
> webPage/images/portal/1.1.png  
> webPage/images/portal/1.3.png  
> webPage/images/portal/1.4.png  
> webPage/images/portal/1.5.png  
> webPage/images/portal/1.6.png  
> webPage/images/portal/1.7.png  
> webPage/images/portal/1.png  
> webPage/images/portal/19.png  
> webPage/images/portal/2-selected.png  
> webPage/images/portal/2.2.png  
> webPage/images/portal/2.png  
> webPage/images/portal/3.1.1.png  
> webPage/images/portal/3.1.png  
> webPage/images/portal/3.2.2.png  
> webPage/images/portal/3.2.png  
> webPage/images/portal/3.3.1.png  
> webPage/images/portal/3.3.3.png  
> webPage/images/portal/3.3.png  
> webPage/images/portal/3.4.4.png  
> webPage/images/portal/3.4.png  
> webPage/images/portal/3.5.5.png  
> webPage/images/portal/3.5.png  
> webPage/images/portal/3.png  
> webPage/images/portal/4.4.png  
> webPage/images/portal/4.png  
> webPage/images/portal/5.5.png  
> webPage/images/portal/5.png  
> webPage/images/portal/6.png  
> webPage/images/portal/android.png  
> webPage/images/portal/bg.png  
> webPage/images/portal/c4.png  
> webPage/images/portal/c44.png  
> webPage/images/portal/c5.png  
> webPage/images/portal/c55.png  
> webPage/images/portal/c6.png  
> webPage/images/portal/c66.png  
> webPage/images/portal/c7.png  
> webPage/images/portal/c77.png  
> webPage/images/portal/c8.png  
> webPage/images/portal/c88.png  
> webPage/images/portal/close-2.png  
> webPage/images/portal/close-bounced-default.png  
> webPage/images/portal/close-bounced-selected.png  
> webPage/images/portal/close1.png  
> webPage/images/portal/design.png  
> webPage/images/portal/development.png  
> webPage/images/portal/down.png  
> webPage/images/portal/error.png  
> webPage/images/portal/feedback.png  
> webPage/images/portal/login-selected.png  
> webPage/images/portal/login.png  
> webPage/images/portal/logo.png  
> webPage/images/portal/logoin.png  
> webPage/images/portal/pc.png  
> webPage/images/portal/plaformCatalog.png  
> webPage/images/portal/plaformCatalogSel.png  
> webPage/images/portal/plan.png  
> webPage/images/portal/productCatalog.png  
> webPage/images/portal/productCatalogSel.png  
> webPage/images/portal/productDesignStatus.png  
> webPage/images/portal/productDesignStatus1.png  
> webPage/images/portal/productDesignStatus2.png  
> webPage/images/portal/productDesignStatus3.png  
> webPage/images/portal/productDesignStatus4.png  
> webPage/images/portal/productDevelopStatus.png  
> webPage/images/portal/productDevelopStatus1.png  
> webPage/images/portal/productDevelopStatus2.png  
> webPage/images/portal/productDevelopStatus3.png  
> webPage/images/portal/productDevelopStatus4.png  
> webPage/images/portal/productLink.png  
> webPage/images/portal/productPlanStatus.png  
> webPage/images/portal/productPlanStatus1.png  
> webPage/images/portal/productPlanStatus2.png  
> webPage/images/portal/productPlanStatus3.png  
> webPage/images/portal/productPlanStatus4.png  
> webPage/images/portal/productReleaseStatus.png  
> webPage/images/portal/productReleaseStatus1.png  
> webPage/images/portal/productReleaseStatus2.png  
> webPage/images/portal/productReleaseStatus3.png  
> webPage/images/portal/productReleaseStatus4.png  
> webPage/images/portal/productTestStatus.png  
> webPage/images/portal/productTestStatus1.png  
> webPage/images/portal/productTestStatus2.png  
> webPage/images/portal/productTestStatus3.png  
> webPage/images/portal/productTestStatus4.png  
> webPage/images/portal/publicCatalog.png  
> webPage/images/portal/publicCatalogSel.png  
> webPage/images/portal/release.png  
> webPage/images/portal/save.png  
> webPage/images/portal/save1.png  
> webPage/images/portal/searchIcon.png  
> webPage/images/portal/ss.png  
> webPage/images/portal/test.png  
> webPage/images/portal/upload.png  
> webPage/images/portal/upload1.png  
> "webPage/images/portal/\344\272\247\345\223\201\347\233\256\345\275\225-selected.png"  
> "webPage/images/portal/\344\272\247\345\223\201\347\233\256\345\275\225.png"  
> "webPage/images/portal/\345\205\254\345\205\261\347\233\256\345\275\225-selected.png"  
> "webPage/images/portal/\345\205\254\345\205\261\347\233\256\345\275\225.png"  
> "webPage/images/portal/\345\271\263\345\217\260\347\233\256\345\275\225-selected.png"  
> "webPage/images/portal/\345\271\263\345\217\260\347\233\256\345\275\225.png"  
> "webPage/images/portal/\346\265\213\350\257\225-1.png"  
> "webPage/images/portal/\351\223\276\346\216\245-default-.png"  
> webPage/js/portal/bootstrap.min.js  
> webPage/js/portal/jquery-2.1.1.js  
> webPage/js/portal/jquery.easing.min.js  
> webPage/js/portal/jquery.flexslider-min.js  
> webPage/js/portal/masonry.pkgd.min.js  
> webPage/js/portal/rem.js  
> webPage/js/portal/src/directory.js  
> webPage/js/portal/src/footer.js  
> webPage/js/portal/src/header.js  
> webPage/js/portal/src/home.js  
> webPage/js/portal/src/login.js  
> webPage/js/portal/src/platform.js  
> webPage/js/portal/src/product.js  
> webPage/platform.html  
> webPage/product.html  


1.0.7 / 2017-3-2 14:52:58
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加新页面 工作流详情


### new files
> template/workflowInfo.pug  

### modify files
> routers/index.js  
> routers/portal.js  


1.0.7 / 2017-3-2 15:6:25
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复点击上传按钮失效的问题


### modify files
> staticFiles/js/portal/src/platform.js  
> template/platform.pug  
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 15:9:43
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完成workflowInfo页面


### modify files
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 15:17:37
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 优化切换方案


### modify files
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 15:26:54
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改info页面


### modify files
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 16:40:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加查看详情按钮


### new files
> staticFiles/images/portal/detail.png  
> staticFiles/images/portal/detail_click.png  

### modify files
> staticFiles/css/portal/platform.css  
> template/home.pug  
> template/platform.pug  


1.0.7 / 2017-3-2 16:51:45
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改显示样式


### modify files
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 17:5:54
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 同步跳转链接


### modify files
> staticFiles/js/portal/src/platform.js  
> template/platform.pug  


1.0.7 / 2017-3-2 17:38:37
==================
commit by afterloe (lm6289511@gmail.com)

  * master: workflow 详情页面开发


### modify files
> routers/portal.js  
> services/workflowService.js  
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 17:50:35
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 补全workflow信息


### modify files
> template/platform.pug  
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 17:56:12
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完成前端节点切换功能


### modify files
> routers/index.js  
> routers/workflow.js  
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 18:4:9
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 后端完成工作流节点检索功能


### modify files
> routers/workflow.js  
> services/workflowService.js  


1.0.7 / 2017-3-2 18:23:58
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端初步完成节点单击⌚事件


### modify files
> template/workflowInfo.pug  


1.0.7 / 2017-3-2 20:9:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端完成工作流设置主负责人方法


### modify files
> tools/webTools/_util.html  
> tools/webTools/lib/src/util.js  


1.0.7 / 2017-3-2 20:15:57
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 后端完成工作流设置主负责人方法


### modify files
> services/userService.js  
> services/workflowService.js  
> tools/webTools/lib/src/util.js  


1.0.7 / 2017-3-3 10:9:36
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复设置owner时出现异常问题，serviceCenrer添加异常堆栈输出功能


### modify files
> servers/lib/ws-handlerChain/managerChain.js  
> services/userService.js  
> services/workflowService.js  

