/**
 * 树参照
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "mini-store";

import {
    SearchPanelItem
  } from "ref-multiple-table/lib/index";

import request from "../../utils/request";
import { FormControl, Radio } from "tinper-bee";
// 工具类


// 样式



@connect(state => ({ form: state.form }))
class BasicRef {


  getTableInfo(){
    const _this = this;
    console.log('==================',this,this.param);
    let  param = this.param;
    param.page = {
      pageSize: 10,
      pageIndex: 1
    };
  
    let requestList = [this.getTableHeader, this.getTableData(param)];
    return Promise.all(requestList)
      .then(([columnsData, bodyData]) => {
        // 请求完表体数据回调
        if (this.onAfterAjax) {
            this.onAfterAjax(bodyData);
        }
        this.launchTableHeader(columnsData);
        this.launchTableData(bodyData);
        this.setState({
          showLoading: false
        });
      })
      .catch(e => {
        console.log(e);
        this.launchTableHeader({});
        this.launchTableData({});
        this.setState({
          showLoading: false
        });
        console.error(e);
      });
   
  }

  /**
   * 转换元数据参照表格数据为可识别的格式
   *
   */
  convertMetaTableData() {
    const { view={} } = this;
    let strFieldCode = [],
      strFieldName = [],
      tpl ={};
    let tableContainer = [];
    if(view.containers){
        tableContainer = view.containers.find(item=>{
            return item.cName.toLocaleLowerCase() == 'table';
        });
    }
    tableContainer.controls.forEach(item => {
      strFieldCode.push(item.cFieldName);
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
  getTableHeader(){
    const _this = this;
    return new Promise((resolve, reject) => {
      resolve(this.convertMetaTableData);
    });
  };

  getTableData(params){
    params.dataType = 'grid';
    return request(this.dataUrl, {
      method: "post",
      data: params
    });
  };


  /**
   * 根据 refinfo 返回结果拆解并渲染表格表头
   * @param {object} data
   */
 launchTableHeader(data){
    if (data == {}) return;
    let { multiple } = this.props;
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
   * 处理并渲染表格数据
   */
 launchTableData (response){
    if (!response) return;
    let { valueField } = this.props;
    // valueField = 'id';
    // let { data = [], page = {} } = response;
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


  //   获取树组件数据
 getRefTreeData (value){
    let { param, dataUrl, lazyModal, onAfterAjax } = this;
    param.dataType = 'tree';
 
    getTreeList(dataUrl, param, value)
      .then(res => {
        if (onAfterAjax && !this.state.isAfterAjax) {
          onAfterAjax(res);
          this.setState({ isAfterAjax: true });
        }
        let { data = [] } = res.data;
		this.treeData = data;
		this._changeLoadingState(false);
      })
      .catch(() => {
        this.treeData = [];
        this._changeLoadingState(false);
      });
  }

  _changeLoadingState(loadingValue){
	this.setState({
		showLoading:loadingValue
	});
  }
 getTreeList = (url, param, content = "") =>{
    content.length && (param.likeValue = content); 
    return request(url, {
      method: "POST",
      data: param
    });
  }

 
}

export default BasicRef;
