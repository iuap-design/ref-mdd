"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _miniStore = require("mini-store");

var _utils = require("./utils");

var _renderEngine = _interopRequireDefault(require("./render-engine"));

var MTLComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(MTLComponent, _Component);

  function MTLComponent(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.meta = {};

    _this.handleDynamicView = function (url) {
      if (url) _this.getMetaDataByCustomURL(url); // 该逻辑暂时无用，用于考虑后续的兼容性。
      else _this.getMetaDataByBrowserURL();
    };

    _this.getMetaDataByBrowserURL =
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var pathnameArr, _billtype, _billno, _ref2, data;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pathnameArr = window.location.pathname.split('/');

              if (pathnameArr[1] == 'meta') {
                _billtype = pathnameArr[2];
                _billno = pathnameArr[3];
              }

              _context.next = 4;
              return (0, _utils.getMeta)("/meta?billtype=" + billtype + "&billno=" + billno);

            case 4:
              _ref2 = _context.sent;
              data = _ref2.data;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.getMetaDataByCustomURL =
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(url) {
        var _ref4, data, isNeedRender;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _utils.getMeta)(url);

              case 2:
                _ref4 = _context2.sent;
                data = _ref4.data;
                isNeedRender = _this.state.isNeedRender;

                if (data.code == 200) {
                  _this.isRefer(data.data);

                  _this.setState({
                    isNeedRender: !isNeedRender
                  });
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.isRefer = function (data) {
      if (data.refEntity) {
        var refEntity = data.refEntity,
            gridMeta = data.gridMeta;
        _this.meta = {
          viewmodel: gridMeta.viewmodel,
          viewApplication: gridMeta.viewApplication,
          refEntity: refEntity
        };
      } else {
        var viewmodel = data.viewmodel,
            viewApplication = data.viewApplication;
        _this.meta = {
          viewmodel: viewmodel,
          viewApplication: viewApplication,
          refEntity: {}
        };
      }
    };

    _this.state = {
      isNeedRender: false,
      isLoading: false
    };
    _this.store = (0, _miniStore.create)({
      count: 0
    });
    return _this;
  }

  var _proto = MTLComponent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var url = this.props.url || '';
    this.setState({
      isLoading: true
    });
    this.handleDynamicView(url);
  }
  /**
   * 处理数据协议请求：
   * 1、如果初始化SDK的时候主动传了数据协议的URL进来，则进行下一步的操作；
   * 2、如果初始化的时候没有传入URL，而是根据访问URL的规则拼接动态请求来获取数据。
   * 浏览器URL示例："/meta/:billtype/:billno"
   */
  ;

  _proto.render = function render() {
    var isLoading = this.state.isLoading;

    if (isLoading) {
      return _react.default.createElement("p", null, "isLoading...");
    } else {
      return _react.default.createElement(_miniStore.Provider, {
        store: this.store
      }, _react.default.createElement(_renderEngine.default, {
        meta: this.meta
      }));
    }
  };

  return MTLComponent;
}(_react.Component);

var _default = MTLComponent;
exports.default = _default;