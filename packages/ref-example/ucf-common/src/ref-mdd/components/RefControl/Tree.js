/**
 * 树参照
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "mini-store";

import { RefTreeWithInput } from "ref-tree/lib/index";

// 工具类
import { initReferInfo } from "../../utils";
import {getRefTreeData} from './util';

// 样式
import "ref-tree/lib/index.less";

const noop = () => {
};

const propTypes = {
  param: PropTypes.object,
  lazyModal: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  value: PropTypes.string,
  onAfterAjax: PropTypes.func //请求完数据的回调，暂不需要
};
const defaultProps = {
  checkStrictly: false,
  lazyModal: false,
  param: {
    refCode: ""
  },
  onCancel: noop,
  onSave: noop,
  value: "",
  matchData:[]
};
const dataType = "tree";
@connect(state=>(state))
class Tree extends Component {
  constructor(props) {
    super(props);

    let { meta={},matchData=[] } = this.props;
    
    let { viewApplication, refEntity } = meta;
    initReferInfo.call(
      this,
      dataType,
      refEntity,
      viewApplication,
      this.props
    );
    this.state = {
      isAfterAjax: false,
      showLoading: false,
      matchData: matchData
    };

    this.treeData = [];
    this.getRefTreeData = getRefTreeData.bind(this);
  }

  componentWillReceiveProps(nextProps){
 
    // if(this.state.matchData !== nextProps.matchData){
    //   this.setState({
    //     matchData:nextProps.matchData
    //   })
    // }
  }

  onSave = data => {
    const  props  = this.props;
    const onOk = props.onOk;
    props.store.setState({
      matchData: data
    });
    onOk && onOk(data);
  };
  onCancel = () => {};

  getData = async () => {
    this.setState({
      showLoading: true
    });
    const flag = await this.getRefTreeData()
      .then(treeData => {
        this.setState({
          showLoading: false
        });
        let { data = [] } = treeData.data;
        this.treeData = data;
        this.setState({
          showLoading: false
        });
      })
      .catch(e => {
        console.log(e);
        this.treeData = [];
        this.setState({
          showLoading: false
        });
      });
    return flag;
  };

  searchData = () => {
    const { treeData } = this;
    this.setState({
      filterData: treeData
    });
  };
  render() {
    const props = this.props;
    let { refEntity } = props.meta;
    const { bMultiSel = false, code, name } = refEntity;
    const { showLoading } = this.state;
    let multiSelect =
    props.multiSelect == undefined
        ? bMultiSel
        : props.multiSelect;
    const option = {
      title: name,
      searchable: true, //默认搜索输入框，没有这个字段
      multiple: multiSelect, //refEntity: bMultiSel
      param: {
        refCode: code //refEntity: code
      },
      nodeDisplay: record => {
        //树节点显示的名字
        return record[this.displayField];
      },
      displayField: record => {
        //输入框的名字
        return record[this.displayField];
      }, //显示内容的键
      valueField: this.valueField, //真实 value 的键
      filterUrl: "", //输入框搜索匹配的URL,没有这个字段
      strictMode: true, //是否调用之前缓存的数据，为true则不重新请求
      defaultExpandAll: false,
      treeData: this.treeData,
      filterData: this.state.filterData,
      showLoading: showLoading,
      isLocalSearch:true
    };

    return (
      <RefTreeWithInput
        {...option}
        getRefTreeData={this.getRefTreeData}
        filterUrlFunc={this.searchData}
        onSave={this.onSave}
        canClickGoOn={this.getData}
        matchData={props.matchData}
      />
    );
  }
}

export default Tree;
Tree.defaultProps = defaultProps;
Tree.propTypes = propTypes;