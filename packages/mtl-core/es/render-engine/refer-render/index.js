import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class;

import React, { Component } from 'react';
import { connect } from 'mini-store';
import MTLButton from '../../components/MTLButton';
import RefInput from '../../components/RefControl/RefInput';
var RefRender = (_dec = connect(function (state) {
  return {
    count: state.count
  };
}), _dec(_class =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RefRender, _Component);

  function RefRender() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RefRender.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        refEntity = _this$props.refEntity,
        viewApplication = _this$props.viewApplication,
        viewmodel = _this$props.viewmodel;
    return React.createElement(RefInput, {
      meta: {
        refEntity: refEntity,
        viewApplication: viewApplication,
        viewmodel: viewmodel
      }
    });
  };

  return RefRender;
}(Component)) || _class);
export default RefRender;