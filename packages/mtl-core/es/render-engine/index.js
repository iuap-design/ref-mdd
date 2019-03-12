"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _miniStore = require("mini-store");

var _referRender = _interopRequireDefault(require("./refer-render"));

var _uitemplateRender = _interopRequireDefault(require("./uitemplate-render"));

var _dec, _class, _temp;

var RenderEngine = (_dec = (0, _miniStore.connect)(), _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(RenderEngine, _Component);

  function RenderEngine(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.renderComp = function () {
      var _this$props$meta = _this.props.meta,
          _this$props$meta$refE = _this$props$meta.refEntity,
          refEntity = _this$props$meta$refE === void 0 ? {} : _this$props$meta$refE,
          _this$props$meta$view = _this$props$meta.viewApplication,
          viewApplication = _this$props$meta$view === void 0 ? {} : _this$props$meta$view,
          _this$props$meta$view2 = _this$props$meta.viewmodel,
          viewmodel = _this$props$meta$view2 === void 0 ? {} : _this$props$meta$view2;
      console.log(refEntity, viewApplication); // 逻辑说明：
      // 1、如果有 refEntity，则根据多端协议渲染出不同的参照组件
      // 2、如果无 refEntity，则该协议描述的为普通的UI模板，按正常流程进行渲染

      if (Object.keys(refEntity).length) {
        return _react.default.createElement(_referRender.default, {
          refEntity: refEntity,
          viewApplication: viewApplication,
          viewmodel: viewmodel
        });
      } else {
        return _react.default.createElement(_uitemplateRender.default, {
          viewApplication: viewApplication,
          viewmodel: viewmodel
        });
      }
    };

    return _this;
  }

  var _proto = RenderEngine.prototype;

  _proto.render = function render() {
    return _react.default.createElement("div", null, this.renderComp());
  };

  return RenderEngine;
}(_react.Component), _temp)) || _class);
var _default = RenderEngine;
exports.default = _default;