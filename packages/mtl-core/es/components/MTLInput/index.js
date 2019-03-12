"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _tinperBee = require("tinper-bee");

var MTLInput =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(MTLInput, _Component);

  function MTLInput() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MTLInput.prototype;

  _proto.render = function render() {
    return _react.default.createElement("div", null, _react.default.createElement(_tinperBee.FormControl, null));
  };

  return MTLInput;
}(_react.Component);

var _default = MTLInput;
exports.default = _default;