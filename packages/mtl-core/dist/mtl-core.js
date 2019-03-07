(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.MTLCore = factory(global.React));
}(this, function (react) { 'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function MTLComponent(opt) {
    this.viewapplication = opt.viewapplication;
    this.viewmodel = opt.viewmodel;
    return function () {
      return (
        /*#__PURE__*/
        function (_Component) {
          _inheritsLoose(_class, _Component);

          function _class() {
            return _Component.apply(this, arguments) || this;
          }

          var _proto = _class.prototype;

          _proto.render = function render() {
            return React.createElement("div", null, "hellow");
          };

        }(react.Component)
      );
    };

}));
