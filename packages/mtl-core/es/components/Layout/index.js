import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import { Provider, create, connect } from 'mini-store';
import MtlButton from '../Button';

var Layout =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Layout, _Component);

  function Layout(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.store = create({
      count: 3
    });
    return _this;
  }

  var _proto = Layout.prototype;

  _proto.render = function render() {
    return React.createElement(Provider, {
      store: this.store
    }, React.createElement("div", null, React.createElement(MtlButton, null)));
  };

  return Layout;
}(Component);

export default Layout;