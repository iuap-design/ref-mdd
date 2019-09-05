import React, { Component } from "react";
import {
    SearchPanelItem
  } from "ref-multiple-table/lib/index";

import request from "../../utils/request";
import Radio  from "bee-radio";
/**
 * 表参照的请求总入口
 */
function getTableInfo(){
    let  param = this.param;
    param.page = {
      pageSize: this.page.pageSize,
      pageIndex: this.page.currPageIndex,
    };
    let requestList = [getTableHeader.call(this), getTableData.call(this,param)];
    return Promise.all(requestList)
   
  }

/**
 * 转换元数据参照表格数据为可识别的格式
 *
 */
function convertMetaTableData() {
    const { view={} } = this;
    let strFieldCode = [],
      strFieldName = [],
      tpl ={};
    let tableContainer = [];
    if(view.containers){
        tableContainer = view.containers.find(item=>{
            return item.cControlType.toLocaleLowerCase() == 'table';
        });
    }
    tableContainer.controls.forEach(item => {
      strFieldCode.push(item.cItemName);
      strFieldName.push(item.cShowCaption);
    });
    tpl["rootName"] = view.cTemplateTitle;
    tpl["refName"] = view.cTemplateTitle;
    tpl["defaultFieldCount"] = strFieldCode.length;
    tpl["strFieldCode"] = strFieldCode;
    tpl["strFieldName"] = strFieldName;
    return new Promise((resolve,reject)=>{
        resolve(tpl);
        // reject({err:true});
    })
    // return tpl;
  };
  
/**
 * 表参照---列数据
 * @param {*} params 
 */
function getTableHeader(){
    const _this = this;
    return new Promise((resolve, reject) => {
      resolve(convertMetaTableData.call(_this));
    });
  };

/**
 * 表参照---表体数据
 * @param {*} params 
 */
function getTableData(params){
  let extraParams = {};
  this.beforeGetData = this.props.store.getState().beforeGetData
  if(typeof this.beforeGetData == 'function'){
    extraParams = this.beforeGetData();
  }
  const paramsInfo = Object.assign({}, params,{dataType:'grid'},extraParams);
    return request(this.dataUrl, {
      method: "post",
      data: paramsInfo
    });
  };


  /**
   * 根据 refinfo 返回结果拆解并渲染表格表头
   * @param {object} data
   */
  function launchTableHeader(data,multiple){
    if (data == {}) return;
    // let { multiple } = this.props;
    let keyList = data.strFieldCode || [];
    let titleList = data.strFieldName || [];
    const valueField = this.valueField;
    this.filterFormInputs = [];
    let colunmsList = keyList.map((item, index) => {
    //   this.filterFormInputs.push(
    //     <SearchPanelItem key={item} name={item} text={titleList[index]}>
    //       <FormControl />
    //     </SearchPanelItem>
    //   );
      return {
        key: item,
        dataIndex: item,
        title: titleList[index]
      };
    });
    if (colunmsList.length === 0) {
      colunmsList = [
        { title: "未传递表头数据", dataIndex: "nodata", key: "nodata" }
      ];
    } else if (!multiple) {
      //单选时用对号符号标记当前行选中
      colunmsList.unshift({
        title: " ",
        dataIndex: "a",
        key: "a",
        width: 45,
        render(text, record, index) {
          return (
            <Radio.RadioGroup
              className = 'in-table'
              name={record[valueField]}
              selectedValue={record._checked ? record[valueField] : null}
            >
              <Radio value={record[valueField]} />
            </Radio.RadioGroup>
          );
        }
      });
    }
    this.columnsData = colunmsList;
  };

  /**
   * 处理并渲染表体数据
   */
  function launchTableData (response){
    if (!response) return;
    let { valueField } = this;
    // valueField = 'id';
    // let { data = [], page = {} } = response;
    let {
      data: { data ={} }
    } = response;
    const tableData = data.recordList ? data.recordList : [];
    tableData.map((record, k) => {
      record.key = record[valueField];
      return record;
    });
    this.tableData = tableData;
    this.tableData = tableData;
    this.page.pageCount = data.pageCount || 0;
    this.page.currPageIndex = data.pageIndex || 0;
    this.page.totalElements = data.recordCount || 0;
  };


  /**
   * 请求树数据
   * @param {*} value 
   */
  function getRefTreeData (value){
    let extraParams = {};
    this.beforeGetData = this.props.store.getState().beforeGetData
    if(typeof this.beforeGetData == 'function'){
      extraParams = this.beforeGetData();
    }
    let { param, dataUrl, lazyModal, onAfterAjax } = this;
    let paramsInfo = Object.assign({}, param,{dataType:'tree'},extraParams);
    return getTreeList(dataUrl, paramsInfo, value)
   
  }

  function _changeLoadingState(loadingValue){
	this.setState({
		showLoading:loadingValue
	});
  }
  const getTreeList = (url, param, content = "") =>{
    content.length && (param.likeValue = content); 
    param.dataType = 'tree';
    return request(url, {
      method: "POST",
      data: param
    });
  }

  /**
   * 新增方法，判断searchValue是否需要执行搜索。去除前后空格
   */
  function searchFunctionGoOn(value){
    let temp = value.trim();
    if(!temp ){

    }
  }
  export {getTableInfo,getRefTreeData,launchTableData,launchTableHeader,getTableData};