import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class, _temp;

/**
 * 处理参照组件渲染
 */
import React, { Component } from 'react';
import { connect } from 'mini-store';
import TableRender from '../common/TableRender';
import TreeRender from '../common/TreeRender';
var RefRender = (_dec = connect(), _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RefRender, _Component);

  function RefRender() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.renderComp = function () {
      var store = _this.props.store;
      var refEntity = store.getState().meta.refEntity;
      console.log('refEntity.cTpltype=======', refEntity.cTpltype); // 判断 refEntity 需要的参照模板类型

      switch (refEntity.cTpltype) {
        case 'Table':
          // 简单表格
          return React.createElement(TableRender, null);

        case 'Tree':
          return React.createElement(TreeRender, null);

        default:
          return React.createElement("div", null, "\u53C2\u7167\u6E32\u67D3\u7C7B\u578B\u9519\u8BEF");
      }
    };

    return _this;
  }

  var _proto = RefRender.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, this.renderComp());
  };

  return RefRender;
}(Component), _temp)) || _class);
export default RefRender;