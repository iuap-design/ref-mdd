(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.MTLCore = factory(global.React));
}(this, function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var MTLCore =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(MTLCore, _Component);

    function MTLCore(props) {
      return _Component.call(this, props) || this;
    }

    var _proto = MTLCore.prototype;

    _proto.init = function init() {};

    _proto.render = function render() {
      // this.props.init()
      return React__default.createElement("div", null);
    };

    return MTLCore;
  }(React.Component);

  //     init, 
  //     create 
  // };

  return MTLCore;

}));
