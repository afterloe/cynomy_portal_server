数据库关系设计 v0.0.4
###
> MIT Licensed  
> author: afterloe  
> mail: afterloeliu@jwis.cn  
> webSite: https://github.com/afterloe  

关系设计
===
纵观设计图，可以发现所有的东西都是基于产品来进行扩展的。所有基础信息应该是产品，也就是所谓的产出。产出位于每一次迭代。而迭代又是基于软件研发流程来管控的。所以产出可以是代码，也可以是文档。

#### 产出(goods) 设计
```json
{
  "author": "产出人员",
  "name": "产出的文件名",
  "path": "下载地址",
  "time": "产出时间",
  "downCount": "下载次数",
  "version": "版本"
}
```
既然有了产出那么该工作流就能被管控起来，每个工作流都由工作节点来控制

#### 工作流节点模版 (work-flow node) 设计
```json
{
  "name": "节点名",
  "tags": "标签列表",
}
```

#### 工作流模版 (work-flow Template) 设计
```json
{
  "name": "工作流名字",
  "chainNodes": "工作流节点列表",
  "tags": "标签列表",
}
```

#### 工作流节点实例 (work-flow instance node) 设计
```json
{
  "workflow": "工作流实例",
  "stat": "not start、working、stopped、finish",
  "reason": "当前原因",
  "name": "节点名",
  "owner": "节点负责人",
  "beginTimestamp": "进入节点的时间",
  "uploadCount": "更新次数",
  "produceList": "产出列表"
}
```

#### 流程实例 (work-flow instance) 设计
```json
{
  "name": "实例名",
  "template": "流程模板",
  "members": "参与该工作流的人员列表",
  "status": "实例节点 (work-flow instance node)",
  "nodeList": "实例节点 (work-flow instance node) 组",
  "nextNode": "下一个节点",
  "previousNode": "上一个节点",
  "beginTimestamp": "工作流启动时间",
  "endTimestamp": "工作流结束时间"
}
```

其实原理是这样，当一个工作流跑起来之后，会经过各个活动(工作流节点)，由每个节点的负责人来确定该工作时候完成，完成之后推动工作流进入下一个节点。进入到下一个节点之前就会对完成的节点进行一次校验，检查产出列表。并展示产出信息。这样工作流结束之后可以从各个节点看到产出。所以要在工作流启动的时候就要指定好参加这次流程的人员，并指派好负责人。如果不想手动指派那么就需要使用角色标签来标识。

#### 标签 (target) 设计
```json
{
  "name": "标签名",
  "keyWord": "领域关键字，通过搜索来标识",
  "property": "贴上标签的文档具有哪些特殊属性",
  "domain": "访问域,可以查看哪些内容和哪些路径"
}
```

#### 用户 (user) 设计
```json
{
  "name": "用户名",
  "tags": "标签列表",
  "mail": "邮箱",
  "avatar": "头像",
  "introduction": "简介",
  "position": "职位",
  "phoneNum": "手机号",
  "isLogin": "是否登陆"
}
```
产品是很特殊的存在，产品就是工作流模板的实现，由他来推动一个个项目进度，而工作流最后的节点完成之后，就可以配置产品所包含的模块。而产品也是支持不同的平台而有不同的实现

#### 产品 (produce) 设计
```json
{
  "name": "产品名",
  "taget": "产品标签",
  "work-flow": "工作流实例",
  "platform": "支持平台",
  "modules": "包含模块",
  "synopsis": "简介",
  "main": "主要研发人员",
  "version": "产品版本"
}
```
权限方面，决定在标签上进行扩展，当用户没有标签的时候就代表是非法注入的或没有分配任何权限的，所以只能看到少量数据，或不能看到数据。所以在用户身上扩展标签来进行权限的管控，当一个用户拥有多个标签的时候就能看到对应的内容和访问对应的路径，也就拥有对应的权限，而产出内容也可以被打上标签，这样就能通过标签来规定用户查看的内容和管理，当搜索的时候标签也可以作为一个搜索的关键字。(灵感来源：market SpringMVC版)。
