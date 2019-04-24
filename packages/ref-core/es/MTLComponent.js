import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import { Provider, connect, create } from 'mini-store';
import { getMeta } from './utils';
import RenderEngine from './render-engine';
import store from './datamodel/store';

var MTLComponent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MTLComponent, _Component);

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

    _this.getMetaDataByCustomURL =
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
            _data$gridMeta = data.gridMeta,
            gridMeta = _data$gridMeta === void 0 ? {} : _data$gridMeta;
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

      _this.setState({
        isLoading: false
      });
    };

    _this.state = {
      isNeedRender: false,
      isLoading: true
    };
    return _this;
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
    var isLoading = this.state.isLoading;
    var _this$props = this.props,
        form = _this$props.form,
        dataUrl = _this$props.dataUrl;

    if (isLoading) {
      return React.createElement("p", null, "\u6570\u636E\u8BF7\u6C42\u4E2D...");
    } else {
      return React.createElement(Provider, {
        store: store({
          meta: this.meta,
          form: form,
          dataUrl: dataUrl
        })
      }, React.createElement(RenderEngine, null));
    }
  };

  return MTLComponent;
}(Component);

export default MTLComponent;