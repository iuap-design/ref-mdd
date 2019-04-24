# ref-mdd 基于统一协议的参照组件实现

## 关键特性

- 基于统一的参照描述协议实现可扩展的组件解析渲染
- 支持树型、表型参照，树表型、combobox 型待支持

## 如何使用

### 组件方式调用

```
import { MTLComponent } from 'ref-mdd';

const RefTableComponent = () => (
    <div className="home-wrap">
        <MTLComponent url={mtlUrl.tableMetaUrl} dataUrl={mtlUrl.tableDataUrl} />
    </div>
);

```

### API 形式调用



### `UMD` 规范的通用 `CDN` 文件

- 全局加载文件：`<script type="text/javascript" src="https://design.yonyoucloud.com/static/ref-mdd/0.0.1/js/ref-mdd.js"></script>`

- 初始化：`window.MTLCore.initComponent(options)`

## 组件接口说明
|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|url|参照中获取的meta信息的url|string||
|dataUrl|参照中获取的数据data信息的url|string||
## 整体流程

<img src="https://raw.githubusercontent.com/whizbz11/Img/master/ref-mdd/ref-mdd.png" height='500px' />
## 协议说明

```

{
  "code": 200,
  "message": "操作成功",
  "data": {
    "refEntity": {
      "id": 1000002,
      "code": "dept",
      "name": "部门",
      "description": "部门",
      "refType": "dept",
	    ...
    },
    "gridMeta": {
      "viewmodel": {
        "iBillId": 1001283066,
        "cBillName": "部门参照",
        "cBillNo": "deptref",
        "cBillType": "Archive",
        "cSubId": "AA",
        "bBatchOperate": true,
        "entities": [...]
        "actions": [...]
      },
      "viewApplication": {
        "billid": 1001283066,
        "cBillName": "部门参照",
        "cBillType": "Archive",
        "cBillNo": "deptref",
        "bAllowMultiTpl": false,
        "cSubId": "AA",
        "cCardKey": "dept",
        "view": { ... },
        "extscripturls": [...]
      }
    }
  }
}
```

## 参与开发

### 基于 lerna 的开发和调试

> 基于lerna分包后的开发痛点：如果现在在开发module-2, 但是发现是module-1的bug, 把module-1的bug修改了, 需要发布一下到npm, 然后module-2再更新module-1的依赖。执行`lerna add package1 –-scope=package2`命令后，你本地的package1会依赖于本地的package2，而不用担心package2没发布或者已发布的版本是过时的。

**解决方案：**

```
# 到项目根目录执行以下命令
$ npm run link
```

然后到package/ref-core中执行调试监听

```
$ npm run dev
```

最后到package/ref-example中启动示例查看调试效果：

```
$ npm start
```
