"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _tinperBee = require("tinper-bee");

var MTLButton =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(MTLButton, _Component);

  function MTLButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MTLButton.prototype;

  _proto.render = function render() {
    return _react.default.createElement("div", null, _react.default.createElement(_tinperBee.Button, {
      colors: "success"
    }, "\u6309\u94AE"));
  };

  return MTLButton;
}(_react.Component);

var _default = MTLButton;
exports.default = _default;