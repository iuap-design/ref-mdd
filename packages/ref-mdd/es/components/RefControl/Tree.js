import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import RefTreeBaseUI from 'ref-tree/lib/index';
import 'ref-tree/lib/index.css';
import { refValParse } from '../../utils';
import request from '../../utils/request';

var noop = function noop() {};

var getTreeList = function getTreeList(url, param, content, jsonp) {
  if (content === void 0) {
    content = "";
  }

  if (jsonp === void 0) {
    jsonp = false;
  }

  return request(url, {
    method: 'POST',
    data: param
  });
}; // data:this.treeData,树的所有节点，curKey:正在操作的节点的key值，
// child:1.request请求得到的该key下的子节点，或者缓存中该key下的子节点


var clearChild = function clearChild(data, curKey, child) {
  data.map(function (item) {
    if (curKey == item.id) {
      item.children = child;
    } else if (item.children) {
      clearChild(item.children, curKey, child);
    } else {}
  });
  return data;
};

var propTypes = {
  checkedArray: PropTypes.array,
  //  指定已选择数据id
  param: PropTypes.object,
  lazyModal: PropTypes.bool,
  lazyParam: PropTypes.array,
  // 20190127懒加载需要多传参数，暂时不对外暴露
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  value: PropTypes.string,
  matchUrl: PropTypes.string,
  jsonp: PropTypes.object,
  headers: PropTypes.object,
  onMatchInitValue: PropTypes.func,
  //匹配已选中值的回调
  refModelUrl: PropTypes.object,
  onAfterAjax: PropTypes.func //请求完数据的回调，暂不需要

};
var defaultProps = {
  checkStrictly: false,
  checkedArray: [],
  //  指定已选择数据id
  lazyModal: false,
  lazyParam: [],
  // 20190127懒加载需要多传参数，暂时不对外暴露
  param: {
    refCode: ''
  },
  onCancel: noop,
  onSave: noop,
  value: ''
};

