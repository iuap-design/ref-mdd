/**
 * 树表参照
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "mini-store";
import { RefTreeTableWithInput } from "ref-tree-table/lib/index";

// 工具类
import {  initReferInfo, needRecallInitReferInfo } from "../../utils";
import {getTableInfo,getRefTreeData,launchTableHeader,launchTableData,getTableData} from './util';

// 样式
import "ref-tree-table/lib/index.less";

const dataType = "treeTable";
const defaultProps = {
  matchData:[]
}
@connect(state => (state))
class TreeTable extends Component {
  constructor(props) {
    super(props);
   
    this.columnsData = [];
    this.tableData = [];
    this.originTableData = [];
  
    let { viewApplication, refEntity } = props.meta;
    
    initReferInfo.call(this,dataType, refEntity, viewApplication,props);
    this.view = viewApplication.view;
    this.dataType = '';
    this.getTableInfo =  getTableInfo.bind(this);
    this.getRefTreeData = getRefTreeData.bind(this);
    this.launchTableData = launchTableData.bind(this);
    this.launchTableHeader = launchTableHeader.bind(this);
    this.getTableData = getTableData.bind(this);
    this.page = {
      pageCount: 1, //总页数
      currPageIndex:1,
      pageSize: "10", //每页数据数
    };
    this.state = {
      value: ""
    };
    this.searchTimeOut;//tree搜索延迟
    this.timer;//table搜索延迟
  }
  
  componentWillUnmount(){
    if(this.timer || this.searchTimeOut){
      clearTimeout(this.timer);
      clearTimeout(this.searchTimeOut);
      this.timer = null;
      this.searchTimeOut = null;
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.dataUrl !== this.props.dataUrl){
      this.dataUrl = nextProps.dataUrl;
    }
    //是否重新初始化initReferInfo
    let need = needRecallInitReferInfo(nextProps,this.props);
    if(need){
      let { viewApplication, refEntity } = nextProps.meta;
      initReferInfo.call(this,dataType, refEntity, viewApplication,nextProps);
    }
  }

  getMultiple = () =>{
    let props = this.props;
    let multiSelect =props.multiSelect == undefined
    ? props.meta.refEntity.bMultiSel
    : props.multiSelect;
    return multiSelect
  }
  getData = async ()=>{
    this.setState({
      showLoading: true
    });
    const flag =  await Promise.all([this.getTableInfo(),this.getRefTreeData()]).then(([[columnsData, bodyData],treeData])=>{
      
      // 请求完表体数据回调
        if (this.onAfterAjax) {
            this.onAfterAjax(bodyData);
        }
        
        this.launchTableHeader(columnsData,this.getMultiple());
        this.launchTableData(bodyData);
        if (this.onAfterAjax && !this.state.isAfterAjax) {
            this.onAfterAjax(treeData);
            this.setState({ isAfterAjax: true });
        }
        let { data = [] } = treeData.data;
        this.treeData = data;
        this.setState({
          showLoading: false
         }); 
        // console.log('treeData===',this.treeData,this.tableData);
       
    }).catch(e=>{
         console.log(e);
        this.launchTableHeader({});
        this.launchTableData({});
        this.treeData = [];
        this.setState({
          showLoading: false
        });
    })

    return flag;
    
  }
  onTreeChange = record => {
    const {param} = this;
    param.data = record[0];
    param.path = record[0] && record[0].path;
    this._getTableDataByParam(param);
  };
  onTreeSearch = value => { 
    if( !!value && this._searchValueTree === value.trim()) return;
    this._searchValueTree = value === undefined ?"": value.trim();
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut  = setTimeout(() => {
      this._getRefTreeDataByParam(this._searchValueTree)
    }, 300);
    
  };
  loadTableData = pageInfo => {
    const {param} = this;
    param.page.pageIndex = pageInfo[`refClientPageInfo.currPageIndex`]+1,

   this._getTableDataByParam(param);
  };

  onTableSearch = value => {
    if( !!value && this._searchValueTable === value.trim()) return;
    this._searchValueTable = value === undefined ?"": value.trim();
    const {param} = this;
    this._searchValueTable ? param.likeValue=this._searchValueTable : param.likeValue =null
    clearTimeout(this.timer);
    this.timer = setTimeout(this._getTableDataByParam(param),300);
  };

  _getTableDataByParam = (param)=>{
    this.setState({
      showLoading: true
    });
    this.getTableData(param).then(bodyData=>{
      this.setState({
        showLoading: false
      });
      this.launchTableData(bodyData);
     
    }).catch(e=>{
      this.setState({
        showLoading: false
      });
    });
  }

  _getRefTreeDataByParam =(value)=>{
    this.setState({
      showLoading: true
    });
    this.getRefTreeData(value).then(treeData=>{
      let { data = [] } = treeData.data;
      this.treeData = data;
      this.setState({
        showLoading: false
      });
    }).catch(e=>{
      this.setState({
        showLoading: false
      });
    });
  }
   /**
   * 再次打开清空所有的搜索条件
   */
  clearGetDataParam = () =>{
    delete(this.param.likeValue);
    this.page = {
      pageCount: 1, //总页数
      currPageIndex:1,
      pageSize: "10", //每页数据数
    }
  }
  onSave = data => {
    this.clearGetDataParam();
    const { store,onOk } = this.props;
    store.setState({
      matchData: data
    });
    onOk && onOk(data);
  };

  render() { 
    let props = this.props; 
    const propsParamTreeTable = {
        title:this.cBillName,
        multiple:this.getMultiple(),
        displayField:record => {
          //下拉的展示 
          return record[this.displayField];//ref-core0.x.x版本以上的需要的input展示
        },
          inputDisplay:record => {
          //输入框的名字
          return record[this.displayField];//ref-core0.x.x版本以上的需要的input展示
        },
        valueField:this.valueField,
        treeData:this.treeData,
        columnsData:this.columnsData,
        tableData:this.tableData,
        page:this.page,
        showLoading :this.state.showLoading,
        nodeDisplay:record => {
          //树节点
          return record[this.displayField];//ref-core0.x.x版本以上的需要的input展示
        },
        defaultExpandAll : false,
        matchData:props.matchData,
        value:props.value,
        onChange:props.onChange,//为了让form表单的校验进来
        disabled:props.disabled,//不可选，业务需求
    };
    return (
      <div className='ref-container-tree-table'>
        <RefTreeTableWithInput
          {...propsParamTreeTable}
          onTreeChange={this.onTreeChange} 
          onTreeSearch={this.onTreeSearch}
          loadTableData={this.loadTableData}
          onTableSearch={this.onTableSearch}
          onSave={this.onSave}
          canClickGoOn={this.getData}
      />
      </div>
    );
  }
}
TreeTable.defaultProps= defaultProps;
export default TreeTable;

