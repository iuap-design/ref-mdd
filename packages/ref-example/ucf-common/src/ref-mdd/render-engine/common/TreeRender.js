/**
 * 树参照
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FormControl, Form } from "tinper-bee";

import { RefTreeWithInput } from "ref-tree/lib/index";
// import RefTree from '../../components/RefControl/Tree';
// import 'ref-core/css/refcorewithinput.css';
import { refValParse,getQueryParam } from "../../utils";
import request from "../../utils/request";
import "ref-tree/lib/index.css";
import { connect } from "mini-store";
const noop = () => {
};
const getTreeList = (url, param, content = "", jsonp = false) =>{
  content.length && (param.likeValue = content); 
  return request(url, {
    method: "POST",
    data: param
  });
}
// data:this.treeData,树的所有节点，curKey:正在操作的节点的key值，
// child:1.request请求得到的该key下的子节点，或者缓存中该key下的子节点
const clearChild = (data, curKey, child) => {
  data.map(item => {
    if (curKey == item.id) {
      item.children = child;
    } else if (item.children) {
      clearChild(item.children, curKey, child);
    } else {
    }
  });
  return data;
};
const propTypes = {
  checkedArray: PropTypes.array, //  指定已选择数据id
  param: PropTypes.object,
  lazyModal: PropTypes.bool,
  lazyParam: PropTypes.array, // 20190127懒加载需要多传参数，暂时不对外暴露
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  value: PropTypes.string,
  matchUrl: PropTypes.string,
  jsonp: PropTypes.object,
  headers: PropTypes.object,
  onMatchInitValue: PropTypes.func, //匹配已选中值的回调
  onAfterAjax: PropTypes.func //请求完数据的回调，暂不需要
};
const defaultProps = {
  checkStrictly: false,
  checkedArray: [], //  指定已选择数据id
  lazyModal: false,
  lazyParam: [], // 20190127懒加载需要多传参数，暂时不对外暴露
  param: {
    refCode: ""
  },
  onCancel: noop,
  onSave: noop,
  value: ""
};
const dataType = "tree";
@connect(state => ({ form: state.form }))
class TreeRender extends Component {
  constructor(props) {
    super(props);
    
    let { store } = this.props;
    let { viewApplication, refEntity } = store.getState().meta;
    this.valueField = refEntity.cEntityKeyFld;//参照真实值
    this.displayField = refEntity.cEntityNameFld;//参照显示值
    this.treeBodyUrl =  '/uniform/'+(refEntity.svcKey?refEntity.svcKey+'/ref/getRefData': 'bill/ref/getRefData');//表体请求url
    this.param = getQueryParam(dataType, refEntity, viewApplication);//数据查询参数
    this.state = {
      selectedArray: [], //  记录保存的选择项，这个值已于checkedKeys合并
      checkedKeys:[],
      expandedKeys: [],
      onSaveCheckItems: [],
      isAfterAjax: false,
      showLoading: false
    };

    this.treeData = [];
    this.treeDataCache = {};
    this.checkedArray =[];
  }

  componentDidMount() {
    this.initComponent();
  }
  onSave = item => {
    console.log("save", item);
  };
  onCancel = () => {};
  filterUrlFunc = (value) =>{
        console.log(value);
   }
  initComponent = () => {
    let {
      matchUrl,
      param,
      value,
      checkedArray,
      onMatchInitValue,
      valueField,
      displayField
    } = this;
    this.getRefTreeData();
    //当有已选值，不做校验，即二次打开弹出层不做校验
    let valueMap = refValParse(value, valueField, displayField);
    if (checkedArray.length != 0 || !valueMap[valueField]) return;
    if (matchUrl) {
      request(matchUrl, {
        method: "post",
        data: {
          ...param,
          refCode: param.refCode,
          pk_val: valueMap[valueField].split(",") || ""
        }
      })
        .then(response => {
          let { data = [] } = response || {};
          if (
            Object.prototype.toString.call(onMatchInitValue) ===
            "[object Function]"
          ) {
            onMatchInitValue(data);
          }
          this.setState({
            checkedArray: data,
            showLoading: false,
            checkedKeys: data.map(item => {
              return item[valueField];
            })
          });
        })
        .catch(() => {
          this.setState({
            checkedArray: [],
            showLoading: false,
            checkedKeys: []
          });
        });
    } else {
      //当时不使用 matchUrl 做校验时，直接使用默认数护具标记选项，但数据完整性会变弱。
      this.setState({
        checkedArray: [valueMap],
        selectedArray: [valueMap],
        showLoading: false,
        checkedKeys: valueMap[valueField].split(",")
      });
    }
  };
  //   获取树组件数据
  getRefTreeData = (value)=> {
    let { param, treeBodyUrl, lazyModal, onAfterAjax, jsonp } = this;
  
    param = Object.assign(param, {
      treeNode: "",
      treeloadData: lazyModal
    });
    getTreeList(treeBodyUrl, param, value, jsonp)
      .then(res => {
        if (onAfterAjax && !this.state.isAfterAjax) {
          onAfterAjax(res);
          this.setState({ isAfterAjax: true });
        }
        let { data = [] } = res.data;
        if (data && data.length > 0) {
          if (lazyModal) {
            data = data.map(item => {
              delete item.children;
              return item;
            });
          }
          this.treeData = data;
          this.setState({
            showLoading: false
          });
          if (data[0].id) {
            this.setState({
              expandedKeys: [data[0].id]
            });
          }
        } else {
          this.treeData = [];
          this.setState({
            showLoading: false
          });
        }
      })
      .catch(() => {
        this.treeData = [];
        this.setState({
          showLoading: false
        });
      });
  }

  searchData = ()=>{

  }

  filter=()=>{

  }
  render() {
    let { store } = this.props;
    let { refEntity } = store.getState().meta;
    const { bMultiSel = false, cCheckFlds = "", code, name } = refEntity;
    // const [valueField,displayField] =  cCheckFlds.split(',');
    const valueField = "id";
    const displayField = "fullname";
    console.log(displayField, valueField);
    const dataURL = store.getState().dataUrl;
    const {
        showLoading,
        selectedArray,
        checkedKeys,
        expandedKeys,
        onSaveCheckItems
      } = this.state;
    const { getFieldError, getFieldProps } = this.props.form;

    const option = {
      title: name,
      searchable: true, //默认搜索输入框，没有这个字段
      multiple: bMultiSel, //refEntity: bMultiSel
      param: {
        refCode: code //refEntity: code
      },
      checkStrictly: true, //没有这个字段
      nodeDisplay: record => {
        //树节点显示的名字
        return record[this.displayField];
      },
      displayField: record => {
        //输入框的名字
        return record[this.displayField];
      }, //显示内容的键
      valueField: this.valueField, //真实 value 的键
      refModelUrl: {
        treeUrl: dataURL
      },
      matchUrl: "", //查找已选中的数据的URL,没有这个字段
      filterUrl: "", //输入框搜索匹配的URL,没有这个字段
      strictMode: true, //是否调用之前缓存的数据，为true则不重新请求
      lang: "zh_CN",
      defaultExpandAll: false,
      treeData: this.treeData,
      filterUrlFunc:this.filter,
        filertData:this.treeData,
      showLoading: showLoading,
      selectedArray: selectedArray, //  记录保存的选择项
      checkedKeys: checkedKeys,
      expandedKeys: expandedKeys,
      onSaveCheckItems: onSaveCheckItems
      // className:'ref-walsin-modal'
    };


    return (
      <RefTreeWithInput
        {...option}
        getRefTreeData={this.getRefTreeData}
        filterUrlFunc={this.filterUrlFunc}
      />
    );
  }
}

export default TreeRender;
