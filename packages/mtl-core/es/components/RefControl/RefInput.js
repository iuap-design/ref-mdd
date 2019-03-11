import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';

var RefInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RefInput, _Component);

  function RefInput() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RefInput.prototype;

  _proto.render = function render() {
    console.log(this.props.meta); // 生成参照的元数据

    return React.createElement("div", null, React.createElement(FormControl, {
      value: this.props.meta.refEntity.name
    }));
  };

  return RefInput;
}(Component);

export default RefInput;