/**
 ** 2016-11-21 zhangmyh
 * 添加componentWillReceiveProps和componentDidUpdate事件处理，在viewmodel更新时，更新viewmodel监听
 * 这样改动主要为了在设置表格标题之后，刷新表格内容，并重新关联viewmodel，使columnSetting按钮可用
 */
import React from 'react';
import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table-2';
import { Checkbox, Pagination, Popover, Select, Button, Message, Notification, Icon } from 'antd';
import Row from './row';
import Col from './col';
import GridFilterModel from '../grid/GridFilterModel';
import CellModel from '../grid/CellModel';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { getPredicateValue } from '../../helpers/util'
import SvgIcon from 'SvgIcon';
import * as PopoverMap from '../../../../common/components/popover';

export default class FixedDataTableControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,//是否只读
      visible: false,
      pagination: { total: 0, current: 0, pageSize: 0 },
      sumData: [],//合计数据
      containers: props.containers,
      style: props.style,
      mergeCells: this.props.mergeCells || false,
      popFlag: false,
      titleList: [],
      showAction: [],
    };
    // showCheckBox 是否显示选择框  showRowNo 是否显示行号 showAggregates 是否显示合计小计 isRadio 是否单选 isPagination 是否分页
    this.GridProps = {
      showCheckBox: false, showRowNo: false, showAggregates: true, showSubtotal: false, isRadio: true, isPagination: false,
    };
    this.dataList = [];/*grid数据*/   this.columns = {};/*grid栏目数据*/  this.ColIndexs = {};/*key与number对照*/
    this.selectIndex = -1;/*选择行index*/ this.scrollCol = null; this.scrollRow = 0; this.CellStatus = [];//单元格是否编辑状态
    this.rowStatus = [];/*行状态*/ this.allSelect = false; this.isExpanded = false; /*是否可展开*/
    this.headerHeight = 40; this.actionState = {}; this.indeterminate = false; /*全选框选中但未全选样式*/
    this.CellState = [];/*单元格状态 disabled readnonly style*/  this.isColErro = [];
    this.CompositeLayout = []; this.action = {};/*操作列渲染数据*/ this.hasAction = false; this.hoverRow = 0; this.actionStyle = {};
    this.compositeControl = {};/*组合控件元数据存储*/  this.RowCol = {};/*记录RowColChange改变前数据*/
    this.sort = ""; this.showActionIndex = -1; this.sortColumn = '';
    this.rowheight = 40; this.scrollEndHeight = 0;
    this.mergeColContrast = {};
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    this.keydownHandler = addEventListener(document, 'keydown', this._handleKeyDown);
    this.mousedownHandler = addEventListener(document, 'mousedown', this._DocumentMouseDown);
    if (this.refs.fixedtable)
      this.fixedTable = this.refs.fixedtable;

  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
    this.keydownHandler.remove();
    this.keydownHandler = null;
    this.mousedownHandler.remove();
    this.mousedownHandler = null;
  }

  rowClassNameGetter = (index) => {
    if (this.rowStatus[index] && this.rowStatus[index].disabled && this.rowStatus[index].disabled != undefined) {
      return 'public_fixedDataTableRow_disabled';
    }
    if (this.rowStatus[index] && this.rowStatus[index].className && this.rowStatus[index].disabled != undefined) {
      return 'public_fixedDataTableRow_' + this.rowStatus[index].className;
    }
    // if (this.props.model && !this.GridProps.showCheckBox && !this.state.readOnly) {
    if (this.props.model) {
      let selectRows = this.props.model.getSelectedRowIndexes();
      for (var i = 0; i < selectRows.length; i++) {
        let rowIndex = selectRows[i];
        if (index === rowIndex)
          return 'public_fixedDataTableRow_CheckedRow';
      }
    }
    if (!this.isExpanded) {
      if (index === this.selectIndex)
        return 'public_fixedDataTableRow_selected';
      return;
    }
    if (index % 2 === 1)
      return 'public_fixedDataTableRow_expanded';
    if (index === this.selectIndex)
      return 'public_fixedDataTableRow_selected';
  }
  //鼠标点击事件
  _DocumentMouseDown = (e) => {
    let p1 = cb.dom(event.target).parents('.columnSetting');
    let p2 = cb.dom(event.target).parents('.ant-popover');
    if (p1.length == 0 && p2.length == 0 && this.state.popFlag) {
      this.setState({
        popFlag: false
      });
    }

  }
  //捕捉键盘事件
  _handleKeyDown = (e) => {
    let self = this;
    switch (e.keyCode) {
      case 13://回车
        self.switchCell();
    }
  }
  //切换编辑单元格状态
  switchCell = () => {
    if (this.state.readOnly) return;//只读状态
    if (this.selectIndex == -1) return;//未选中行
    let Status = this.CellStatus;//单元格编辑状态
    let data = { rowIndex: this.selectIndex, cellName: '' };
    Status.map(function (item) {
      for (var items in item) {
        if (items != 'GridRowNo') {
          if (item[items])
            data.cellName = items;
        }
      }
    });
    this.setCellEnter(data);
  }
  //-----------------------------------------------------------设置grid中columns，datasource等属性--------------------------------------------------------------------------------------------------
  setListenerState = (params) => {
    if (params.columnMode === 'local' && this.props.columns) {
      const columns = {};
      for (var attr in this.props.columns) {
        if (!params.columns[attr]) continue;
        const column = {};
        Object.assign(column, this.props.columns[attr], params.columns[attr]);
        columns[attr] = column;
      }
      params.columns = columns;
    }
    if (this.props.widthMode == 'percent') {
      let tableWidth = this.props.width || 1100;
      for (var key in params.columns) {
        let iColWidth = parseFloat(params.columns[key].iColWidth);
        let width = isNaN(iColWidth) ? 25 : iColWidth;
        width = tableWidth * width / 100;
        params.columns[key].iColWidth = width;
      }
    }

    let tmp_ColIndexs = {};
    let index = 0;

    /*cellState*/
    if (params.cellState) {
      this.cellState = params.cellState;
    }


    //栏目col与index对照
    var hasColumn = false;
    for (var attr in params.columns) {
      hasColumn = true;
      if (index === 0) {
        tmp_ColIndexs[attr] = 0;
      } else {
        tmp_ColIndexs[attr] = index;
      }
      index = index + 1;
    }
    if (params.pageInfo) {
      this.setPageInfo(params.pageInfo);
    }

    this.GridProps.showCheckBox = params.showCheckBox;//是否显示选择列
    this.GridProps.showRowNo = params.showRowNo;//是否显示行号
    this.GridProps.showAggregates = params.showAggregates;//是否显示合计
    this.GridProps.showSubtotal = params.showSubtotal;//是否显示小计
    this.GridProps.isRadio = !params.multiple;//是否单选
    this.GridProps.isPagination = params.pagination;//是否分页
    this.GridProps.showColumnSetting = params.showColumnSetting;//是否显示栏目设置
    this.GridProps.multiSort = params.multiSort;//是否显示表头排序
    this.ColIndexs = tmp_ColIndexs;//栏目与index对照

    if (hasColumn) {
      this.columns = params.columns;
      if (params.rows && params.rows.length > 0)
        this.dataList = params.rows;
      //初始化单元格状态
      this._InitCellStatus(params.columns, params.rows, params.mergeCells);
      this.readOnly = params.readOnly;
      let columnset = this.RemodelingColumn(params.rows, params.columns);
      this.setState({
        readOnly: params.readOnly,
        columnset,
        showColumnSetting: params.showColumnSetting,
        mergeCells: params.mergeCells
      });
    }
  }

  //初始化单元格状态
  _InitCellStatus = (Columns, DataSource, mergeCells) => {
    let self = this;
    /*初始化action列的渲染数据*/
    let action = this.props.action;
    if (action && action.cControlType && action.cControlType == 'Toolbar') {
      self.action = action;
      self.hasAction = true;
      let cStyle = action.cStyle;
      try {
        if (!cStyle || cStyle == '') {
          cStyle = {};
        } else {
          cStyle = JSON.parse(cStyle);
        }
      } catch (e) {
        cb.utils.alert('Toolbar cStyle，预制错误！', 'error');
      }
      this.fixedwidth = cStyle.fixedwidth;
    }
    // let containers = this.state.containers ? this.state.containers : [];
    let PopMeta = {};
    // containers.map(function (key) {
    //   if (key.cControlType == 'Toolbar') {/*操作列元数据*/
    //     self.action = key;
    //     self.hasAction = true;
    //   }
    //   if (key.cControlType == 'Pop') {/*组合控件元数据*/
    //     PopMeta[key.cGroupCode] = key;
    //   }
    // });
    if (DataSource !== undefined) {
      //设置初始单元格编辑状态/行选择初始状态/action状态/单元格状态 disabled/readOnly/style
      let temp_cellState = cb.utils.extend(true, [], this.cellState);
      let temp_isColErro = cb.utils.extend(true, [], this.isColErro);
      let temp_CellStatus = cb.utils.extend(true, [], this.CellStatus);
      let temp_rowStatus = cb.utils.extend(true, [], this.rowStatus);
      let temp_actionState = cb.utils.extend(true, {}, this.actionState);
      let temp_CompositeLayout = cb.utils.extend(true, [], this.CompositeLayout);//组合控件布局
      let temp_compositeControl = cb.utils.extend(true, [], this.compositeControl);//组合控件元数据
      let length = DataSource.length;
      if (length <= 0) return;
      for (let i = 0; i < length; i++) {
        if (!temp_CellStatus[i])
          temp_CellStatus[i] = {};
        DataSource[i]._selected = false;
        if (!temp_rowStatus[i])
          temp_rowStatus[i] = { disabled: false, visible: false };
        if (this.action && this.action.controls) {
          let actionList = this.action.controls;
          let _id = DataSource[i]._id;
          if (!temp_actionState[_id])
            temp_actionState[_id] = {};
          actionList.map(function (action) {
            if (!temp_actionState[_id][action.cItemName])
              temp_actionState[_id][action.cItemName] = { disabled: false, visible: true };
          });
        }
        if (!temp_cellState[i])
          temp_cellState[i] = {};
        if (!temp_isColErro[i])
          temp_isColErro[i] = {};
        if (!temp_CompositeLayout[i])
          temp_CompositeLayout[i] = {};
        if (!temp_compositeControl[i])
          temp_compositeControl[i] = {};
        for (var attr in Columns) {
          if (attr === 'CheckBox' || attr === 'GridRowNo') {
            temp_CellStatus[i][attr] = true;
          } else {
            if (!temp_CellStatus[i][attr])
              temp_CellStatus[i][attr] = false;
            if (!temp_cellState[i][attr])
              temp_cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {}, className: "" };
            if (!temp_isColErro[i][attr])
              temp_isColErro[i][attr] = false;
            if (Columns[attr].cControlType == 'composite') {
              temp_CompositeLayout[i][attr] = Columns[attr].cRefRetId;
              temp_compositeControl[i][attr] = PopMeta[attr];
            }
          }
        }
      }
      if (temp_actionState) this.actionState = temp_actionState;
      this.CellStatus = temp_CellStatus;
      this.rowStatus = temp_rowStatus;
      this.cellState = temp_cellState;
      this.isColErro = temp_isColErro;
      this.CompositeLayout = temp_CompositeLayout;
      this.compositeControl = temp_compositeControl;
      /*合并列 对照*/
      if (mergeCells || this.state.mergeCells)
        this.initMergeColContrast(DataSource, Columns);
    }
  }
  //----------------------------------------------接受viewmodeld参数-----------------------------------------------------------------------------------------------
  //接受来自model的column信息
  setColumns = (columndata) => {
    if (this.props.widthMode == 'percent') {
      let tableWidth = this.props.width || 1100;
      for (var key in columndata) {
        let iColWidth = parseFloat(columndata[key].iColWidth);
        let width = isNaN(iColWidth) ? 25 : iColWidth;
        width = tableWidth * width / 100;
        columndata[key].iColWidth = width;
      }
    }

    let columnset = this.RemodelingColumn(this.dataList, columndata);
    this.columns = columndata;
    let length = this.dataList.length;
    for (let i = 0; i < length; i++) {
      for (var attr in columndata) {
        if (!this.cellState[i][attr]) {
          this.cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {} };
        }
      }
    }
    this.setState({ columnset });
  }
  initMergeColContrast = (dataSource, columns) => {
    let mergeColContrast = {};
    for (var key in columns) {
      mergeColContrast[key] = [];
      dataSource.map(row => {
        mergeColContrast[key].push(0);
      });
    }
    this.mergeColContrast = mergeColContrast;
  }
  setMergeColContrast = (mergeColContrast) => {
    this.mergeColContrast = mergeColContrast;
  }
  setSum = (sumData) => {
    // if (sumData.length > 0)
    this.setState({
      sumData
    })
  }
  //接收来自model的data信息
  setDataSource = (data) => {
    this.selectIndex = -1;
    this.dataList = data;
    this.allSelect = false;
    this.indeterminate = false;
    //初始化单元格状态
    this._InitCellStatus(this.columns, data);
    let columnset = this.RemodelingColumn(data, this.columns);
    this.setState({ columnset });

    let selectRows = this.props.model.getSelectedRowIndexes();
    if (selectRows[0]) {
      this.scrollRow = selectRows[0];
    } else {
      this.scrollRow = 0;
      this.scrollEndHeight = 0;
      this.nowSetDataSource = true;
    }
  }

  //---------------------------------------------组织grid结构----------------------------------------------------------------------------------------------------------------
  //组织column结构
  RemodelingColumn = (dataList, columnState) => {
    let self = this, ret = [], columnData = [], actionAlign = '', Operation = {};

    let isGroup = false;/*是否多表头*/
    for (var attr in columnState) {
      if (columnState[attr].parent) {
        isGroup = true;
        break;
      }
    }
    if (isGroup) return this.RemodelingGroupColumn(dataList, columnState);

    const readOnly = this.readOnly;
    /*操作列*/
    if (readOnly === false) {
      columnState.Operation = { 'cItemName': 'Operation', 'iColWidth': 64, 'cControlType': 'Action' };
      if (this.fixedwidth) columnState.Operation.iColWidth = this.fixedwidth;
      columnData.push(columnState.Operation);
    }
    /*选择列*/
    if (this.GridProps.showCheckBox && this.props.tableTyep != 'rptTable') {
      if (!columnState.CheckBox)
        columnState.CheckBox = { 'cItemName': 'CheckBox', 'iColWidth': 45, 'cControlType': 'SelectCheckBox' };
      columnData.push(columnState.CheckBox);
    }
    /*行号*/
    if (this.GridProps.showRowNo) {
      if (!columnState.GridRowNo)
        columnState.GridRowNo = { 'cItemName': 'GridRowNo', 'iColWidth': 40, 'cControlType': 'Input' };
      columnData.push(columnState.GridRowNo);
    }
    // /*固定左位置的操作列*/
    // if (actionAlign == 'left') {
    //   columnState.Operation = Operation;
    //   columnData.push(columnState.Operation);
    // }
    for (var attr in columnState) {
      if (attr != 'CheckBox' && attr != 'GridRowNo' && attr != 'Operation')
        columnData.push(columnState[attr]);
    }
    // /*右位置的操作列*/
    // if (actionAlign == 'right') {
    //   Operation.bFixed = 0;
    //   columnState.Operation = Operation;
    //   columnData.push(columnState.Operation);
    // }
    // if (this.props.widthMode == 'percent') {
    //   let tableWidth = this.props.width || 1100;

    //   this.totalWidth = 0;
    //   columnData.map(function (col) {
    //     let column = self.setColumn(col.cItemName, col);
    //     let iColWidth = parseFloat(col.iColWidth);
    //     let width = isNaN(iColWidth) ? 25 : iColWidth;
    //     width = tableWidth * width / 100;
    //     col.iColWidth = width;
    //     this.totalWidth += width;
    //     ret.push(column);
    //   }, this);
    //   return ret;
    // } else {
    this.totalWidth = 0;
    columnData.map(function (col) {
      let column = self.setColumn(col.cItemName, col);
      let iColWidth = parseFloat(col.iColWidth);
      let width = isNaN(iColWidth) ? 150 : iColWidth;
      this.totalWidth += width;
      ret.push(column);
    }, this);
    return ret;
    // }
  }

  /*多表头*/
  RemodelingGroupColumn = (dataList, columnState) => {

    /*行号*/
    // columnState.GridRowNo = { 'cFieldName': 'GridRowNo', 'cItemName': 'GridRowNo', 'iColWidth': 30, 'cControlType': 'Input' };

    let cols = {};
    let columns = cb.utils.extend(true, {}, columnState);
    this.totalWidth = 0;
    for (var key in columns) {
      let item = columns[key];//栏目属性对象
      item.iColWidth = item.iColWidth ? parseFloat(item.iColWidth) : 150;
      if (!item.parent) {
        cols[item.cItemName] = item;
      } else {
        this.loopColumn(item.parent, cols, item);
      }
      this.totalWidth += item.iColWidth;
    }
    return this.restructureColumn(dataList, cols);
  }
  /*组织多表头栏目*/
  restructureColumn = (dataList, columns) => {
    let col = [];
    for (var key in columns) {
      let item = columns[key];//栏目属性对象
      if (item.children) {
        let children = this.loopChildren(item);
        let header = this.getGroupHeader(item);
        col.push(
          <ColumnGroup key={item.cFieldName} header={header}>
            {children}
          </ColumnGroup>
        );
      } else {
        let column = this.setColumn(item.cItemName, item);
        col.push(
          <ColumnGroup key={item.cFieldName} header={<Cell><div className='headerName' style={{ "height": this.headerHeight }}></div></Cell>}>
            {column}
          </ColumnGroup>
        )
      }
    }
    return col;
  }
  /*组织多表头显示组件*/
  getGroupHeader = (item) => {
    let header = [];
    header.push(
      <Row className="group-row" style={{ "height": 40 }}>
        <div className="group-col" style={{ "height": 40 }}>{item.cShowCaption}</div>
      </Row>
    )
    let headerRow = this.getHeaderRow(item.children);
    if (headerRow.length > 0) {
      let i = 1;
      headerRow.map(row => {
        header.push(
          <Row className="group-row" style={{ "height": 40 }}>{row}</Row>
        )
        i += 1;
      });
      this.groupHeaderHeight = i * 40;
    } else {
      this.groupHeaderHeight = 40;
    }
    let rowWidth = this.getGroupHeaderWidth(item.children);
    return <div className="table-group-header" style={{ "width": rowWidth }}>{header}</div>
  }
  /*组织多表头的行表头*/
  getHeaderRow = (children) => {
    let headerRows = [], headerRow = [];
    children.map(col => {
      if (col.children) {
        var width = this.getGroupHeaderWidth(col.children);
        col.iColWidth = width;
        headerRow.push(
          <div className="group-col" style={{ "height": 40, "width": width }}>{col.cShowCaption}</div>
        )
        if (col.children[0].children) {
          let newRow = this.getHeaderRow(col.children);
          headerRows[headerRows.length] = newRow;
        }
      }
    });
    if (headerRow.length > 0)
      headerRows[headerRows.length] = headerRow;
    return headerRows;
  }
  /*获取多表头宽度*/
  getGroupHeaderWidth = (item) => {
    var width = 0;
    item.map(col => {
      let w = this.loopHeader(col, width);
      width += w;
    });
    return width;
  }
  loopHeader = (item) => {
    let children = item.children;
    let width = 0;
    if (children) {
      children.map(col => {
        if (col.iColWidth) {
          width += col.iColWidth;
        } else {
          width += this.loopHeader(col);
        }
      });
    } else {
      width = item.iColWidth ? item.iColWidth : 150;
    }
    return width;
  }
  loopChildren = (item) => {
    let col = [];
    item.children.forEach(function (ele) {
      if (ele.children) {
        let children = this.loopChildren(ele);
        col = col.concat(children);
      } else {
        let column = this.setColumn(ele.cItemName, ele);
        col.push(column)
      }
    }, this);

    return col;
  }
  loopColumn = (data, cols, item, child) => {
    if (!data.parent) {
      if (!cols[data.cFieldName]) {
        cols[data.cFieldName] = data;
        cols[data.cFieldName].children = [];
      }
      if (child && child.parent) delete child.parent;
      let colsChild = cols[data.cFieldName].children;
      let existChild = false, existIndex = 0;
      colsChild.forEach(function (ele, index) {
        if (ele.cFieldName == item.cFieldName) {
          existIndex = index;
          existChild = true;
        }
      }, this);

      if (existChild) {
        cols[data.cFieldName].children[existIndex].children.push(child);
      } else {
        if (child) {
          item.children = [child];
        }
        if (item.parent) delete item.parent;
        cols[data.cFieldName].children.push(item);
      }
    } else {
      this.loopColumn(data.parent, cols, data, item);
    }
  }


  //设置column
  setColumn = (attr, col) => {
    let controlType = col.cControlType;
    var iColWidth = parseFloat(col.iColWidth);
    let width = isNaN(iColWidth) ? 150 : iColWidth;
    var name = col.cShowCaption;
    let headerCell, headerClassName = '';
    let fiexd = col.bFixed == 1 ? true : false;
    let align = '';
    if (col.iAlign === 1) {
      align = 'left';
    } else if (col.iAlign === 2) {
      align = 'center';
    } else {
      align = 'right';
    }
    if (attr === 'CheckBox') {
      if (!this.GridProps.isRadio) {
        let model = this.props.model.getEditRowModel().get(attr);
        headerCell = (
          <Cell>
            <div className='checkboxHD'>
              <Checkbox indeterminate={this.indeterminate} checked={this.allSelect} onChange={(e, i) => this.SelectChange(e, -1)}></Checkbox>
            </div>
          </Cell>
        );
      }
      fiexd = true, align = 'center';
    } else if (attr === 'GridRowNo') {
      fiexd = true, align = 'center';
      headerCell = (<Cell><div className='headerName line-number' style={{ "height": this.headerHeight }}></div></Cell>);
      // } else if (controlType == 'money') {
      //   width = 175, align = 'left', this.headerHeight = 60;
      //   headerCell = (
      //     <Cell>
      //       <Row className={"CredentialsHeader"}>
      //         <ul className={"CredentialsTitle"}>{name}</ul>
      //         <ul className={"CredentialsMoney"}>
      //           <li className={"firstCol"}>亿</li>
      //           <li>千</li>
      //           <li>百</li>
      //           <li className={"lineBlue"}>十</li>
      //           <li>万</li>
      //           <li>千</li>
      //           <li className={"lineBlue"}>百</li>
      //           <li>十</li>
      //           <li>元</li>
      //           <li className={"lineRed"}>角</li>
      //           <li>分</li>
      //         </ul>
      //       </Row>
      //     </Cell>
      //   );
    } else if (attr === 'Operation') {
      headerCell = (<Cell><div className='headerName' style={{ "height": this.headerHeight }}></div></Cell>);
      return (<Column key={attr}
        allowCellsRecycling columnKey={attr} isResizable={true}
        header={headerCell} cell={(rowIndex) => this.setCell(rowIndex, col)}
        width={width} align="center" fixedRight={true} footer={this._setFooter} />);
    } else {
      if (!col.bCanModify && !this.readOnly) {
        headerClassName = 'public_fixedDataTableCell_disabled';
      } else {
        headerClassName = 'headerName';
      }
      let fixedtable = this.refs.fixedtable;
      headerCell = (
        <Cell className={headerClassName}>
          <GridFilterModel fixedtable={fixedtable} multiSort={this.GridProps.multiSort} tableClass={this.props.tableClass} readOnly={this.readOnly} Column={col} name={name} model={this.props.model} width={width} visible={false} attr={attr} data={this.dataList} onSortChange={this.onSortChange} sortColumn={this.sortColumn} />
        </Cell>
      )
    }
    return (<Column key={attr}
      allowCellsRecycling columnKey={attr} isResizable={true}
      header={headerCell} cell={(rowIndex) => this.setCell(rowIndex, col)}
      width={width} align={align} fixed={fiexd} footer={this._setFooter} />);
    // footer={this._setFooter}
  }
  onSortChange = (key) => {
    this.sortColumn = key;
  }
  setCell = (rowIndex, col) => {
    let isColErro = this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] ? this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] : false;
    if (this.state.style && this.state.style.height) {
      this.rowheight = this.state.style.height;
    }
    return (<CellModel
      dataList={this.dataList} readOnly={this.readOnly} selectIndex={this.selectIndex} rowStatus={this.rowStatus} CellStatus={this.CellStatus} RowProperty={rowIndex} selectAllState={this._selectAllState} ColIndexs={this.ColIndexs} mergeColContrast={this.mergeColContrast}
      action={this.action} actionState={this.actionState} selectAll={this.allSelect} indeterminate={this.indeterminate} cellState={this.cellState} isColErro={isColErro} Column={col} model={this.props.model} GridProps={this.GridProps} onCellClick={this._onCellClick} triggerRender={this._triggerRender} columnsList={this.columns} CompositeLayout={this.CompositeLayout} rowHeight={this.props.rowHeight || 50} compositeControl={this.compositeControl} setCellBlur={this.setCellBlur}
      setMergeColContrast={this.setMergeColContrast} mergeCells={this.state.mergeCells} showAction={this.state.showAction[rowIndex.rowIndex]}
      rowHeight={this.rowheight} showActionIndex={this.showActionIndex} ActionClick={this.ActionClick}
    />);
  }
  _triggerRender = () => {
    var columnset = this.RemodelingColumn(this.dataList, this.columns);
    this.setState({ columnset });
  }

  //------------
  _selectAllState = (selectAll, indeterminate) => {
    this.allSelect = selectAll;
    this.indeterminate = indeterminate;
    this._triggerRender();
  }
  //监听全选
  SelectChange = (e, index) => {
    if (!e.target.checked) {
      this.props.model.unselectAll();
    } else {
      this.props.model.selectAll();
    }
  }

  //列宽改变拖动函数
  _onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    // if (newColumnWidth < 40) return
    if (!this.columns[columnKey]) return
    this.columns[columnKey].iColWidth = newColumnWidth;
    let columnset = this.RemodelingColumn(this.dataList, this.columns);
    this.setState({ columnset });
  }

  //行单击事件
  _onRowClick = (e, index) => {
    if (this.dataList.length == 0 || !this.dataList[index]) return;
    if (!this.GridProps.showCheckBox)
      this.props.model.select(index);
    this.props.model.setFocusedRowIndex(index);
  }

  //单元格单击事件
  _onCellClick = (e, index, columnKey) => {
    this._isRowColChange({ rowIndex: index, columnKey: columnKey, column: this.columns[columnKey] }, () => {
      let ColIndex = this.ColIndexs[columnKey];
      let data = { index: index, columnKey: columnKey };
      if (!this.props.model.execute('onEdit', data)) return;
      let column = this.columns[columnKey];
      if (column.cControlType == 'switchlabel') {
        this.props.model.setFocusedRowIndex(index);
      }
      if (this.CellStatus[index] !== undefined) {
        this.CellStatus[index][columnKey] = true;
        this.scrollCol = ColIndex + 2;
        this._triggerRender();
      }
    });
  }
  //判断是否row col change事件
  _isRowColChange = (value, callback) => {
    let oldValue = this.RowCol;
    if (oldValue.rowIndex != value.rowIndex || oldValue.columnKey != value.columnKey) {
      this.props.model.promiseExecute('rowColChange', { value: value, oldValue: oldValue }, function () {
        oldValue.rowIndex = value.rowIndex;
        oldValue.columnKey = value.columnKey;
        callback();
      });
    } else {
      callback();
    }
  }
  //单元格数据改变事件
  setCellValue = (data) => {
    this.dataList[data.rowIndex][data.cellName] = data.value;
    let columnset = this.RemodelingColumn(this.dataList, this.columns);
    this.setState({ columnset });
  }

  //双击事件
  _onRowDoubleClick = (e, index) => {
    let dataArry = this.dataList;
    let rowData = dataArry[index];
    this.props.model.fireEvent('dblClick', rowData);
  }

  setCellBlur = (data) => {
    this.CellStatus[data.rowIndex][data.cellName] = false;
    if (this._triggerRender)
      this._triggerRender();
  }

  setCellEnter = (data) => {
    let keyIndex = this.ColIndexs[data.cellName];
    let column = this.columns;
    this.CellStatus[data.rowIndex][data.cellName] = false;
    let i = 1, columnKey;
    for (var attr in this.ColIndexs) {
      if (this.ColIndexs[attr] === keyIndex + i) {
        if (column[attr].bCanModify) {
          columnKey = attr;
          // this.CellStatus[data.rowIndex][attr] = true;
        } else {
          i = i + 1;
        }
      }
    }
    if (!columnKey) return;
    /*回车切换 走rowcolchange判断*/
    this._isRowColChange({ rowIndex: data.rowIndex, columnKey: columnKey }, () => {
      this.CellStatus[data.rowIndex][attr] = true;
      this.scrollCol = keyIndex + i + 2;
      this._triggerRender();
    });
  }

  //-------------------------------------------------------------------viewmodel返调用方法------------------------------------------------------------------------------
  select = (indexes) => {
    for (var i = 0; i < this.dataList.length; i++) {
      this.dataList[i]._selected = false;
    }
    for (var attr in indexes) {
      this.dataList[indexes[attr]]._selected = true;
    }
    this.selectIndex = indexes[0] * 1;
    this.scrollRow = indexes[0];
    this.updateindeterminate();
  }

  unselect = (indexes) => {
    for (var attr in indexes) {
      this.dataList[indexes[attr]]._selected = false;
    }
    this.updateindeterminate();
  }
  selectAll = () => {
    this.dataList.map((item, index) => {
      this.dataList[index]._selected = true;
    });
    this.allSelect = true;
    this.indeterminate = false;
    this._triggerRender();
  }
  unselectAll = () => {
    this.dataList.map((item, index) => {
      this.dataList[index]._selected = false;
    });
    this.allSelect = false;
    this.indeterminate = false;
    this._triggerRender();
  }
  updateindeterminate = () => {
    let data = this.dataList;
    let j = 0, indexes = [], selectAll = false, indeterminate = false;
    data.forEach((item, index) => {
      if (!item._selected) return;
      indexes.push(index);
      j++;
    });
    if (j == 0) {
      selectAll = false;
      indeterminate = false;
    } else if (j > 0 && j < data.length) {
      selectAll = false;
      indeterminate = true;
    } else if (j == data.length) {
      selectAll = true;
      indeterminate = false;
    }
    this._selectAllState(selectAll, indeterminate);
  }
  //model调用  set行状态
  setRowState = (data) => {
    // if (data.propertyName == 'disabled')
    this.rowStatus[data.rowIndex][data.propertyName] = data.value;
    this._triggerRender();
  }
  //model调用  set action列状态
  setActionState = (data) => {
    let row = this.dataList[data.rowIndex];
    let actionState = this.actionState;
    actionState[row._id][data.itemName][data.name] = data.value;
    this._triggerRender();
  }
  setActionsState = (data) => {
    this.dataList.map((row, index) => {
      this.actionState[row._id] = data[index];
    })
    this._triggerRender();
  }
  setReadOnly(value) {
    this.readOnly = value;
    var columnset = this.RemodelingColumn(this.dataList, this.columns);
    this.setState({ readOnly: value, columnset });
  }
  //model调用  set 组合控件的显示布局
  setCompositeLayout = (data) => {
    this.CompositeLayout[data.rowIndex][data.itemName] = data.value;
    this._triggerRender();
  }
  //model调用  set 组合控件的显示布局
  setCompositeMeta = (data) => {
    this.compositeControl[data.rowIndex][data.itemName] = data.value;
    this._triggerRender();
  }
  //model调用  set单元格状态
  setCellState = (data) => {
    let state = this.cellState;
    if (state[data.rowIndex][data.cellName]) {
      if (state[data.rowIndex][data.cellName][data.propertyName] == data.value) return;
      state[data.rowIndex][data.cellName][data.propertyName] = data.value;
      this._triggerRender();
    }
    //index cellName name value  oldvalue
  }
  setCellStates = (data) => {
    let state = this.cellState;
    data.map(row => {
      if (state[row.rowIndex][row.cellName]) {
        if (state[row.rowIndex][row.cellName][row.propertyName] == row.value) return;
        state[row.rowIndex][row.cellName][row.propertyName] = row.value;
      }
    });
    this._triggerRender();
    //index cellName name value  oldvalue
  }
  //--------------------------------------------------------------------------grid按钮事件------------------------------------------------------------------------------------------------
  //更新行
  updateRow = (data) => {
    if (data.index.length) {
      data.index.forEach((rowIndex, index) => {
        this.dataList[rowIndex] = data.row[index];
      });
    } else {
      this.dataList[data.index] = data.row;
    }
    this._triggerRender();
  }

  //增行
  insertRow = (data) => {
    this.dataList.splice(data.index, 0, data.row);
    //设置新增行单元格初始状态
    this._InitCellStatus(this.columns, this.dataList);
    this.scrollRow = this.dataList.length - 1;
    // this._triggerRender();
    this.props.model.select(data.index);
  }
  //批量增行/插行
  insertRows = (data) => {
    if (this.dataList.length == 0) {
      this.setDataSource(data.rows);
    } else {
      for (var i = 0; i < data.rows.length; i++) {
        this.dataList.splice(data.index + i, 0, data.rows[i])
      }
      this._InitCellStatus(this.columns, this.dataList);
      // this._triggerRender();
      this.props.model.select(data.index + data.rows.length - 1);
    }
  }
  batchInsertRow = (data) => {
    data.forEach(item => {
      const { rowIndex, rowData } = item;
      this.dataList.splice(rowIndex, 0, rowData);
    });
    this._InitCellStatus(this.columns, this.dataList);
    this._triggerRender();
  }
  //删行
  deleteRows = (indexes) => {
    indexes.map(index => {
      this.rowStatus.splice(index, 1);
    });
    this._triggerRender();
  }
  validate = (val) => {
    if (val.type == 'error') {
      if (val.data) {
        let isColErro = this.isColErro;
        isColErro.map(function (item) {
          for (var key in item) {
            item[key] = false;
          }
        });
        val.data.map(function (item) {
          if (isColErro[item.rowIndex][item.cellName] != undefined && isColErro[item.rowIndex][item.cellName] != 'undefined')
            isColErro[item.rowIndex][item.cellName] = true;
          // Message.error('表体存在必输项，请输入完整在尝试保存！');
          // cb.utils.alert('表体存在必输项，请输入完整在尝试保存！', 'error');
        });
        this._triggerRender();
        cb.utils.alert('表体存在必输项，请输入完整再尝试保存！', 'error');
      } else {
        cb.utils.alert('表体数据为空！不允许保存！', 'error');
      }
    } else {
      let colErr = {};
      for (var key in this.columns) {
        colErr[key] = false;
      }
      for (var i = 0; i < this.isColErro.length; i++) {
        this.isColErro[i] = colErr;
      }
    }
  }
  //---------------------------------------------------------------------------------分页相关-----------------------------------------------------------------------------------
  //设置分页
  setPageInfo = (paginationlist) => {
    if (paginationlist.pageSize === -1)
      this.GridProps.isPagination = false;
    var pageinfo = this.state.pagination;
    pageinfo.total = paginationlist.recordCount
    pageinfo.current = paginationlist.pageIndex;
    pageinfo.pageSize = paginationlist.pageSize;
    this.setState({
      pagination: pageinfo
    });
  }

  //分页改变事件
  _PaginChange = (page) => {
    if (this.props.model)
      this.props.model.setPageIndex(page);
    this.scrollRow = 0;
    this.scrollEndHeight = 0;
  }
  /*页大小改变*/
  onShowSizeChange = (current, size) => {
    if (this.props.model)
      this.props.model.setPageSize(size);
    this.scrollRow = 0;
    this.scrollEndHeight = 0;
  }

  _setFooter = (cellProps) => {
    let column = this.columns;
    if (this.GridProps.showAggregates && this.GridProps.showSubtotal) {
      if (this.GridProps.showCheckBox) {
        if (cellProps.columnKey === 'CheckBox') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 小计</div>
              <div className='public_fixedDataTableCell_cellContent'> 合计</div>
            </div>
          )
        }
      } else if (this.GridProps.showRowNo) {
        if (cellProps.columnKey === 'GridRowNo') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 小计</div>
              <div className='public_fixedDataTableCell_cellContent'> 合计</div>
            </div>
          )
        }
      } else if (this.ColIndexs[cellProps.columnKey] === 0) {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'> 小计</div>
            <div className='public_fixedDataTableCell_cellContent'> 合计</div>
          </div>
        )
      }
      if (column[cellProps.columnKey].bNeedSum) {
        let data = this.dataList;
        let sum = 0;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            sum = sum + data[i][cellProps.columnKey];
          }
        }
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'> {sum}</div>
            <div className='public_fixedDataTableCell_cellContent'> 999999</div>
          </div>
        )
      }
    } else if (this.GridProps.showAggregates || this.GridProps.showAggregates == 'local') {
      if (this.GridProps.showCheckBox) {
        if (cellProps.columnKey === 'CheckBox') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 合计</div>
            </div>
          )
        }
      } else if (this.GridProps.showRowNo) {
        if (cellProps.columnKey === 'GridRowNo') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 合计</div>
            </div>
          )
        }
      } else if (this.ColIndexs[cellProps.columnKey] === 0) {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'> 合计</div>
          </div>
        )
      }
      if (cellProps.columnKey == 'Setting') {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'></div>
          </div>
        )
      }
      let sumData = this.state.sumData;
      if (sumData.length > 0) {
        let data = this.dataList;
        let sum = 0;
        for (var key in sumData[0]) {
          if (key === cellProps.columnKey) {
            sum = this._getDecimal(this.columns[key], sumData[0][key]);
            return (
              <Cell>
                <div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" >
                  {sum}
                </div>
              </Cell>
            )
          }
        }
      } else {
        if (this.GridProps.showAggregates == 'local') {
          if (column[cellProps.columnKey].bNeedSum) {
            let data = this.dataList;
            let sum = 0;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let val = data[i][cellProps.columnKey];
                val = val ? val : 0;
                sum = sum + val;
              }
            }
            sum = this._getDecimal(this.columns[cellProps.columnKey], sum);
            return (
              <Cell>
                <div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" >
                  {sum}
                </div>
              </Cell>
            )
          }
        } else {
          return (
            <Cell><div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" ></div></Cell>
          )
        }
      }
    } else if (this.GridProps.showSubtotal) {
      if (cellProps.columnKey == 'Setting') {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'></div>
          </div>
        )
      }
      if (this.GridProps.showCheckBox) {
        if (cellProps.columnKey === 'CheckBox') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 小计</div>
            </div>
          )
        }
      } else if (this.GridProps.showRowNo) {
        if (cellProps.columnKey === 'GridRowNo') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 小计</div>
            </div>
          )
        }
      } else if (this.ColIndexs[cellProps.columnKey] === 0) {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'> 小计</div>
          </div>
        )
      }
      if (column[cellProps.columnKey].bNeedSum) {
        let data = this.dataList;
        let sum = 0;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            let val = data[i][cellProps.columnKey];
            val = val ? val : 0;
            sum = sum + val;
          }
        }
        sum = this._getDecimal(column[cellProps.columnKey], sum);
        return (
          <Cell>
            <div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" >
              {sum}
            </div>
          </Cell>
        )
      }
    }
  }
  _getDecimal = (col, sum) => {
    let NumPoint = col.iNumPoint;
    /*谓词变量支持系统参数*/
    let cFormatData = col.cFormatData;
    try {
      if (!cFormatData || cFormatData == '') {
        cFormatData = {};
      } else {
        cFormatData = JSON.parse(cFormatData);
      }
    } catch (e) {
      console.error('数量/金额/单价，预制错误！');
    }
    let decimal = cFormatData.decimal ? getPredicateValue(cFormatData.decimal) : null;
    let controlType = col.cControlType ? col.cControlType.trim().toLocaleLowerCase() : '';
    if (controlType === 'money') {
      if (decimal)
        NumPoint = decimal;
      else
        NumPoint = cb.rest.AppContext.option.amountofdecimal;
    } else if (controlType === 'price') {
      if (decimal)
        NumPoint = decimal;
      else
        NumPoint = cb.rest.AppContext.option.monovalentdecimal;
    } else if (controlType === 'inputnumber') {
      if (decimal)
        NumPoint = decimal;
      else
        if (!NumPoint || NumPoint == '') NumPoint = 0;

    } else {
      NumPoint = null;
    }
    if (!isNaN(sum) && NumPoint) {
      sum = Number(sum);
      sum = sum.toFixed(NumPoint);
    }
    return sum;
  }
  /*pageSize改变事件*/
  _pageSizeChange = (value) => {
    this.props.model.setPageSize(value * 1);
    this.scrollRow = 0;
    this.scrollEndHeight = 0;
  }
  setPage = (pagination, isPage) => {
    if (isPage && pagination.total !== 0) {
      let sumData = this.state.sumData;
      let columns = this.columns;
      let showSums = [];
      if (sumData.length > 0) {
        for (var key in sumData[0]) {
          if (!columns[key]) continue;
          if (sumData[0][key] == 0) continue;
          showSums.push(
            <Col span={1} style={{ fontSize: '18px' }}>
              {columns[key].cCaption}：{sumData[0][key]}
            </Col>
          )
          if (showSums.length > 2) {
            break;
          }
        }
      }
      let selectOptions = [{ "value": 10, "text": 10 }, { "value": 20, "text": 20 }, { "value": 30, "text": 30 }, { "value": 40, "text": 40 }, { "value": 50, "text": 50 }];
      let selectOptionsControl = selectOptions.map((item, index) => {
        return <Select.Option key={item.value} text={item.text}>{item.text}</Select.Option>
      });
      // let pageCount = Math.ceil(pagination.total / pagination.pageSize);
      // if (pageCount == 1) return ''
      return (
        <div className='pagination-new'>
          <Pagination showQuickJumper showSizeChanger pageSizeOptions={['10', '20', '30', '50', '80', '100', '65536']} showTotal={total => `共${total}条`} size="small" total={pagination.total} current={pagination.current} pageSize={pagination.pageSize} onShowSizeChange={this.onShowSizeChange} onChange={this._PaginChange} />
          {/* <span>共<i>{pageCount}</i>页</span> */}
        </div>
      );
    }
  }
  //栏目设置————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  columnSetting = () => {
    // this.props.model.getTitleData(this.props.code);
    this.setState({
      popFlag: !this.state.popFlag
    })
    this.props.model.columnSetting(this.props.code);
  }
  onMouseEnter = (e, index) => {
    let titleList = this.state.titleList;
    titleList[index].bShowPop = true;
    this.setState({
      titleList
    });
  }
  onMouseLeave = (e, index) => {
    let titleList = this.state.titleList;
    titleList.forEach(function (ele, i) {
      ele.bShowPop = false;
    });
    this.sort = "";
    this.setState({
      titleList
    });
  }
  //排序
  sortClick = (type, index) => {
    let titleList = this.state.titleList;
    if (type == 'up' && index == 0) return;
    if (type == 'down' && index == titleList.length - 1) return;
    if (titleList[index] && titleList[index].bJointQuery) {
      cb.utils.alert('关键字段不允许移动！', 'warning');
      return
    }
    let pre = cb.utils.extend(true, {}, titleList[index - 1]);
    let next = cb.utils.extend(true, {}, titleList[index + 1]);
    let now = cb.utils.extend(true, {}, titleList[index]);
    let preOrder = pre.iOrder;
    let nextOrder = next.iOrder;
    let nowOrder = now.iOrder;
    if (type == 'up') {
      this.sort = "up";
      // let preOrder = now.iOrder - 1;
      // if (!pre.iOrder) return;
      // if (pre.iOrder == preOrder) {
      //   pre.iOrder = preOrder + 1;
      // } else {
      //   titleList.forEach(function (ele) {
      //     if (preOrder == ele.iOrder) {
      //       ele.iOrder = preOrder + 1;
      //       return;
      //     }
      //   });
      // }
      // now.iOrder = preOrder;
      titleList[index] = pre;
      titleList[index].iOrder = nowOrder;
      titleList[index - 1] = now;
      titleList[index - 1].iOrder = preOrder;
    } else {
      this.sort = "down";
      // let nextOrder = now.iOrder + 1;
      // if (!next.iOrder) return;
      // if (next.iOrder == nextOrder) {
      //   next.iOrder = nextOrder - 1;
      // } else {
      //   titleList.forEach(function (ele) {
      //     if (nextOrder == ele.iOrder) {
      //       ele.iOrder = nextOrder - 1;
      //       return;
      //     }
      //   });
      // }
      // now.iOrder == nextOrder;
      titleList[index] = next;
      titleList[index].iOrder = nowOrder;
      titleList[index + 1] = now;
      titleList[index + 1].iOrder = nextOrder;
    }
    this.setState({
      titleList
    });
  }
  setTitle = (titleList) => {
    this.setState({
      titleList
    });
  }
  setColumnByTtile = (columns) => {
    this.columns = columns;
    let columnset = this.RemodelingColumn(this.dataList, columns);
    this.setState({ columnset });
  }
  getSettingContent = () => {
    let titleList = this.state.titleList;
    let titileItem = [];
    titleList.forEach(function (element, index) {
      let item;
      let bShowPop = element.bShowPop ? element.bShowPop : false;
      if (!element.bHidden) {
        let showIt = false;
        if (element.bShowIt == 1) {
          showIt = true;
        }
        item = (
          bShowPop ?
            <Row style={{ minHeight: "25px" }} onMouseEnter={(e) => this.onMouseEnter(e, index)} onMouseLeave={(e) => this.onMouseLeave(e, index)}>
              <div className='pull-left' title={element.cShowCaption}>
                <Checkbox checked={showIt} onChange={(e) => this.onChecked(e, element, index)}>{element.cShowCaption}</Checkbox>
              </div>
              <div className='pull-right'>
                <Button style={{ borderWidth: 0 }} icon="arrow-up" onClick={() => this.sortClick('up', index)}></Button>
                <Button style={{ borderWidth: 0 }} icon="arrow-down" onClick={() => this.sortClick('down', index)}></Button>
              </div>
            </Row>
            :
            <Row colCount={2} style={{ minHeight: "25px" }} onMouseEnter={(e) => this.onMouseEnter(e, index)} onMouseLeave={(e) => this.onMouseLeave(e, index)}>
              <div className='pull-left'>
                <Checkbox checked={showIt} onChange={(e) => this.onChecked(e, element, index)}>{element.cShowCaption}</Checkbox>
              </div>
              <div className='pull-right'></div>
            </Row>
        )
        titileItem.push(item);
      }
    }, this);
    let buttonClass = 'filter-btn-fixed';

    let settingContent = (
      <div className={buttonClass} style={{ overflow: "auto", height: "250px" }}>
        <div className='filter-txt'>{titileItem}</div>
        <div className='filter-btn-1'>
          <Button type={"primary"} size="small" onClick={() => this.buttonClick('save')}>保存</Button>
          <Button type={"default"} size="small" onClick={() => this.buttonClick('cancel')}>取消</Button>
        </div>
      </div>
    );
    return settingContent;
  }
  onChecked = (e, element, index) => {
    let checked = e.target.checked;
    let id = element.id;
    let titleList = this.state.titleList;
    let showTitleLen = this.getShowTitleLen(titleList);
    if (showTitleLen < 2 && !checked) {
      cb.utils.alert('至少保留一个显示列！', 'warning');
      return
    }
    if (titleList[index].bJointQuery) {
      cb.utils.alert('关联字段不允许修改！', 'warning');
      return
    }
    if (checked) {
      titleList[index].bShowIt = 1;
    } else {
      titleList[index].bShowIt = 0;
    }

    this.setState({
      titleList
    });
  }
  getShowTitleLen = (titleList) => {
    let len = 0;
    titleList.map(item => {
      if (item.bShowIt == 1)
        len = len + 1;
    })
    return len;
  }
  buttonClick = (type) => {
    if (type == 'save') {
      let newTitleList = [];
      this.state.titleList.map(title => {
        delete title.cFieldName;
        newTitleList.push(title);
      });
      this.props.model.setTitleData(newTitleList);
    }
    this.setState({
      popFlag: false
    });
  }
  onRowMouseEnter = (e, index) => {
    if (!this.action.controls) return
    if (this.fixedTable && this.fixedTable.state && this.fixedTable.state.isColumnResizing) return;
    this.selectIndex = index;
    this.mouseEnterClass = e.target.className;
    let showAction = this.state.showAction;
    this.showActionIndex = index;
    showAction[index] = true;
    this.scrollRow = index;
    this.setState({
      showAction
    });
  }
  onRowMouseLeave = (e, index) => {
    if (!this.action.controls) return
    if (this.fixedTable && this.fixedTable.state && this.fixedTable.state.isColumnResizing) return;
    const actionParent = new cb.dom(e.relatedTarget).parents('.acticonCell');
    const actionParent1 = new cb.dom(e.relatedTarget).parents('.ant-popover');
    if (actionParent.length || actionParent1.length) return;
    this.selectIndex = -1;
    this.showActionIndex = -1;
    let showAction = this.state.showAction;
    showAction[index] = false;
    this.setState({
      showAction
    });
  }
  getColumnSetting = () => {
    let hasSetting = this.state.showColumnSetting;
    if (hasSetting) {
      let settingContent = this.getSettingContent();
      let popFlag = this.state.popFlag;
      return (
        <div className="columnSetting" >
          <Popover overlayStyle={{ width: "200px" }} placement={"bottomRight"} content={settingContent} trigger={"click"} visible={popFlag} >
            <Button className="SettingBtn" type={"ghost"} size="small" icon='ellipsis' onClick={() => this.columnSetting()}></Button>
          </Popover>
        </div>
      );
    } else {
      return ''
    }
  }
  /*悬浮的action*/
  getActionControl = () => {
    if (!this.state.readOnly) return;/*编辑态不显示*/
    if (this.isScrolling) return;/*滚动时不显示*/
    if (this.props.noBrowseAction) return;/*浏览态不显示*/
    // if(!this.dataList[this.showActionIndex]) return;/*无数据时 不渲染*/

    let actionList = this.action.controls;
    let actionState = this.actionState;
    let actionControl = [], rowheight = this.rowheight;;
    let actionStyle = { "display": "none", "height": rowheight - 1 };
    let rowStyle = { "display": "flex", "alignItems": "center", "height": rowheight - 1 };
    let _id = this.dataList[this.showActionIndex] ? this.dataList[this.showActionIndex]._id : 0;
    if (actionList && actionList.length > 0) {
      if (this.state.showAction && this.state.showAction[this.showActionIndex]) {
        actionStyle.display = "block";
        let headerHeight = (this.headerHeight || 40);
        let initialTop = headerHeight + 8 + (rowheight - 40) / 2;
        actionStyle.top = initialTop + this.showActionIndex * rowheight - this.scrollEndHeight;
        if (actionStyle.top <= initialTop) {
          this.offsetType = 'top';
          this.offsetY = initialTop - actionStyle.top;
          this.scrollEndHeight = this.scrollEndHeight - this.offsetY;
          actionStyle.top = initialTop;
        } else if (actionStyle.top >= this.bodyHeight) {
          this.offsetType = 'end';
          this.offsetY = actionStyle.top - this.bodyHeight - (initialTop - headerHeight);
          if (this.offsetY > 0) {
            this.scrollEndHeight = this.scrollEndHeight + this.offsetY;
            actionStyle.top = this.bodyHeight + 8 - (rowheight - 40) / 2;
          } else {
            actionStyle.top = this.bodyHeight + 8 - (rowheight - 40) / 2 + this.offsetY;
          }
        }
        actionStyle.top = actionStyle.top - (rowheight - 26) / 2;
      }
      actionList.map(function (action) {
        const icon = action.iStyle === 1 ? null : '#icon-' + action.icon;
        const text = action.iStyle === 2 ? null : action.cShowCaption;

        if (actionState[_id] && actionState[_id][action.cItemName].visible) {
          if (action.cControlType != 'popbutton') {
            const extraProps = {};
            if (!action.popoverKey)
              extraProps.onClick = (e) => this.ActionClick(e, action);
            let temp_action = (
              <span key={action.cItemName}>
                <a className="table-list-btn" {...extraProps}>{text}</a>
              </span>
            );
            if (action.popoverKey) {
              const ComName = PopoverMap[action.popoverKey];
              if (ComName)
                temp_action = (
                  <ComName model={action.model} data={this.dataList[this.showActionIndex]}>
                    {temp_action}
                  </ComName>
                );
            }
            actionControl.push(temp_action);
          } else {
            const currentRow = this.dataList[this.showActionIndex];
            if (!currentRow) return;
            // actionControl.push(<CssProgress id={currentRow.id} text={text} cItemName={action.cItemName} icon={icon} />);
          }
        }
      }, this);
      let actionCellName = "acticonCell";
      if (this.props.model) {
        let selectRows = this.props.model.getSelectedRowIndexes();
        for (var i = 0; i < selectRows.length; i++) {
          let rowIndex = selectRows[i];
          if (this.selectIndex === rowIndex)
            actionCellName = actionCellName + ' actionCellSelect';
        }
      }
      return (
        <div className={actionCellName} style={actionStyle}>
          <Row style={rowStyle}>{actionControl}</Row>
        </div>
      );
      // return '';
    }
  }
  ActionClick = (e, action) => {
    /*表单 报表设计器 行按钮*/
    if (this.props.noViewModel == true && this.props.onActionClick) {
      this.props.onActionClick(this.showActionIndex, action);
      return
    }
    if (this.actionClickTime) {
      let nowTime = new Date().valueOf();
      if (nowTime - this.actionClickTime < 1000) return;
      this.actionClickTime = nowTime;
    } else {
      this.actionClickTime = new Date().valueOf();
    }
    this.props.model.setFocusedRowIndex(this.showActionIndex);
    let viewModel = this.props.model.getParent();
    while (viewModel.getParent())
      viewModel = viewModel.getParent();
    let params = { index: this.showActionIndex, cItemName: action.cItemName }
    viewModel.get(action.cItemName).fireEvent('click', params);
    if (action.cItemName == 'btnDelete' || action.cItemName == 'btnDeleteRow') {
      this.selectIndex = -1;
      let showAction = this.state.showAction;
      showAction[this.showActionIndex] = false;
      this.setState({
        showAction
      });
    }
  }
  onScrollStart = () => {
    this.isScrolling = true;
    this.showActionIndex = -1;
  }
  onScrollEnd = (a, b, c) => {
    this.isScrolling = false;
    this.scrollEndHeight = b;
    this.offsetY = 0;
    this.nowSetDataSource = false;
  }
  //悬浮按钮————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  getEmptyData = () => {
    let data = this.dataList;
    if (data.length) return;
    const text = this.state.showSearch ? '搜索无结果' : '暂时没有数据哦~';
    const icon = this.props.emptyIcon || 'nodata';
    return <div className='table-nodata'><SvgIcon type={icon} />{text}</div>
  }
  render() {
    let pagination = this.setPage(this.state.pagination, this.GridProps.isPagination);
    let footerHeight = 0, visible = this.state.visible, showAggregates = this.GridProps.showAggregates, showSubtotal = this.GridProps.showSubtotal;
    let columnSetting = this.getColumnSetting();
    let overflowY = 'auto';
    if (showAggregates && showSubtotal) {
      footerHeight = this.props.footerHeigh || (this.props.rowHeight || 38) * 2;
    } else if (showAggregates || showSubtotal) {
      footerHeight = this.props.footerHeigh || (this.props.rowHeight || 38);
    }
    let style = this.state.style || {};
    let gridClassName = '';
    let scrollXWidth = (this.totalWidth > (this.props.width || 1100) ? 17 : 2);
    if (!this.GridProps.isPagination) scrollXWidth = 17;
    if (style.rowheight) this.rowheight = parseFloat(style.rowheight);
    if (visible) gridClassName = 'hide';
    let actionControl = this.getActionControl();
    let emptyData = this.getEmptyData();

    let gridHeight = 0;
    // /*列表高度*/
    // if (this.props.listHeaderHeight && this.props.height) {
    //   gridHeight = this.rowheight * this.dataList.length + (this.headerHeight || 40) + footerHeight + scrollXWidth;
    //   if (gridHeight > this.props.height) {
    //     gridHeight = this.props.height;
    //     if (this.GridProps.isPagination) gridHeight = gridHeight - 58;
    //   }
    //   this.bodyHeight = gridHeight - (this.headerHeight || 40) - footerHeight - scrollXWidth;
    // }
    /*参照高度*/
    // else
    if (this.props.maxRowCount) {
      if (this.props.height === 0) {
        gridHeight = this.rowheight * this.props.maxRowCount + (this.headerHeight || 40) + scrollXWidth;
        if (this.GridProps.isPagination) gridHeight = gridHeight - 58;
      } else {
        gridHeight = this.rowheight * this.props.maxRowCount + (this.headerHeight || 40) + footerHeight + scrollXWidth;
        if (this.GridProps.isPagination) {
          if (gridHeight > (this.props.height - 58)) {
            gridHeight = this.props.height - 58;
          }
        } else {
          if (gridHeight > this.props.height) {
            gridHeight = this.props.height;
          }
        }
      }
      // this.bodyHeight = gridHeight - (this.headerHeight || 40) - footerHeight - scrollXWidth;
    }
    /*单据表体高度*/
    else {
      let len = 10;
      if (this.dataList.length < 10) len = this.dataList.length;
      if (this.props.tableClass == 'rptTable') scrollXWidth = 2;
      gridHeight = this.rowheight * len + (this.headerHeight || 40) + (this.groupHeaderHeight || 0) + footerHeight + scrollXWidth;
    }

    if (emptyData) gridHeight = 200 + footerHeight;
    // if (gridHeight < 200) gridHeight = 200 + footerHeight;
    if (this.props.tableClass == 'rptTable') gridHeight += footerHeight;
    // const headerHeight = this.headerHeight || 40;
    // const maxRowCount = this.props.maxRowCount || 15;
    // let rowsHeight = this.rowheight * this.dataList.length + (this.headerHeight || 40) + scrollXWidth;
    // let gridHeight = this.props.height || 200;
    // if (this.GridProps.isPagination) {
    //   // overflowY = "hidden";
    //   gridHeight = gridHeight - 52;
    // }
    // if (rowsHeight < gridHeight) gridHeight = rowsHeight;
    // if (gridHeight < 200) gridHeight = 200;
    // if (!this.props.listHearderHeight || this.props.listHearderHeight == 0) {
    //   gridHeight = 10 * this.rowheight + (this.headerHeight || 40) + 20 - scrollXWidth;
    // }
    if (gridHeight < 170 && this.dataList.length == 0) gridHeight = 170;

    let tableClass = this.props.tableClass ? this.props.tableClass : 'listTable';
    if (tableClass == 'BillDesign' || tableClass == 'ReportDesign') {
      tableClass = 'listTable';
      gridHeight = this.props.height;
    }
    // if (this.state.mergeCells) tableClass = tableClass ? tableClass + '  mergeTable' : 'mergeTable';
    if (this.state.mergeCells) tableClass = 'mergeTable';
    // if(this.dataList.length == 0) {
    //   footerHeight = 0;
    //   gridHeight = 170;
    // }
    /*交班--根据传入rowcount  动态渲染高度*/
    const calcHeightByRowCount = this.state.calcHeightByRowCount;
    if (calcHeightByRowCount) {
      gridHeight = this.rowheight * calcHeightByRowCount + (this.headerHeight || 40) + footerHeight + scrollXWidth;
      if (gridHeight < 170) gridHeight = 170;
    }
    if (this.dataList.length == 0) {
      footerHeight = 0;
    }
    if (this.state.readOnly)
      tableClass = tableClass + " readOnlyTable";
    this.bodyHeight = gridHeight - (this.headerHeight || 40) - footerHeight - scrollXWidth;
    return (
      <div className={`meta-table ${gridClassName}` + ' ' + tableClass}>
        <Row>
          {columnSetting}
          {actionControl}
          <Table ref="fixedtable"
            rowHeight={this.rowheight}
            overflowY={overflowY}
            overflowX={'auto'}
            onScrollStart={this.onScrollStart}
            onScrollEnd={this.onScrollEnd}
            headerHeight={this.headerHeight || 40}
            groupHeaderHeight={this.groupHeaderHeight || 0}
            footerHeight={footerHeight}
            rowsCount={this.dataList.length}
            width={this.props.width || 1100}
            height={gridHeight}
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
            isColumnResizing={false}
            onRowClick={this._onRowClick}
            // onRowDoubleClick={this._onRowDoubleClick}
            rowClassNameGetter={this.rowClassNameGetter}
            scrollToRow={this.scrollRow}
            scrollToColumn={this.scrollCol}
            onRowMouseEnter={this.onRowMouseEnter}
            onRowMouseLeave={this.onRowMouseLeave}
            onVerticalScroll={this.onVerticalScroll}
          // showScrollbarY={false}
          >
            {this.state.columnset}
          </Table>
          {emptyData}
        </Row>
        <Row>
          {pagination}
        </Row>
      </div>
    );
  }
}
