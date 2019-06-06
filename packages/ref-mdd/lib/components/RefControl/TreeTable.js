/**
 * 树表参照
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "mini-store";
import { RefTreeTableWithInput } from "ref-tree-table/lib/index";

// 工具类
import {  initReferInfo } from "../../utils";
import {getTableInfo,getRefTreeData,launchTableHeader,launchTableData,getTableData} from './util';

// 样式
import "ref-tree-table/lib/index.less";

const dataType = "treeTable";
const defaultProps = {
  matchData:[]
}
@connect(state => ({ form: state.form }))
class TreeTable extends Component {
  constructor(props) {
    super(props);
   
    this.columnsData = [];
    this.tableData = [];
    this.originTableData = [];
    let { store} = this.props;
    let { viewApplication, refEntity } = store.getState().meta;
    
    initReferInfo.call(this,dataType, refEntity, viewApplication,store.getState());
    this.view = viewApplication.view;
    this.dataType = '';
    this.getTableInfo =  getTableInfo.bind(this);
    this.getRefTreeData = getRefTreeData.bind(this);
    this.launchTableData = launchTableData.bind(this);
    this.launchTableHeader = launchTableHeader.bind(this);
    this.getTableData = getTableData.bind(this);
    this.page = {
      pageCount: 1, //总页数
      currPageIndex:0,
      pageSize: "10", //每页数据数
    };
    this.state = {
      value: "",
      matchData:  store.getState().matchData
    };
  }
  
  componentWillUnmount(){
    if(this.timer){
      clearTimeout(this.timer);
      this.timer = null;
    }
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
        this.launchTableHeader(columnsData);
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
    // alert(value);
    console.log('treeSearch---',value);
    
  };
  loadTableData = pageInfo => {
    const {param} = this;
    param.page.pageIndex = pageInfo[`refClientPageInfo.currPageIndex`]+1,

   this._getTableDataByParam(param);
  };

  onTableSearch = value => {
    console.log("onTableSearch", value);
    const {param} = this;
    value ? param.likeValue=value : param.likeValue =null
    this._getTableDataByParam(param)
    if(this.timer){
      clearTimeout(this.timer);
    }
    
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
  onSave = item => {
    // console.log("save", JSON.stringify(item));
    this.setState({
      matchData: item
    });
  };

  render() {

    const { getFieldProps, getFieldError } = this.props.form;
    return (
        <RefTreeTableWithInput
        title={this.cBillName}
        displayField={`{${this.displayField}}`}
        valueField={this.valueField}
        lang='zh_CN'
        treeData={this.treeData}
        onTreeChange={this.onTreeChange} 
        onTreeSearch={this.onTreeSearch}
        columnsData={this.columnsData}
        tableData={this.tableData}
        page={this.page}
        loadTableData={this.loadTableData}
        onTableSearch={this.onTableSearch}
        onSave={this.onSave}
        matchData={this.state.matchData}
        showLoading ={this.state.showLoading}
        nodeDisplay={`{${this.displayField}}`}
        defaultExpandAll = {false}
        canClickGoOn={this.getData}
        {...getFieldProps('code', {
            initialValue: '',
            rules: [{
                message: '提示：请选择',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
            }]
        })}
    />
    );
  }
}
TreeTable.defaultProps= defaultProps;
export default TreeTable;

