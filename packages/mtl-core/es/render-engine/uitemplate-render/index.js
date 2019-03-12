"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var UITemplateRender =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(UITemplateRender, _Component);

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
    renturn(_react.default.createElement("div", null, "UITemplateRender"));
  };

  return UITemplateRender;
}(_react.Component);

exports.default = UITemplateRender;