var Tree =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tree, _Component);

  function Tree(props) {
    var _this$state;

    var _this;

    _this = _Component.call(this, props) || this;

    _this.initComponent = function () {
      var _this$props = _this.props,
          matchUrl = _this$props.matchUrl,
          param = _this$props.param,
          value = _this$props.value,
          jsonp = _this$props.jsonp,
          headers = _this$props.headers,
          checkedArray = _this$props.checkedArray,
          onMatchInitValue = _this$props.onMatchInitValue,
          valueField = _this$props.valueField,
          displayField = _this$props.displayField;

      _this.getRefTreeData(); //当有已选值，不做校验，即二次打开弹出层不做校验


      var valueMap = refValParse(value, valueField, displayField);
      if (checkedArray.length != 0 || !valueMap[valueField]) return;

      if (matchUrl) {
        request(matchUrl, {
          method: 'post',
          data: _extends({}, param, {
            refCode: param.refCode,
            pk_val: valueMap[valueField].split(',') || ''
          })
        }).then(function (response) {
          var _ref = response || {},
              _ref$data = _ref.data,
              data = _ref$data === void 0 ? [] : _ref$data;

          if (Object.prototype.toString.call(onMatchInitValue) === '[object Function]') {
            onMatchInitValue(data);
          }

          _this.setState({
            checkedArray: data,
            showLoading: false,
            checkedKeys: data.map(function (item) {
              return item[valueField];
            })
          });
        }).catch(function () {
          _this.setState({
            checkedArray: [],
            showLoading: false,
            checkedKeys: []
          });
        });
      } else {
        //当时不使用 matchUrl 做校验时，直接使用默认数护具标记选项，但数据完整性会变弱。
        _this.setState({
          checkedArray: [valueMap],
          selectedArray: [valueMap],
          showLoading: false,
          checkedKeys: valueMap[valueField].split(',')
        });
      }
    };

    _this.onLoadData = function (treeNode) {
      return new Promise(function (resolve) {
        _this.getRefTreeloadData(treeNode.props.eventKey, treeNode.props.attr);

        resolve();
      });
    };

    var _checkedArray = props.checkedArray,
        _valueField = props.valueField;
    _this.state = (_this$state = {
      showLoading: false,
      selectedArray: _checkedArray || [],
      //  记录保存的选择项，这个值已于checkedKeys合并
      checkedKeys: _checkedArray.map(function (item) {
        return item[_valueField];
      }),
      expandedKeys: [],
      onSaveCheckItems: [],
      isAfterAjax: false
    }, _this$state["showLoading"] = false, _this$state);
    _this.treeData = [];
    _this.treeDataCache = {};
    return _this;
  }

  var _proto = Tree.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var strictMode = nextProps.strictMode,
        checkedArray = nextProps.checkedArray,
        valueField = nextProps.valueField; //严格模式下每次打开必须重置数据

    if (nextProps.showModal && !this.props.showModal) {
      //正在打开弹窗
      if (strictMode || !this.treeData.length) {
        //开启严格模式 
        this.setState({
          showLoading: true
        }, function () {
          _this2.initComponent();
        });
      } //20190124因為不再走constructor，导致checkedKeys和selectedArray不一致


      if (checkedArray.length > 0) {
        this.setState({
          selectedArray: checkedArray || [],
          //  记录保存的选择项
          checkedKeys: checkedArray.map(function (item) {
            return item[valueField];
          })
        });
      }
    }
  };

  //   获取树组件数据
  _proto.getRefTreeData = function getRefTreeData(value) {
    var _this3 = this;

    var _this$props2 = this.props,
        param = _this$props2.param,
        refModelUrl = _this$props2.refModelUrl,
        lazyModal = _this$props2.lazyModal,
        onAfterAjax = _this$props2.onAfterAjax,
        jsonp = _this$props2.jsonp;
    var URL = refModelUrl.treeUrl;
    param = Object.assign(param, {
      treeNode: "",
      treeloadData: lazyModal
    });
    getTreeList(URL, param, value, jsonp).then(function (res) {
      if (onAfterAjax && !_this3.state.isAfterAjax) {
        onAfterAjax(res);

        _this3.setState({
          isAfterAjax: true
        });
      }

      var _res$data$data = res.data.data,
          data = _res$data$data === void 0 ? [] : _res$data$data;

      if (data && data.length > 0) {
        if (lazyModal) {
          data = data.map(function (item) {
            delete item.children;
            return item;
          });
        }

        _this3.treeData = data;

        _this3.setState({
          showLoading: false
        });

        if (data[0].id) {
          _this3.setState({
            expandedKeys: [data[0].id]
          });
        }
      } else {
        _this3.treeData = [];

        _this3.setState({
          showLoading: false
        });
      }
    }).catch(function () {
      _this3.treeData = [];

      _this3.setState({
        showLoading: false
      });
    });
  };

  /**
   * 懒加载
   * @param {选择的节点} treeNode 
   */
  _proto.getRefTreeloadData = function getRefTreeloadData(treeNode, treeNodeAttr) {
    var _this4 = this;

    var _this$props3 = this.props,
        param = _this$props3.param,
        refModelUrl = _this$props3.refModelUrl,
        lazyModal = _this$props3.lazyModal,
        tabData = _this$props3.tabData,
        jsonp = _this$props3.jsonp,
        lazyParam = _this$props3.lazyParam;
    var URL = refModelUrl.treeUrl;

    if (this.treeDataCache[treeNode]) {
      this.treeData = clearChild(this.treeData, treeNode, this.treeDataCache[treeNode]);
      this.setState({
        showLoading: false
      });
      return;
    } //lazyModal 懒加载模式,懒加载的参数传递与其他的不一样
    // 两种情况，单树只需要一个参数，组合树需要多个参数


    if (!lazyParam.length) {
      param = Object.assign(param, {
        treeNode: treeNode,
        treeloadData: lazyModal
      });
    } else {
      var treeNodeVal = {};
      treeNodeVal['refpk'] = treeNode;
      lazyParam.forEach(function (key) {
        treeNodeVal[key] = treeNodeAttr[key];
      });
      param = Object.assign(param, {
        treeNode: JSON.stringify(treeNodeVal),
        treeloadData: lazyModal
      });
    }

    this.setState({
      showLoading: true
    });
    getTreeList(URL, param, "", jsonp).then(function (res) {
      if (res) {
        var _res$data = res.data,
            data = _res$data === void 0 ? [] : _res$data;
        _this4.treeDataCache[treeNode] = data;

        if (data.length !== 0) {
          _this4.treeData = clearChild(_this4.treeData, treeNode, data);
        }
      }

      _this4.setState({
        showLoading: false
      });
    }).catch(function () {
      _this4.setState({
        showLoading: false
      });
    });
  };

  _proto.render = function render() {
    var _this$state2 = this.state,
        showLoading = _this$state2.showLoading,
        selectedArray = _this$state2.selectedArray,
        checkedKeys = _this$state2.checkedKeys,
        expandedKeys = _this$state2.expandedKeys,
        onSaveCheckItems = _this$state2.onSaveCheckItems;
    var childrenProps = Object.assign({}, this.props, {
      treeData: this.treeData,
      showLoading: showLoading,
      selectedArray: selectedArray,
      //  记录保存的选择项
      checkedKeys: checkedKeys,
      expandedKeys: expandedKeys,
      onSaveCheckItems: onSaveCheckItems
    });
    return React.createElement(RefTreeBaseUI, childrenProps);
  };

  return Tree;
}(Component);

Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;
export default Tree;