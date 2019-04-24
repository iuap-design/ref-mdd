import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class, _temp;

import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';
import { connect } from 'mini-store';
import RefMultipleTableBaseUI, { SearchPanelItem } from 'ref-multiple-table/lib/index';
import { refValParse } from '../../utils';
import request from '../../utils/request';
var Table = (_dec = connect(function (state) {
  return {
    view: state.meta.viewApplication.view
  };
}), _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Table, _Component);

  //表头数据
  //表格数据
  //总页数
  //每页数据数
  //激活页码
  function Table(props) {
    var _this2;

    _this2 = _Component.call(this, props) || this;
    _this2.columnsData = [];
    _this2.tableData = [];
    _this2.pageCount = 1;
    _this2.pageSize = '10';
    _this2.currPageIndex = 1;
    _this2.fliterFormInputs = [];
    _this2.filterInfo = {};

    _this2.initComponent = function () {
      var _this2$props = _this2.props,
          param = _this2$props.param,
          valueField = _this2$props.valueField,
          displayField = _this2$props.displayField,
          value = _this2$props.value,
          onMatchInitValue = _this2$props.onMatchInitValue;
      param.page = {
        "pageSize": 10,
        "pageIndex": 1
      };

      var _this = _assertThisInitialized(_this2);

      var requestList = [_this.getTableHeader(), _this.getTableData(param)];
      var valueMap = refValParse(value, valueField, displayField);

      if (_this.checkedArray.length == 0 && valueMap[valueField]) {
        requestList.push(new Promise(function (resolve, reject) {
          resolve({
            data: []
          });
        }));
      }

      ;
      Promise.all(requestList).then(function (_ref) {
        var columnsData = _ref[0],
            bodyData = _ref[1],
            matchData = _ref[2];

        if (_this.onAfterAjax) {
          _this.onAfterAjax(bodyData);
        }

        if (matchData) {
          var _matchData$data = matchData.data,
              data = _matchData$data === void 0 ? [] : _matchData$data;
          _this.checkedMap = {};
          _this.checkedArray = data.map(function (item) {
            item.key = item[valueField];
            item._checked = true;
            _this.checkedMap[item.key] = item;
            return item;
          });

          if (Object.prototype.toString.call(onMatchInitValue) === '[object Function]') {
            onMatchInitValue(data);
          }

          _this.setState({
            selectedDataLength: _this2.checkedArray.length,
            mustRender: Math.random()
          });
        }

        _this.launchTableHeader(columnsData);

        _this.launchTableData(bodyData);

        _this.setState({
          showLoading: false
        });
      }).catch(function (e) {
        _this.launchTableHeader({});

        _this.launchTableData({});

        _this.setState({
          showLoading: false
        });

        console.error(e);
      });
      ;
    };

    _this2.convertMetaTableData = function (view) {
      var strFieldCode = [],
          strFieldName = [];
      var tpl = {
        "refUIType": "RefTable",
        "refCode": "new_bd_staff",
        "defaultFieldCount": 4,
        "strFieldCode": [],
        "strFieldName": [],
        "rootName": "人员-平台表",
        "refName": "人员-平台表",
        "refClientPageInfo": {
          "pageSize": 100,
          "currPageIndex": 0,
          "pageCount": 0,
          "totalElements": 0
        },
        "refVertion": "NewRef"
      };
      console.log('view', view);
      view.containers[0].controls.forEach(function (item) {
        strFieldCode.push(item.cFieldName);
        strFieldName.push(item.cCaption);
      });
      tpl['rootName'] = view.cTemplateTitle;
      tpl['refName'] = view.cTemplateTitle;
      tpl['defaultFieldCount'] = strFieldCode.length;
      tpl['strFieldCode'] = strFieldCode;
      tpl['strFieldName'] = strFieldName;
      console.log('tpl', tpl);
      return tpl;
    };

    _this2.getTableHeader = function () {
      var view = _this2.props.view;
      return new Promise(function (resolve, reject) {
        resolve(_this2.convertMetaTableData(view));
      });
    };

    _this2.getTableData = function (params) {
      var refModelUrl = _this2.props.refModelUrl;
      return request(refModelUrl.tableBodyUrl, {
        method: 'post',
        data: params
      });
    };

    _this2.launchTableHeader = function (data) {
      if (!data) return;
      var multiple = _this2.props.multiple;
      var keyList = data.strFieldCode || [];
      var titleList = data.strFieldName || [];
      _this2.fliterFormInputs = [];
      var colunmsList = keyList.map(function (item, index) {
        _this2.fliterFormInputs.push(React.createElement(SearchPanelItem, {
          key: item,
          name: item,
          text: titleList[index]
        }, React.createElement(FormControl, null)));

        return {
          key: item,
          dataIndex: item,
          title: titleList[index]
        };
      });

      if (colunmsList.length === 0) {
        colunmsList = [{
          title: "未传递表头数据",
          dataIndex: "nodata",
          key: "nodata"
        }];
      } else if (!multiple) {
        //单选时用对号符号标记当前行选中
        colunmsList.unshift({
          title: " ",
          dataIndex: "a",
          key: "a",
          width: 45,
          render: function render(text, record, index) {
            return React.createElement("div", {
              className: "ref-multiple-table-radio " + (record._checked ? 'ref-multiple-table-radio-on' : '')
            });
          }
        });
      }

      _this2.columnsData = colunmsList;
    };

    _this2.launchTableData = function (response) {
      if (!response) return;
      var valueField = _this2.props.valueField; // valueField = 'id';
      // let { data = [], page = {} } = response;

      var data = response.data.data;
      var tableData = data && data.recordList ? data.recordList : [];
      tableData.map(function (record, k) {
        record.key = record[valueField];
        return record;
      });
      _this2.tableData = tableData;
      _this2.pageCount = data.pageCount || 0;
      _this2.currPageIndex = data.pageIndex || 0;
      _this2.totalElements = data.recordCount || 0;
    };

    _this2.loadTableData = function (param) {
      _this2.setState({
        showLoading: true
      });

      var _this = _assertThisInitialized(_this2);

      _this2.getTableData(param).then(function (response) {
        _this.launchTableData(response);

        _this.setState({
          showLoading: false
        });
      }).catch(function () {
        _this.launchTableData({});

        _this.setState({
          showLoading: false
        });
      });
    };

    _this2.searchFilterInfo = function (filterInfo) {
      var _this = _assertThisInitialized(_this2);

      var _this2$props2 = _this2.props,
          tableBodyUrl = _this2$props2.refModelUrl.tableBodyUrl,
          param = _this2$props2.param,
          jsonp = _this2$props2.jsonp,
          headers = _this2$props2.headers;
      _this2.filterInfo = filterInfo;

      _this2.setState({
        showLoading: true // tableIsSelecting: true

      }, function () {
        var pageSize = _this.pageSize;
        var paramWithFilter = Object.assign({}, param, {
          page: 0,
          pageSize: pageSize,
          content: '',
          'refClientPageInfo.currPageIndex': 0,
          'refClientPageInfo.pageSize': pageSize
        });

        if (Object.keys(filterInfo).length > 0) {
          paramWithFilter.content = JSON.stringify(filterInfo);
        }

        _this.loadTableData(paramWithFilter);
      });
    };

    _this2.handlePagination = function (index) {
      var _assertThisInitialize = _assertThisInitialized(_this2),
          filterInfo = _assertThisInitialize.filterInfo;

      var param = _this2.props.param;
      Object.keys(filterInfo).forEach(function (key) {
        if (!filterInfo[key]) {
          delete filterInfo[key];
        }
      });
      param.page = {
        "pageSize": _this2.pageSize,
        "pageIndex": index - 1
      };

      if (Object.keys(filterInfo) > 0) {
        param.content = JSON.stringify(filterInfo);
      }

      _this2.loadTableData(param);
    };

    _this2.dataNumSelect = function (index, pageSize) {
      var _assertThisInitialize2 = _assertThisInitialized(_this2),
          filterInfo = _assertThisInitialize2.filterInfo;

      var param = _this2.props.param;
      Object.keys(filterInfo).forEach(function (key) {
        if (!filterInfo[key]) {
          delete filterInfo[key];
        }
      });
      param.page = {
        "pageSize": pageSize,
        "pageIndex": _this2.currPageIndex - 1
      };

      if (Object.keys(filterInfo) > 0) {
        param.content = JSON.stringify(filterInfo);
      }

      _this2.pageSize = pageSize;

      _this2.loadTableData(param);
    };

    _this2.state = {
      showLoading: true,
      selectedDataLength: 0,
      mustRender: 0,
      showModal: true
    };
    _this2.checkedArray = [];
    _this2.checkedMap = {};
    _this2.inited = false;
    return _this2;
  }

  var _proto = Table.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.initComponent();
  };

  /** end:分页*/
  _proto.render = function render() {
    var showLoading = this.state.showLoading;
    var columnsData = this.columnsData,
        tableData = this.tableData,
        pageCount = this.pageCount,
        pageSize = this.pageSize,
        currPageIndex = this.currPageIndex,
        fliterFormInputs = this.fliterFormInputs,
        filterInfo = this.filterInfo,
        checkedArray = this.checkedArray,
        checkedMap = this.checkedMap;
    var dataNumSelect = this.dataNumSelect,
        handlePagination = this.handlePagination,
        searchFilterInfo = this.searchFilterInfo;
    var childrenProps = Object.assign(Object.assign({}, this.props), {
      showLoading: showLoading,
      columnsData: columnsData,
      tableData: tableData,
      pageCount: pageCount,
      pageSize: pageSize,
      currPageIndex: currPageIndex,
      fliterFormInputs: fliterFormInputs,
      filterInfo: filterInfo,
      dataNumSelect: dataNumSelect,
      handlePagination: handlePagination,
      searchFilterInfo: searchFilterInfo,
      emptyBut: true,
      valueField: 'id'
    });
    return React.createElement(RefMultipleTableBaseUI, childrenProps);
  };

  return Table;
}(Component), _temp)) || _class);
export default Table;