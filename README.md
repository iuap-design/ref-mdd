# ref-mdd 基于多端协议的模型驱动开发框架

基于多端协议的模型驱动开发方式，简称为 `UCF-MDD`，即通过`UI`元数据（`viewapplication`）来描述页面UI的布局效果，通过数据模型（`viewmodel`）来描述页面交互逻辑及数据模型。标准化的多端协议接口将以上信息通送达到前端（多端），端上再通过一套渲染引擎SDK通过协议解析并与标准组件绑定后实现`UI`渲染，并提供给开发者一定的`UI`扩展操作和数据扩展操作的能力。

## PACKAGES 

- `mtl-core`：`datamodel` 数据模型层封装、`render-engine` 基于`UI`元数据的解析渲染、公共工具方法等。
- `mtl-components`：元数据中存放的组件（`container`类、`controls`类），如果`tinper-bee`和`tinper-acs`已有则复用，没有则在这里添加维护
- `mtl-example`：`ref-mdd` 的示例工程。

[验证场景及需求描述](./docs/整体需求描述.md)

## 如何使用


### `Package` 组件包方式

```
import { MTLComponent } from 'mtl-core';

const LogicComponent = () => (
    <div className="home-wrap">
        <MTLComponent url='url' />
    </div>
);

// 大组件：UI模板
ReactDOM.render(<LogicComponent />, root)

// 小组件：纯组件，被引用
<Form>
    <Input />
    <LogicComponent />
    <Button>提交</Button>
</Form>

```

### `UMD` 规范的通用 `CDN` 文件

- 全局加载文件：`<script type="text/javascript" src="https://design.yonyoucloud.com/static/mtl-core/0.0.1/js/mtl-core.js"></script>`

- 初始化：`window.MTLCore.initComponent(options)`

### API 



## 参与开发

### 基于 lerna 的开发和调试

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
