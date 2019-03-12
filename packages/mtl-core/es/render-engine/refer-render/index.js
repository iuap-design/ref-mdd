"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _miniStore = require("mini-store");

var _MTLButton = _interopRequireDefault(require("../../components/MTLButton"));

var _RefInput = _interopRequireDefault(require("../../components/RefControl/RefInput"));

var _dec, _class;

var RefRender = (_dec = (0, _miniStore.connect)(function (state) {
  return {
    count: state.count
  };
}), _dec(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(RefRender, _Component);

  function RefRender() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RefRender.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        refEntity = _this$props.refEntity,
        viewApplication = _this$props.viewApplication,
        viewmodel = _this$props.viewmodel;
    return _react.default.createElement(_RefInput.default, {
      meta: {
        refEntity: refEntity,
        viewApplication: viewApplication,
        viewmodel: viewmodel
      }
    });
  };

  return RefRender;
}(_react.Component)) || _class);
var _default = RefRender;
exports.default = _default;