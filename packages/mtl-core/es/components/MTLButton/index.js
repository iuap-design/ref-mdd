import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import { Button } from 'tinper-bee';

var MTLButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MTLButton, _Component);

  function MTLButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MTLButton.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, React.createElement(Button, {
      colors: "success"
    }, "\u6309\u94AE"));
  };

  return MTLButton;
}(Component);

export default MTLButton;