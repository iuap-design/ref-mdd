"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _tinperBee = require("tinper-bee");

var RefInput =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(RefInput, _Component);

  function RefInput() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RefInput.prototype;

  _proto.render = function render() {
    console.log(this.props.meta); // 生成参照的元数据

    return _react.default.createElement("div", null, _react.default.createElement(_tinperBee.FormControl, {
      value: this.props.meta.refEntity.name
    }));
  };

  return RefInput;
}(_react.Component);

var _default = RefInput;
exports.default = _default;