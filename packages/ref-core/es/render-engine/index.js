import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class, _temp;

import React, { Component } from 'react';
import { connect } from 'mini-store';
import RefRender from './container/ReferRender';
import UITemplateRender from './container/TemplateRender';
var RenderEngine = (_dec = connect(), _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RenderEngine, _Component);

  function RenderEngine(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.renderComp = function () {
      // 拿到 store 获得指定的元数据
      var store = _this.props.store;
      var refEntity = store.getState().meta.refEntity;
      console.log('render-engine store : ', store.getState()); // 逻辑说明：
      // 1、如果有 refEntity，则根据多端协议渲染出不同的参照组件
      // 2、如果无 refEntity，则该协议描述的为普通的UI模板，按正常流程进行渲染

      if (Object.keys(refEntity).length) {
        return React.createElement(RefRender, null);
      } else {
        return React.createElement(UITemplateRender, null);
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