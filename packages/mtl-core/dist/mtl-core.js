(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.MTLCore = factory(global.React));
}(this, function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

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

  var MtlCore =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(MtlCore, _Component);

    function MtlCore(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "CoreInit", function (opt) {
        console.log('Init Core');
      });

      _this.state = {};
      return _this;
    }

    var _proto = MtlCore.prototype;

    _proto.render = function render() {
      return React__default.createElement("div", null, "Hello");
    };

    return MtlCore;
  }(React.Component);

  //     init, 
  //     create 
  // };

  return MtlCore;

}));
