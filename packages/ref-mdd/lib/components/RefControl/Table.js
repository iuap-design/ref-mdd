/**
 * 单表参照
 */
import React, { Component } from "react";
import { connect } from "mini-store";

import { FormControl, Radio } from "tinper-bee";
import {
  SearchPanelItem,
  RefMultipleTableWithInput
} from "ref-multiple-table/lib/index";
// 工具类
import { refValParse,getQueryParam,initReferInfo } from "../../utils";
import request from "../../utils/request";
// 样式
import "ref-multiple-table/lib/index.css";

const dataType = "grid";
@connect(state => ({ form: state.form }))
class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      selectedDataLength: 0,
      mustRender: 0
    };

    let { store ,getDataParams} = this.props;
    let { viewApplication, refEntity } = store.getState().meta;
    this.dataUrl = store.getState().dataUrl;
     initReferInfo.call(this,dataType, refEntity, viewApplication,getDataParams);
    this.view = viewApplication.view;
    // this.dataUrl =  '/uniform/'+(refEntity.svcKey?refEntity.svcKey+'/ref/getRefData': 'bill/ref/getRefData');//表体请求url
    this.columnsData = []; //表头数据
    this.tableData = []; //表格数据
    this.pageCount = 1; //总页数
    this.pageSize = "10"; //每页数据数
    this.currPageIndex = 1; //激活页码
    this.filterFormInputs = [];
    this.filterInfo = {};
    this.checkedArray = [];
    this.checkedMap = {};
    this.inited = false;
    this.value = ''; //默认值，初始化input框值后续加上
  }
  componentDidMount() {
    // this.initComponent();
  }
  onSave = data => {
    const {store} = this.props;
    const onOk = store.getState().onOk;
    this.setState({
      matchData:data
    });
    // console.log("save", data);
    onOk && onOk(data);
  };
  onCancel = () => {};

  initComponent = async () => {
    const _this = this;
    let { param, valueField, displayField, value } = _this;
    param.page = {
      pageSize: 10,
      pageIndex: 1
    };
    let requestList = [_this.getTableHeader(), _this.getTableData(param)];
    await Promise.all(requestList)
      .then(([columnsData, bodyData]) => {
        // 请求完表体数据回调
        if (_this.onAfterAjax) {
          _this.onAfterAjax(bodyData);
        }
        _this.launchTableHeader(columnsData);
        _this.launchTableData(bodyData);
        _this.setState({
          showLoading: false
        });
      })
      .catch(e => {
        _this.launchTableHeader({});
        _this.launchTableData({});
        _this.setState({
          showLoading: false
        });
        console.error(e);
      });
    return true;
  };
  /**
   * 转换元数据参照表格数据为可识别的格式
   *
   */
  convertMetaTableData = () => {
    const { view } = this;
    let strFieldCode = [],
      strFieldName = [],
      tpl ={};

    view.containers[0].controls.forEach(item => {
      strFieldCode.push(item.cFieldName);
      strFieldName.push(item.cCaption);
    });
    tpl["rootName"] = view.cTemplateTitle;
    tpl["refName"] = view.cTemplateTitle;
    tpl["defaultFieldCount"] = strFieldCode.length;
    tpl["strFieldCode"] = strFieldCode;
    tpl["strFieldName"] = strFieldName;
    return tpl;
  };
  getTableHeader = () => {
    return new Promise((resolve, reject) => {
      resolve(this.convertMetaTableData());
    });
  };

  getTableData = params => {
    return request(this.dataUrl, {
      method: "post",
      data: params
    });
  };

  /**
   * 根据 refinfo 返回结果拆解并渲染表格表头
   * @param {object} data
   */
  launchTableHeader = data => {
    if (!data) return;
    let { multiple } = this.props;
    let keyList = data.strFieldCode || [];
    let titleList = data.strFieldName || [];
    const valueField = this.valueField;
    this.filterFormInputs = [];
    let colunmsList = keyList.map((item, index) => {
      this.filterFormInputs.push(
        <SearchPanelItem key={item} name={item} text={titleList[index]}>
          <FormControl />
        </SearchPanelItem>
      );
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
  launchTableData = response => {
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

  //加载getTableData
  loadTableData = param => {
    this.setState({
      showLoading: true
    });
    const _this = this;

    _this.getTableData(param)
      .then(response => {
        _this.launchTableData(response);
        _this.setState({
          showLoading: false
        });
      })
      .catch(() => {
        _this.launchTableData({});
        _this.setState({
          showLoading: false
        });
      });
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
      pageCount,
      pageSize,
      currPageIndex,
      filterFormInputs,
      filterInfo,
    } = this;
    let { dataNumSelect, handlePagination, searchFilterInfo } = this;
 
    const props = {
      // placeholder: extendField.placeholder,
      title: cBillName,
      multiple: refEntity.bMultiSel,
      displayField: `{${displayField}}`,
      valueField: valueField,
      showLoading: showLoading,
      columnsData: columnsData,
      tableData: tableData,
      pageCount: pageCount,
      pageSize: pageSize,
      currPageIndex: currPageIndex,
      filterFormInputs: filterFormInputs,
      filterInfo: filterInfo,
      dataNumSelect: dataNumSelect,
      handlePagination: handlePagination,
      miniSearchFunc: searchFilterInfo,
      emptyBut: true //清空按钮是否展示
    };
    console.log(props);
    return (
      <div className='ref-container'>
        <RefMultipleTableWithInput
          {...props}
          onSave={this.onSave}
          onCancel={this.onCancel}
          canClickGoOn={this.initComponent}
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

export default Table;
