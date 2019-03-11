import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';

var MTLInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MTLInput, _Component);

  function MTLInput() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MTLInput.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, React.createElement(FormControl, null));
  };

  return MTLInput;
}(Component);

export default MTLInput;