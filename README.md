# mtl-web 基于多端协议的模型驱动开发框架


> 基于多端协议的模型驱动开发，简称UCF-MDD，即通过UI元数据来描述页面UI的呈现效果，通过数据模型来描述页面业务交互逻辑及业务数据。一个多端协议接口将以上信息通过规范化的接口送达到前端（多端），端上再通过一套渲染引擎SDK将UI元数据描述渲染成我们需要的页面（其中肯定需要结合我们标准的基础组件和业务组件），并且，和渲染引擎一起配合的是一套对模型数据操作的SDK，能够提供给开发者达到对数据扩展操作的功能。

## mtl-web packages 

- `mtl-components`：元数据中存放的组件（`container`类、`controls`类），如果`tinper-bee`和`tinper-acs`已有则复用，没有则在这里添加维护
-  `mtl-core`：`datamodel` 数据模型层封装、`render-engine` 基于`UI`元数据的解析渲染、公共工具方法等。

## [验证场景及需求描述](./docs/整体需求描述.md)
 
## 顶层设计：开发者视角，最终使用方式推演框架的设计（以终为始）

1、package 方式使用：

```

import { MTLComponent } from 'mtl-core';

// 创建一个模型驱动的组件，MTLCore wrapper 高阶
class LogicComponent extends MTLComponent {
    constructor(){
        this.init(url);
    }
}

// 大组件概念：模板，我们掌控全局
ReactDOM.render(<LogicComponent />, root)

// 小组件概念：纯组件，被引用
<Form>
    <Input />
    <LogicComponent />
    <Button>提交</Button>
</Form>

```

2、cjs 格式的CDN文件方式使用：

- 全局加载文件：`<script type="text/javascript" src="https://design.yonyoucloud.com/static/mtl-core/0.0.1/js/mtl-core.js"></script>`

- 初始化：`window.MTLCore.init(options)`
- 逻辑调用。



## 基于 lerna 的开发和调试

> 基于lerna分包后的开发痛点：如果现在在开发module-2, 但是发现是module-1的bug, 把module-1的bug修改了, 需要发布一下到npm, 然后module-2再更新module-1的依赖。执行`lerna add package1 –-scope=package2`命令后，你本地的package1会依赖于本地的package2，而不用担心package2没发布或者已发布的版本是过时的。

**解决方案：**

```
# 到项目根目录执行以下命令
$ npm run link
```

然后到package/mtl-core中执行调试监听

```
$ npm run dev
```

最后到package/mtl-example中启动示例查看调试效果：

```
$ npm start
```
