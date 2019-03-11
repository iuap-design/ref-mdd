import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import { Provider, create, connect } from 'mini-store';
import { getMeta } from './utils';
import RenderEngine from './render-engine';

var MTLComponent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MTLComponent, _Component);

  function MTLComponent(props) {
    var _this2;

    _this2 = _Component.call(this, props) || this;
    _this2.meta = {};

    _this2.handleDynamicView = function (url) {
      if (url) _this2.getMetaDataByCustomURL(url); // 该逻辑暂时无用，用于考虑后续的兼容性。
      else _this2.getMetaDataByBrowserURL();
    };

    _this2.getMetaDataByBrowserURL =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var pathnameArr, _billtype, _billno, _ref2, data;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pathnameArr = window.location.pathname.split('/');

              if (pathnameArr[1] == 'meta') {
                _billtype = pathnameArr[2];
                _billno = pathnameArr[3];
              }

              _context.next = 4;
              return getMeta("/meta?billtype=" + billtype + "&billno=" + billno);

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

    _this2.getMetaDataByCustomURL =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(url) {
        var _ref4, data, isNeedRender;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return getMeta(url);

              case 2:
                _ref4 = _context2.sent;
                data = _ref4.data;
                isNeedRender = _this2.state.isNeedRender;

                if (!(data.code == 200)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 8;
                return _this2.isRefer(data.data);

              case 8:
                _this2.setState({
                  isNeedRender: !isNeedRender
                });

              case 9:
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

    _this2.isRefer = function (data) {
      if (data.refEntity) {
        var refEntity = data.refEntity,
            gridMeta = data.gridMeta;
        _this2.meta = {
          viewmodel: gridMeta.viewmodel,
          viewApplication: gridMeta.viewApplication,
          refEntity: refEntity
        };
      } else {
        var viewmodel = data.viewmodel,
            viewApplication = data.viewApplication;
        _this2.meta = {
          viewmodel: viewmodel,
          viewApplication: viewApplication,
          refEntity: {}
        };
      }
    };

    _this2.state = {
      isNeedRender: false
    };
    _this2.store = create({
      count: 0
    });
    return _this2;
  }

  var _proto = MTLComponent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var url = this.props.url || '';
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
    var _this = this;

    return React.createElement(Provider, {
      store: this.store
    }, React.createElement(RenderEngine, {
      meta: _this.meta
    }));
  };

  return MTLComponent;
}(Component);

export default MTLComponent;