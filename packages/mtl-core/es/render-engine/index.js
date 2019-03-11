import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class, _temp;

import React, { Component } from 'react';
import { connect } from 'mini-store';
import RefRender from './refer-render';
import UITemplateRender from './uitemplate-render'; // // todo具体的有哪些页面（登录、注册、错误页面），以及通用页面里面的布局有哪些具体参数需要讨论定下
// // todo 组件对应的Model是否需要，只是有ministore是否可以完成任务
// // todo 样式命名是否需要统一，加个** 前缀之类的，感觉好像不需要
// // todo json的数据怎么传过来
// // todo 更改mtl-core如何动态刷新

var RenderEngine = (_dec = connect(), _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RenderEngine, _Component);

  function RenderEngine(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.renderComp = function () {
      var _this$props$meta = _this.props.meta,
          refEntity = _this$props$meta.refEntity,
          viewApplication = _this$props$meta.viewApplication,
          viewmodel = _this$props$meta.viewmodel; // 逻辑说明：
      // 1、如果有 refEntity，则根据多端协议渲染出不同的参照组件
      // 2、如果无 refEntity，则该协议描述的为普通的UI模板，按正常流程进行渲染

      if (Object.keys(refEntity).length) {
        return React.createElement(RefRender, {
          refEntity: refEntity,
          viewApplication: viewApplication,
          viewmodel: viewmodel
        });
      } else {
        return React.createElement(UITemplateRender, {
          viewApplication: viewApplication,
          viewmodel: viewmodel
        });
      }
    };

    return _this;
  }

  var _proto = RenderEngine.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, this.renderComp());
  };

  return RenderEngine;
}(Component), _temp)) || _class);
export default RenderEngine;