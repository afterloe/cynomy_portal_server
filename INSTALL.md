INSTALL.md
###
> MIT Licensed  
> author: afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> mail:   
> webSite:   

Cynomy Portal Server 安装说明
===

# tar包安装

1. 解压tar包
```bash
$ tar -xzvf portal-server.tar.gz
```

2. 配置静态文件
```bash
$ cd portal-server
$ mv staticFiles/js Nginx-file-path/js
$ mv staticFiles/css Nginx-file-path/css
$ mv staticFiles/images Nginx-file-path/images
```

3. 测试获取静态文件
```bash
$ curl href of Nginx-file-path/js/portal/rem.js
```

4. 配置portal
```bash
$ cd portal-server
$ vim config/index.js
```
5. 启动portal
```bash
$ cd portal-server
$ make install
$ mkdir log
$ make start
```

# 源码编译

1. 拉取代码
```bash
$ git clone gitclone https://github.com/afterloe/cynomy_portal_server.git
```

2. 安装编译依赖包
```bash
$ cd cynomy_portal_server
$ npm install
```

3. 编译代码
```bash
$ cd cynomy_portal_server
$ make build
```
4. 获取编译之后的代码后接着 tar包安装教程 第二步继续
