import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class, _temp;

/**
 * 树参照
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
import RefTree from '../../components/RefControl/Tree';
import 'ref-core/css/refcorewithinput.css';
import { connect } from 'mini-store';
var TreeRender = (_dec = connect(function (state) {
  return {
    form: state.form
  };
}), _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TreeRender, _Component);

  function TreeRender(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.onSave = function (item) {
      console.log('save', item);
    };

    _this.onCancel = function () {};

    return _this;
  }

  var _proto = TreeRender.prototype;

  _proto.render = function render() {
    var store = this.props.store;
    var refEntity = store.getState().meta.refEntity;
    var _refEntity$bMultiSel = refEntity.bMultiSel,
        bMultiSel = _refEntity$bMultiSel === void 0 ? false : _refEntity$bMultiSel,
        _refEntity$cCheckFlds = refEntity.cCheckFlds,
        cCheckFlds = _refEntity$cCheckFlds === void 0 ? '' : _refEntity$cCheckFlds,
        code = refEntity.code,
        name = refEntity.name; // const [valueField,displayField] =  cCheckFlds.split(',');

    var valueField = 'id';
    var _displayField = 'fullname';
    console.log(_displayField, valueField);
    var dataURL = store.getState().dataUrl;
    var _this$props$form = this.props.form,
        getFieldError = _this$props$form.getFieldError,
        getFieldProps = _this$props$form.getFieldProps; // const { cBillName, view } = viewApplication;
    // const queryParam = getQueryParam('grid',refEntity,viewApplication);
    // const refModelUrl = {
    //     tableBodyUrl:dataURL
    // }

    var option = {
      title: name,
      searchable: true,
      //默认搜索输入框，没有这个字段
      multiple: bMultiSel,
      //refEntity: bMultiSel
      param: {
        "refCode": code //refEntity: code

      },
      checkStrictly: true,
      //没有这个字段
      nodeDisplay: function nodeDisplay(record) {
        //树节点显示的名字
        return record[_displayField];
      },
      displayField: function displayField(record) {
        //输入框的名字
        return record[_displayField];
      },
      //显示内容的键
      valueField: valueField,
      //真实 value 的键
      refModelUrl: {
        treeUrl: dataURL
      },
      matchUrl: '',
      //查找已选中的数据的URL,没有这个字段
      filterUrl: '',
      //输入框搜索匹配的URL,没有这个字段
      lazyModal: false,
      //是否是懒加载树
      strictMode: true,
      //是否调用之前缓存的数据，为true则不重新请求
      lang: 'zh_CN',
      defaultExpandAll: false // className:'ref-walsin-modal'

    };
    return React.createElement(RefWithInput, _extends({}, option, getFieldProps('code1', {
      // initialValue: JSON.stringify({
      //     code: "org1",
      //     id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      //     name: "用友集团",
      //     refcode: "org1",
      //     refname: "用友集团",
      //     refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      // }),
      rules: [{
        message: '请输入请选择',
        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
      }]
    })), React.createElement(RefTree, null));
  };

  return TreeRender;
}(Component), _temp)) || _class);
export default TreeRender;