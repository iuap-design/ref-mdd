import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class, _temp;

/**
 * 单表参照
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import { connect } from 'mini-store';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
import RefTable from '../../components/RefControl/Table';
import 'ref-core/lib/refs/refcorewithinput.css';
import 'ref-multiple-table/lib/index.css';
import { getQueryParam } from "./util";
var TableRender = (_dec = connect(function (state) {
  return {
    form: state.form
  };
}), _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TableRender, _Component);

  function TableRender(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.onSave = function (item) {
      console.log('save', item);
    };

    _this.onCancel = function () {};

    return _this;
  }

  var _proto = TableRender.prototype;

  _proto.render = function render() {
    var store = this.props.store;
    var _store$getState$meta = store.getState().meta,
        viewApplication = _store$getState$meta.viewApplication,
        refEntity = _store$getState$meta.refEntity;
    var dataURL = store.getState().dataUrl;
    var _this$props$form = this.props.form,
        getFieldError = _this$props$form.getFieldError,
        getFieldProps = _this$props$form.getFieldProps;
    var cBillName = viewApplication.cBillName,
        view = viewApplication.view;
    var valueField = "id";
    var displayField = "{name}";
    var queryParam = getQueryParam('grid', refEntity, viewApplication);
    var refModelUrl = {
      tableBodyUrl: dataURL
    };
    var props = {
      placeholder: cBillName,
      title: view.cTemplateTitle,
      backdrop: true,
      disabled: false,
      multiple: refEntity.bMultiSel,
      strictMode: true,
      miniSearch: true,
      displayField: displayField,
      valueField: valueField,
      queryParam: queryParam,
      refModelUrl: refModelUrl
    };
    return React.createElement(RefWithInput, _extends({}, props, {
      onSave: this.onSave,
      onCancel: this.onCancel
    }, getFieldProps(valueField, {
      // initialValue:'{\"refname\":\"高级-T3\",\"refpk\":\"level5\"}',
      rules: [{
        message: '请输入姓名',
        pattern: /[^{displayField:"",valueField:""}]/
      }]
    })), React.createElement(RefTable, null));
  };

  return TableRender;
}(Component), _temp)) || _class);
export default TableRender;