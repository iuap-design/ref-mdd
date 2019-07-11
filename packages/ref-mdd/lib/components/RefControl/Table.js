/**
 * 单表参照
 */
import React, { Component } from "react";
import { connect } from "mini-store";

import {
  RefMultipleTableWithInput
} from "ref-multiple-table/lib/index";
// 工具类
import {initReferInfo } from "../../utils";
import {getTableInfo,launchTableHeader,launchTableData,getTableData} from './util';

// 样式
import "ref-multiple-table/lib/index.less";
const defaultProps = {
  matchData:[]
}
const dataType = "grid";
@connect(state => (state))
class Table extends Component {

  constructor(props) {
    super(props);
    let { viewApplication, refEntity } = props.meta;
    initReferInfo.call(this,dataType, refEntity, viewApplication,props);
    this.view = viewApplication.view;
    // this.dataUrl =  '/uniform/'+(refEntity.svcKey?refEntity.svcKey+'/ref/getRefData': 'bill/ref/getRefData');//表体请求url
    this.columnsData = []; //表头数据
    this.tableData = []; //表格数据

    this.page = {
      pageCount: 1, //总页数
      currPageIndex:1,
      pageSize: "10", //每页数据数
    };
    this.filterFormInputs = [];
    this.filterInfo = {};
    this.checkedArray = [];
    this.checkedMap = {};
    this.inited = false;
    this.value = ''; //默认值，初始化input框值后续加上
    this.state = {
      showLoading: true
    };

    this.getTableInfo =  getTableInfo.bind(this);
    this.launchTableData = launchTableData.bind(this);
    this.launchTableHeader = launchTableHeader.bind(this);
    this.getTableData = getTableData.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.dataUrl !== this.props.dataUrl){
      this.dataUrl = nextProps.dataUrl;
    }
   
   
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
  onSave = (data,name) => {
    this.clearGetDataParam();
    const props = this.props;
    const onOk = props.onOk;
   
    props.store.setState({
      matchData:data
    });
  
    // console.log("save", data);
    onOk && onOk(data);
  };
  onCancel = () => {
    this.clearGetDataParam();
    const props = this.props;
    const onCancel = props.onCancel;
    onCancel && onCancel();
  };

  loadTableData  = (param) =>{
    this.param = param;
    this.getData()
    return false;
    // this.setState({
    //   showLoading:true,
    // })
  }
  getData = async ()=>{
    this.setState({
      showLoading: true
    });
    const flag =  await this.getTableInfo().then(([columnsData, bodyData])=>{
      
        // 请求完表体数据回调
        if (this.onAfterAjax) {
            this.onAfterAjax(bodyData);
        }
        let multiSelect =this.props.multiSelect == undefined
            ? this.props.meta.refEntity.bMultiSel
            : this.props.multiSelect;
        let multiple = multiSelect;
        this.launchTableHeader(columnsData,multiple);
        this.launchTableData(bodyData);
        if (this.onAfterAjax && !this.state.isAfterAjax) {
            this.onAfterAjax(treeData);
            this.setState({ isAfterAjax: true });
        }
        this.setState({
          showLoading: false
        });
    }).catch(e=>{
         console.log(e);
        this.launchTableHeader({});
        this.launchTableData({});
        this.setState({
          showLoading: false
        });
    })

    return flag;
    
  }
  
  /**
   * 处理并渲染表格数据
   */
  // launchTableData = response => {
  //   if (!response) return;
  //   let { valueField } = this.props;
  //   let {
  //     data: { data }
  //   } = response;
  //   const tableData = data && data.recordList ? data.recordList : [];
  //   tableData.map((record, k) => {
  //     record.key = record[valueField];
  //     return record;
  //   });
  //   this.tableData = tableData;
  //   debugger;
  //   this.page={
  //     pageCount : data.pageCount || 0,
  //     currPageIndex : data.pageIndex|| 0,
  //     totalElements : data.recordCount || 0,
  //   }
  //   // this.pageCount = data.pageCount || 0;
  //   // this.currPageIndex = data.pageIndex || 0;
  //   // this.totalElements = data.recordCount || 0;
  // };

 

  // 复杂查询
  
  searchFilterInfo = filterInfo => {
    const _this = this;
    let { param } = this;
    this.filterInfo = filterInfo;
    //还原数据信息
    this.page.currPageIndex = 1;
    this.page.pageSize = '10';
    let paramWithFilter = Object.assign({}, param, {
      page:this.page,
      likeValue: filterInfo
    });
    if(!filterInfo){
      delete(paramWithFilter.likeValue)
    }
    _this.loadTableData(paramWithFilter);
  };
  /** start:分页 */
  /**
   * 跳转到制定页数的操作
   * @param {number} index 跳转页数
   */
  handlePagination = index => {
    let { filterInfo,param } = this;
   
    this.page.currPageIndex = index;
   
    this.loadTableData(param);
  };
  /**
   * 选择每页数据个数
   */
  dataNumSelect = (index, pageSize) => {
    let { filterInfo,param } = this;
  
    this.page.pageSize = pageSize;
   
    this.loadTableData(param);
  };

  render() {
    const  props = this.props;
    let { viewApplication, refEntity } = props.meta;
    // const { getFieldError, getFieldProps } = props.form;
    const { cBillName, view } = viewApplication;
    // let { extendField = "{}" } = refEntity;
    // extendField = JSON.parse(extendField);

    const {valueField,displayField} = this;
    let { showLoading } = this.state;
    let {
      columnsData,
      tableData,
      page,
      filterFormInputs,
      filterInfo,
      dataNumSelect,
      handlePagination,
      searchFilterInfo,
    } = this;
    let multiSelect =
    props.multiSelect == undefined
        ? refEntity.bMultiSel
        : props.multiSelect;
    const propsParam = {
      // placeholder: extendField.placeholder,
      // style:{width:200},
      title: cBillName,
      multiple: multiSelect,
      displayField: `{${displayField}}`,//ref-core0.x.x版本以上的需要的input展示
      inputDisplay:`{${displayField}}`,//ref-core1.0.x版本以上的需要的input展示
      valueField: valueField,
      showLoading: showLoading,
      columnsData: columnsData,
      tableData: tableData,
      pageCount: page.pageCount,
      pageSize: page.pageSize,
      currPageIndex: page.currPageIndex,
      filterFormInputs: filterFormInputs,
      filterInfo: filterInfo,
      dataNumSelect: dataNumSelect,
      handlePagination: handlePagination,
      miniSearchFunc: searchFilterInfo,
      matchData:props.matchData || [],
      value:props.value,
      onChange:props.onChange,
      emptyBut: true, //清空按钮是否展示
      disabled:props.disabled,//不可选，业务需求
    };
    console.log('table',propsParam.valueField,propsParam.displayField)
    return (
      <div className='ref-container'>
        <RefMultipleTableWithInput
          {...propsParam}
          onSave={this.onSave}
          onCancel={this.onCancel}
          canClickGoOn={this.getData}
          // mustPaginationShow={true}
        />
       
      </div>
    );
  }
}
Table.defaultProps= defaultProps;
export default Table;
