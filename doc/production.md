产出流程
###
> MIT Licensed  
> author: afterloe  
> mail: afterloeliu@jwis.cn  
> webSite: https://github.com/afterloe  

产出流程
===

## 客户端准备流程
执行客户端脚本，脚本大致流程如下
* 生成产出的tar包
* 修改tar包权限
* 开启webSocket连接
> 第一次握手。 http连接进行登陆获取到websocket的连接端口和许可信息  
> 第二次握手。 使用许可信息开启websocket连接。  
> 第三次握手。 许可通过后开始相互访问  

* 通过webSocket发送指令
> 发送对应节点和流程的产出信息来 获取产出许可
> 发送产出的tar包和产出许可
> 等待构建结果
> 如果构建失败，依据反馈信息决定是否重新构建

## 产出tar包结构
```json
{
  ".portal": "tar包配置信息",
  "production": "文件夹，放置产出内容"
}
```

## .portal 文件结构
```json
{
  "production": [{
    "name": "文件名",
    "type": "文件类型",
    "path": "相对路径",
    "version": "版本",
    "author": {
      "name": "作者名字",
      "mail": "作者邮箱"
    }
  },{
    "name": "文件名",
    "type": "文件类型",
    "path": "相对路径",
    "version": "版本",
    "author": {
      "name": "作者名字",
      "mail": "作者邮箱"
    }
  }]
}
```
