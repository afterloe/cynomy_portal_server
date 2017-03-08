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

1.0.8 / 2017-3-5 6:38:35
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 1.0.8升级版


### new files
> staticFiles/css/portal/workflowInfo.css  
> staticFiles/js/portal/src/workflowInfo.js  

### modify files
> .cynomy  
> config/index.js  
> package.json  
> staticFiles/js/portal/src/directory.js  
> staticFiles/js/portal/src/footer.js  
> staticFiles/js/portal/src/header.js  
> staticFiles/js/portal/src/home.js  
> staticFiles/js/portal/src/login.js  
> staticFiles/js/portal/src/platform.js  
> staticFiles/js/portal/src/product.js  
> template/home.pug  
> template/platform.pug  
> template/workflowInfo.pug  

2017-3-5 更新公告  

更新时间  
————————————————  
2017-3-5 08:30 ～ 2017-3-5 10：30，预计停机维护时间为1小时，维护期间访问可能出现404或500异常，对您的使用产生不变深感抱歉。  

更新内容  
————————————————  
1）优化 - 显示细节，修复移动端显示的优化  
2）优化 - 上传工具栏由队列上传改成并发上传，最大并发数为5，最长等待时间为最大文件的上传时间。由于开发时间不足，上传时页面会出现卡顿。请等待在上传任务的弹窗口自动关闭才是上传完成，我们将在下个迭代中进一步优化。如果上传按钮不存在则说明当前登陆用户非该项目组成员，具体项目成员信息可以在工作流详情页面查看。  
3）优化 - 当用户登陆权限失效之后，用户再在当前页面请求会一直弹出系统繁忙的提示。目前修复为当用户登陆失效之后页面会弹出对应失效的提示，自动跳转到登陆页。  
4）优化 - 首页信息显示问题  
5）新功能 - 开发新页面 工作流详情页面。点击portal首页点击产品下的链接 或 在对应工作流预览下点击文件列表标题右侧的按钮 能够进入到工作流详情页面，在详情页能够看到当前工作流的名字、立项时间、项目总负责人、项目参与人员、当前工作流程节点、对应流程节点的详细信息，包括进入流程的时间，项目给个阶段的负责人，节点跟新次数以及当前节点对应的svn路径。svn路径是由当前节点负责人进行配置，所以可能是一个内网ip或一个外网链接。点击资料仓库标题栏的右侧能够展示出portal上已有的文件信息，该文件是自动同步svn显示，并且提供下载。  
6）新功能 - 开放前端上传功能，当登陆用户为某个项目的参与者，则能够给相应的工作流节点上添加文件，该文件会存放于portal的文件系统中，存在于portal文件系统中的文件前端是具备下载权限的，同时该文件会等待项目总负责人确认，确认后portal将其自动同步到对应的svn中。由于上传功能取决于用户带宽，具体等待时间不定。  


策划面对面  
————————————————  
1）
  问题 ：登陆需要获取邮件验证码且页面过期时间短导致每次登陆非常麻烦，希望优化。  
  回答 ：对于该问题我们非常抱歉，当初构建portal的时候考虑是用手机验证码，由于某些因素并没有实现短信通知而采用了邮件。我们将在下个更新的时候优化登陆过程，恢复密码登陆。  
2）
  问题 ：我想在portal上创建流程并发布信息该怎么做。  
  回答 ：目前portal的数据操作基于工具。而工具目前处于开发调试状态，所以请需要在portal上创建项目的同事请联系我（afterloeliu@jwis.cn），发布信息的话只要登陆人员为该项目组成员即可上传更新文件。  
3）
  问题 ：我的项目具有特殊性，不是页面上的5个流程，portal支持创建吗？  
  回答 ：portal借鉴了windchill的工作流，是能够支持自定义创建节点的，同时也支持自定义节点来共建工作流。具体是在工具上进行操作，目前工具仍处于开发调试状态，请有特殊需要的同事联系我(afterloeliu@jwis.cn)。  
4）
  问题 ：portal上传工具什么时候能够使用？  
  回答 ：portal工具采用websocket进行构建，规划是tru app 一款，android一款，ios一款。由于时间限制，会先发布tru app，portal工具具有很多想不到特点，敬请期待。  
5）
  问题 ：portal周日的时候访问有时候会出现500   
  回答 ：portal是每周日进行维护更新，由于项目立项时间短，没有能够先行通知，我们感到很抱歉，在portal首页公告栏功能发布之前，每周更新都会采用邮件的形式进行公告。多有不便之处请谅解。  

下周更新预告  
————————————————  
1）登陆过程将进行优化  
2）丰富工作流信息，支持更多链接  
3）页面版图调整  
4）portal工具推广内测  


如果您在portal的使用上有问题或想吐槽的可以邮件联系我(afterloeliu@jwis.cn)或联系涂露(lucy.tu@jwis.cn)。在或者在portal的建议反馈内进行留言。我们会在第一时间内回复，对于典型的问题将在下次的更新公告中的 策划面对面 板块上墙。  

1.0.8 / 2017-3-5 6:41:51
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 1.0.8build History


### modify files
> History.md  


1.0.8 / 2017-3-5 6:44:41
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复make问题


### modify files
> routers/portal.js  


1.0.8 / 2017-3-5 6:46:0
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复build问题


### modify files
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-5 7:20:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: portal 登陆异常


### modify files
> staticFiles/js/portal/src/login.js  
> template/login.pug  


