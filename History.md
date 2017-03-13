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

1.0.9 / 2017-3-11 15:42:3
==================
commit by afterloe (lm6289511@gmail.com)

  * master: debug 修复上传提示


### modify files
> config/index.js  
> staticFiles/css/portal/rd/directory.css  
> staticFiles/css/portal/rd/platform.css  
> staticFiles/css/portal/rd/product.css  
> staticFiles/js/portal/src/rd/platform.js  
> template/platform.pug  

2017-3-11 更新公告  

更新时间  
————————————————  
2017-3-11 16:00 ～ 2017-3-11 17：00，预计维护时间为1小时，维护期间访问可能出现404或500异常，对您的使用产生不变深感抱歉。  

更新内容  
————————————————  
1）优化 登陆过程，去除了动态邮件验证码登陆功能，用户可使用固定密码登陆portal，如果遗忘了自己的登陆密码可用在http://rd.jwis.cn/portal/login 处点击忘记密码，系统会发送一个新的6位随机密码到邮箱，使用该密码就可以登陆系统。同时开启了自动登陆功能（需浏览器支持）  
2) 优化 登陆界面，v1.0.9的portal升级为公司级别的portal，由tru的logo统一切换成公司logo  
3）优化 首页优化，首页不再显示研发工作流信息，调整为显示portal系统中的公告，同时开放了首页的权限，用户不进行登陆也能够访问portal的首页，不过后续的操作仍需要登陆才行  
4）优化 首页建议反馈，首页的建议反馈不再跳到bbs论坛，而直接在页面上进行反馈。其他地方的建议反馈仍然跳转到bbs不做处理，将在下次更新时所有意见反馈将会统一在页面上进行处理    
5）优化 导航栏优化，导航栏按照入驻的部门进行显示，目前入驻的部门有售前技术部和自主交付部，后续的维护和升级中portal 将会打通入驻部门的项目信息，人员信息，届时首页将会再次优化显示信息，敬请期待  
6）优化 研发部链接，v1.0.9版本的portal将v1.0.8版本的首页移动到了研发部，作为研发部部门首页，保留所有功能，v1.0.8版的TRU产品和TRU平台两个链接放到了研发部首页的平台和产品下，点击对应的平台或产品目录就能够跳转到TRU产品页和TRU平台页  
7）优化 自主交付部链接，v1.0.9版本中正在与胡琦(Kiweenhu@jwis.cn)进行沟通，沟通完毕之后将会放上自主交付部的项目信息和页面，敬请期待  
8）优化 售前技术部链接，v1.0.9版本中沿用了http://almcloud.jwis.cn 中售前页面，我将会和方方(frank.fang@jwis.cn)进一步沟通，届时将统一页面展示方式并显示所有售前资料和参与人员信息，敬请期待  
9）优化 研发部工作流上传功能，添加了提示，当文件上传成功之后对应的上传条目会显示红色的成功标示
10）优化 研发部工作流详情，查看详情页按钮划过的时候会出现按钮放大的异常
11）新功能 添加系统公告，使用v1.0.9版本中自带的webTools可以向服务器首页发送公告，公告分为标题和内容，发送成功之后首页将会展示该条公告，所有登陆后的成员可以看到公告信息，未登陆的人员将会看到公告的标题和发布时间。目前系统公告处于调试阶段，仅支持纯文本，后续的跟新中将继续加强公告功能，敬请期待  
12）新功能 添加反馈页面，为了保证大家的反馈能够及时归档，首页的建议反馈不再跳转bbs，而在页面进行提交。首页公告模块下的热点讨论中将会看到所有提交的反馈信息，用户可以在对他人的反馈信息进行点赞，评论等操作。【产品要求该功能不上线，所以线上版本屏蔽了该功能，用户可在内网版本中体验该功能】  
13）新功能 讨论贴，在讨论贴上用户可以进行发帖和查看他人发帖，也可进行点赞和评论操作。【产品要求该功能不上线，所以线上版本屏蔽了该功能，用户可在内网版本中体验该功能】  
14）新功能 自定义首页，登陆的用户和未登陆的用户所看到的首页是不一样的，登陆之后的用户可以对首页进行定制，定制之后的首页和别人的是不同的，定制之后的首页右侧会出现关注列表，用户可以查看自己参与的所有项目，同时还有自己订阅的项目【产品要求该功能不上线，所以线上版本屏蔽了该功能，用户可在内网版本中体验该功能】  
15）新功能 系统通知，维护或有重大信息的时候，首页顶部将会弹出红色通知窗，进行通知展示，为期1小时，使用v1.0.9版本中自带的webTools可以向服务器首页发送通知  

