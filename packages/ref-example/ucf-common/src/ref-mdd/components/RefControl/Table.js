/**
 * 单表参照
 */
import React, { Component } from "react";
import { connect } from "mini-store";

import {
  SearchPanelItem,
  RefMultipleTableWithInput
} from "ref-multiple-table/lib/index";
// 工具类
import {initReferInfo } from "../../utils";
import {getTableInfo,launchTableHeader,launchTableData,getTableData} from './util';
import request from "../../utils/request";
// 样式
import "ref-multiple-table/lib/index.less";
const defaultProps = {
  matchData:[]
}
const dataType = "grid";
@connect(state => ({ form: state.form }))
class Table extends Component {

  constructor(props) {
    super(props);
    let { store } = this.props;
    let { viewApplication, refEntity } = store.getState().meta;
    initReferInfo.call(this,dataType, refEntity, viewApplication,store.getState());
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
    let { store ,beforeGetData} = nextProps;
    this.dataUrl = store.getState().dataUrl;
   
  }
  onSave = data => {
    const {store} = this.props;
    const onOk = store.getState().onOk;
    store.setState({
      matchData:data
    });
  
    // console.log("save", data);
    onOk && onOk(data);
  };
  onCancel = () => {};


  getData = async ()=>{
    this.setState({
      showLoading: true
    });
    const flag =  await this.getTableInfo().then(([columnsData, bodyData])=>{
      
        // 请求完表体数据回调
        if (this.onAfterAjax) {
            this.onAfterAjax(bodyData);
        }
        let multiple = this.props.store.getState().meta.refEntity.bMultiSel;
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
  launchTableData = response => {
    if (!response) return;
    let { valueField } = this.props;
    let {
      data: { data }
    } = response;
    const tableData = data && data.recordList ? data.recordList : [];
    tableData.map((record, k) => {
      record.key = record[valueField];
      return record;
    });
    this.tableData = tableData;
    this.pageCount = data.pageCount || 0;
    this.currPageIndex = data.pageIndex || 0;
    this.totalElements = data.recordCount || 0;
  };

 

  // 复杂查询
  searchFilterInfo = filterInfo => {
    const _this = this;
    let { param } = this;

    this.filterInfo = filterInfo;
    this.setState(
      {
        showLoading: true
      },
      function() {
        let { pageSize } = _this;
        let paramWithFilter = Object.assign({}, param, {
          page: { pageIndex: 0, pageSize: pageSize },
          likeValue: filterInfo
        });

        _this.loadTableData(paramWithFilter);
      }
    );
  };
  /** start:分页 */
  /**
   * 跳转到制定页数的操作
   * @param {number} index 跳转页数
   */
  handlePagination = index => {
    let { filterInfo,param } = this;
    Object.keys(filterInfo).forEach(key => {
      if (!filterInfo[key]) {
        delete filterInfo[key];
      }
    });

    param.page = {
      pageSize: this.pageSize,
      pageIndex: index
    };
    if (Object.keys(filterInfo) > 0) {
      param.content = JSON.stringify(filterInfo);
    }
    this.loadTableData(param);
  };
  /**
   * 选择每页数据个数
   */
  dataNumSelect = (index, pageSize) => {
    let { filterInfo,param } = this;
    Object.keys(filterInfo).forEach(key => {
      if (!filterInfo[key]) {
        delete filterInfo[key];
      }
    });

    param.page = {
      pageSize: pageSize,
      pageIndex: this.currPageIndex - 1
    };

    if (Object.keys(filterInfo) > 0) {
      param.content = JSON.stringify(filterInfo);
    }
    this.pageSize = pageSize;
    this.loadTableData(param);
  };
  render() {
    let { store } = this.props;
    let { viewApplication, refEntity } = store.getState().meta;
    const { getFieldError, getFieldProps } = this.props.form;
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

    const props = {
      // placeholder: extendField.placeholder,
      style:{width:200},
      title: cBillName,
      multiple: refEntity.bMultiSel,
      displayField: `{${displayField}}`,
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
      matchData:store.getState().matchData,
      emptyBut: true //清空按钮是否展示
    };
    return (
      <div className='ref-container'>
        <RefMultipleTableWithInput
          {...props}
          onSave={this.onSave}
          onCancel={this.onCancel}
          canClickGoOn={this.getData}
          {...getFieldProps(valueField, {
            initialValue: `{${displayField}:"",${valueField}:""}`,
            rules: [
              {
                message: "请选择参照",
                pattern: /[^{refname:"",refpk:""}]/
              }
            ]
          })}
        />
        <span className="error">{getFieldError(valueField)}</span>
      </div>
    );
  }
}
Table.defaultProps= defaultProps;
export default Table;