1.0.8 / 2017-3-5 8:58:28
==================
commit by afterloe (lm6289511@gmail.com)

  * master: v1.0.8 正式发布


### modify files
> routers/portal.js  
> staticFiles/css/portal/platform.css  
> template/login.pug  
> template/platform.pug  
> template/workflowInfo.pug  


1.0.8 / 2017-3-6 9:53:18
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复detail hover的时图标浮动的异常


### modify files
> staticFiles/css/portal/platform.css  


1.0.8 / 2017-3-6 13:56:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: setLeader 方法升级，前端完成设置工作流实例节点的功能


### modify files
> services/workflowService.js  
> tools/webTools/lib/src/initWebPage.js  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-6 14:23:37
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端完成切换工作流节点负责人功能


### modify files
> services/workflowService.js  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-6 15:11:23
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端完成设置单节点svn数据


### modify files
> tools/webTools/lib/src/initWebPage.js  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-6 15:32:26
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完成单节点设置svn地址


### modify files
> services/workflowService.js  
> tools/webTools/dataManager.html  
> tools/webTools/lib/src/initWebPage.js  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-6 16:27:44
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完成节点card切换


### modify files
> tools/webTools/lib/src/initWebPage.js  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-6 16:54:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端完成切换网络切换工作流节点


### modify files
> services/workflowService.js  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-6 17:4:39
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 切换regist文件，将注册响应事件换到其他js中


### new files
> tools/webTools/lib/src/registry.js  

### modify files
> tools/webTools/dataManager.html  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-6 18:13:48
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端工作流添加自定义拓展


### modify files
> config/index.js  
> staticFiles/js/portal/src/workflowInfo.js  
> tools/webTools/lib/src/registry.js  
> tools/webTools/lib/src/util.js  


1.0.8 / 2017-3-7 13:44:31
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改login登陆逻辑


### modify files
> template/login.pug  


1.0.8 / 2017-3-7 16:51:13
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 添加openssl类库，支持加密解密


### modify files
> config/index.js  
> routers/index.js  
> routers/user.js  
> services/userService.js  
> template/login.pug  
> test/funTest.js  
> tools/security.js  

### delete files
> _config.yml  


1.0.8 / 2017-3-7 17:17:21
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修改登陆逻辑


### modify files
> services/sessionService.js  
> services/userService.js  
> tools/security.js  


1.0.8 / 2017-3-7 17:33:47
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完成单点登录过程


### modify files
> routers/index.js  
> routers/user.js  
> services/sessionService.js  
> template/pwdMail.pug  
> tools/security.js  


1.0.8 / 2017-3-7 17:40:19
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 产品显示修改为左上为最新


### modify files
> dao/tag.js  
> dao/workflow-instance.js  


1.0.8 / 2017-3-7 18:14:39
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 前端改版


### new files
> staticFiles/images/portal/line-default.png  
> staticFiles/images/portal/line-selected.png  
> staticFiles/images/portal/loginLogo.png  
> staticFiles/images/portal/titleLogo.png  

### modify files
> staticFiles/css/portal/header.css  
> template/header.pug  
> template/login.pug  


1.0.8 / 2017-3-8 13:48:57
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 初步完成rd各个部门首页


### new files
> template/adHome.pug  
> template/psHome.pug  
> template/rdHome.pug  

### modify files
> routers/index.js  
> routers/portal.js  
> routers/workflow.js  
> template/header.pug  


1.0.8 / 2017-3-8 14:6:23
==================
commit by afterloe (lm6289511@gmail.com)

  * master: router分级，初步完成portal首页规划


### new files
> routers/ad-portal.js  
> routers/ps-portal.js  
> routers/rd-portal.js  

### modify files
> routers/index.js  
> routers/portal.js  


1.0.8 / 2017-3-8 14:22:5
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 文件目录调整


### new files
> staticFiles/css/portal/rd/  
> staticFiles/js/portal/src/rd/  

### modify files
> template/adHome.pug  
> template/psHome.pug  
> template/rdHome.pug  

### delete files
> staticFiles/css/portal/directory.css  
> staticFiles/css/portal/home.css  
> staticFiles/css/portal/platform.css  
> staticFiles/css/portal/product.css  
> staticFiles/js/portal/src/directory.js  
> staticFiles/js/portal/src/home.js  
> staticFiles/js/portal/src/platform.js  
> staticFiles/js/portal/src/product.js  


1.0.8 / 2017-3-8 14:45:35
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 修复check异常


### modify files
> config/index.js  
> routers/portal.js  
> staticFiles/css/portal/rd/home.css  
> tools/security.js  


1.0.8 / 2017-3-8 14:59:14
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 开放portal权限,允许未登录的用户查看部分信息，重构了401.5 登陆后重新跳转回页面


### modify files
> interceptors/smartNotFound.js  
> routers/index.js  
> template/login.pug  


1.0.8 / 2017-3-8 17:11:49
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 全新首页绘制


### modify files
> routers/portal.js  
> staticFiles/css/portal/rd/home.css  
> template/home.pug  


1.0.8 / 2017-3-8 18:49:17
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 首页完成


### modify files
> staticFiles/css/portal/rd/platform.css  
> template/home.pug  


1.0.8 / 2017-3-8 19:30:52
==================
commit by afterloe (lm6289511@gmail.com)

  * master: home 微调


### modify files
> template/home.pug  

