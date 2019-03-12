"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _miniStore = require("mini-store");

var _Button = _interopRequireDefault(require("../Button"));

var Layout =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Layout, _Component);

  function Layout(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.store = (0, _miniStore.create)({
      count: 3
    });
    return _this;
  }

  var _proto = Layout.prototype;

  _proto.render = function render() {
    return _react.default.createElement(_miniStore.Provider, {
      store: this.store
    }, _react.default.createElement("div", null, _react.default.createElement(_Button.default, null)));
  };

  return Layout;
}(_react.Component);

var _default = Layout;
exports.default = _default;