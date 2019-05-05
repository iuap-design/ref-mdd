import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';

var UITemplateRender =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(UITemplateRender, _Component);

  function UITemplateRender(props) {
    return _Component.call(this, props) || this;
  }

  var _proto = UITemplateRender.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        viewApplication = _this$props.viewApplication,
        viewmodel = _this$props.viewmodel;
    console.log(viewApplication);
    console.log(viewmodel);
    return React.createElement("div", null, "UITemplateRender");
  };

  return UITemplateRender;
}(Component);

export { UITemplateRender as default };