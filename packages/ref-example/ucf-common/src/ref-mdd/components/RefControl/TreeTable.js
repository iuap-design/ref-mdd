/**
 * 树表参照
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "mini-store";
import { RefTreeTableWithInput } from "ref-tree-table/lib/index";

// 工具类
import { refValParse, getQueryParam, initReferInfo } from "../../utils";
import {getTableInfo,getRefTreeData,launchTableHeader,launchTableData,getTableData} from './util';

// 样式
import "ref-tree-table/lib/index.css";

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
    let { store ,getDataParams} = this.props;
    let { viewApplication, refEntity } = store.getState().meta;
    
    initReferInfo.call(this,dataType, refEntity, viewApplication,getDataParams,store.getState());
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
  



  getData = async ()=>{
    const _this = this;
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
        // console.log('treeData===',this.treeData,this.tableData);
        this.setState({
          showLoading: false
        });
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
    this._getTableDataByParam(param);
  };

  _getTableDataByParam = (param)=>{
    this.setState({
      showLoading: true
    });
    this.getTableData(param).then(bodyData=>{
      this.launchTableData(bodyData);
      this.setState({
        showLoading: false
      });
    }).catch(e=>{
      this.setState({
        showLoading: false
      });
    });
  }
  onSave = item => {
    console.log("save", JSON.stringify(item));
    this.setState({
      matchData: item
    });
  };
  render() {
    let { store } = this.props;
    let { refEntity } = store.getState().meta;
    const { bMultiSel = false, code, name } = refEntity;

        let treeData = [{"code":"org1","children":[{"code":"bj","entityType":"mainEntity","name":"北京总部-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"bj","refpk":"5305416e-e7b4-4051-90bd-12d12942295b","id":"5305416e-e7b4-4051-90bd-12d12942295b","isLeaf":"true","refname":"北京总部-简"},{"code":"xd","entityType":"mainEntity","name":"新道-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"xd","refpk":"b691afff-ea83-4a3f-affa-beb2be9cba52","id":"b691afff-ea83-4a3f-affa-beb2be9cba52","isLeaf":"true","refname":"新道-简"},{"code":"yy3","entityType":"mainEntity","name":"test3","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy3","refpk":"e75694d9-7c00-4e9e-9573-d29465ae79a9","id":"e75694d9-7c00-4e9e-9573-d29465ae79a9","isLeaf":"true","refname":"test3"},{"code":"yy1","entityType":"mainEntity","name":"test1","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy1","refpk":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","id":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","isLeaf":"true","refname":"test1"},{"code":"dept2","children":[{"code":"cs","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"测试部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"cs","refpk":"cc43a66a-438d-4106-937f-bec44406f771","id":"cc43a66a-438d-4106-937f-bec44406f771","isLeaf":"true","refname":"测试部-简"},{"code":"qd","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"前端部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"qd","refpk":"73a10edd-aae8-4f31-af25-1f48f0a3b344","id":"73a10edd-aae8-4f31-af25-1f48f0a3b344","isLeaf":"true","refname":"前端部-简"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"生产处","refcode":"dept2","refpk":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","id":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refname":"生产处"},{"code":"dept1","children":[{"code":"dept1_2","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务二科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_2","refpk":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","id":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","isLeaf":"true","refname":"财务二科"},{"code":"dept1_1","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务一科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_1","refpk":"9711d912-3184-4063-90c5-1facc727813c","id":"9711d912-3184-4063-90c5-1facc727813c","isLeaf":"true","refname":"财务一科"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务处","refcode":"dept1","refpk":"95b60f35-ed0b-454e-b948-fb45ae30b911","id":"95b60f35-ed0b-454e-b948-fb45ae30b911","refname":"财务处"}],"entityType":"mainEntity","name":"用友集团","refcode":"org1","refpk":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refname":"用友集团"}]

        const { getFieldProps, getFieldError } = this.props.form;
    

    return (
        <RefTreeTableWithInput
        title='组织部门人员'
        textOption={{
            menuTitle: '组织',
            tableTitle: '人员',
        }}
        filterUrl='/pap_basedoc/common-ref/filterRefJSON'
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