策划面对面  
————————————————  
1)    
  问题：portal为什么发送不出邮件？  
  回答：portal使用的邮箱是tru.jwis.cn 是tru平台提供的邮件功能，该功能已上线3年，日发送邮件量较大，非公司的邮箱可能会把该发送者发送的邮件视为垃圾邮件进行处理，所有可以到垃圾箱查收。如果垃圾箱没有收到邮件可以给我(afterloeliu@jwis.cn)发送邮件，万分感谢  
2）    
  问题：portal支持ie吗？  
  回答：portal的开发人员没有使用windows平台进行开发，目前portal测试之后支持的浏览器有 firfox火狐浏览器，safari, google, edge。微软公司已经宣布放弃IE的开发,所以IE 11 之前的版本我们没有安排进行测试，而且360，百度浏览器的一类的使用ie内核的浏览器使用portal也是会出现问题的，为了更好的页面体验请使用google浏览器，或edge浏览器，或非ie内核的浏览器。关于ie的支持计划，将视项目组任务安排，请关注portal上的公告  
3）  
  问题：portal上传文件怎么那么慢？  
  回答：portal采用的是云端部署，文件系统为分布式文件系，上传文件之后会被同步到子节点上，上传文件需要点时间。而且上传文件取决于网络的带宽，云端服务器上行带宽最大为512kb/s ,也就是说上传1M的文件理论上最快需要2秒，如果客户端链接的网络带宽不足，那么上传速度会被进一步限制，以工勘大厦为例，工勘大厦采用的宽带上传速度为512kb，加上ap分发和客户端io损耗，测试出上传速度为106kb～210kb之间，所以请网页上传文件耐性等待，而且断点续传在前端的实现主要依赖着HTML5的新特性，所以一般来说在老旧的浏览器或ie上支持度是不高的。我们会在后续的版本中发出pc 移动客户端，用户可用客户端进行大文件的上传，前期大文件上传请联系我(afterloeliu@jwis.cn)  
4)  
  问题：portal部门链接会不会增多？  
  回答：portal由研发部升级为公司portal，后续的维护和升级将加强工作流系统和权限系统，也就是说未来portal会接入更多的部门，只要登入http://rd.jwis.cn 就能查看公司所有部门和文件信息，实现公司内部资料人员信息共享，方便了解所有部门的最新动态，想加入的我们portal系统的部门可以联系我(afterloeliu@jwis.cn)，目前售前技术部和自主研发部已经加入，请期待后续的维护和升级。  

1.0.9 / 2017-3-12 23:33:6
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 完善云端微调信息


### modify files
> staticFiles/css/portal/discussesInfo.css  
> template/directory.pug  


1.0.9 / 2017-3-13 10:42:1
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 关闭轮叫调度策略，采用默认抢占式服务


### modify files
> index.js  


1.0.9 / 2017-3-13 10:50:56
==================
commit by afterloe (lm6289511@gmail.com)

  * master: smartNotFound添加多维code


### modify files
> interceptors/smartNotFound.js  
> routers/ad-portal.js  
> routers/ps-portal.js  


1.0.9 / 2017-3-13 11:51:6
==================
commit by afterloe (lm6289511@gmail.com)

  * master: 改版工作开始


### modify files
> interceptors/smartNotFound.js  
> interceptors/template.js  
> template/workflowInfo.pug  

