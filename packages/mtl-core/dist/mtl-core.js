(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.MTLCore = factory(global.React));
}(this, function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var axios = require('axios');

  var MTLComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(MTLComponent, _Component);

    function MTLComponent(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "isRefer", function (data) {
        if (data.refEntity) {
          var _res$data = res.data,
              refEntity = _res$data.refEntity,
              gridMeta = _res$data.gridMeta;

          _this.setState({
            viewmodel: gridMeta.viewmodel,
            viewapplication: gridMeta.viewapplication,
            refEntity: refEntity
          });
        } else {
          var _res$data2 = res.data,
              viewmodel = _res$data2.viewmodel,
              viewapplication = _res$data2.viewapplication;

          _this.setState({
            viewmodel: viewmodel,
            viewapplication: viewapplication
          });
        }
      });

      _this.init(props);

      _this.state = {
        url: '',
        viewmodel: {},
        viewapplication: {},
        refEntity: {}
      };
      return _this;
    }

    var _proto = MTLComponent.prototype;

    _proto.init =
    /*#__PURE__*/
    function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(opt) {
        var url, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = opt.url || "";
                _context.next = 3;
                return axios.get(url);

              case 3:
                res = _context.sent;
                this.isRefer(res);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    _proto.render = function render() {
      return React__default.createElement("div", null, "hhh");
    };

    return MTLComponent;
  }(React.Component);

  var MTLCore = {
    MTLComponent: MTLComponent // MTLModel,
    // rollup 中的 output 配置 globals 

  };
  window.MTLCore = MTLCore;

  return MTLCore;

}));
