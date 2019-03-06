import React, { Component } from 'react';
import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table-2';
import { Checkbox, Popover, Button, Icon } from 'antd';
import Row from './row';
import Col from './col';
import _ from 'lodash';
import { getPredicateValue, getRoundValue } from '../../helpers/util';

export default class TreeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      dataSource: [],
      rowKey: "id",
      popFlag: false,
      showColumnSetting: true,
      titleList: []
    };
    this.keyMap = {};
    this.actionState = {};
    this.updateNodes = [];
  }
  componentDidMount() {
    this.props.model.addListener(this);
  }
  setListenerState(data) {
    if (!data.columns) return;
    if (this.props.columns) {
      const tempColumns = {};
      for (var attr in this.props.columns) {
        if (!data.columns[attr]) continue;
        const column = {};
        Object.assign(column, this.props.columns[attr], data.columns[attr]);
        tempColumns[attr] = column;
      }
      data.columns = tempColumns;
    }
    let columns = [], actionMeta = this.props.actionMeta;
    columns.push({
      "cFieldName": "expandCol", "cItemName": "expandCol", "cCaption": "", "cShowCaption": "",
      "iColWidth": 30, "cControlType": "expand", "iAlign": 2
    })
    if (actionMeta && actionMeta.controls) {
      let cStyle = actionMeta.cStyle;
      try {
        if (!cStyle || cStyle == '') {
          cStyle = {};
        } else {
          cStyle = JSON.parse(cStyle);
        }
      } catch (e) {
        cb.utils.alert('Toolbar cStyle，预制错误！', 'error');
      }
      this.fixedwidth = cStyle.fixedwidth ? cStyle.fixedwidth : 150;
      columns.push({
        "cFieldName": "action", "cItemName": "action", "cCaption": "", "cShowCaption": "",
        "iColWidth": this.fixedwidth, "cControlType": "action", "iAlign": 2, "fixedRight": true
      })
    }
    _.forEach(data.columns, (column, key) => {
      columns.push(column);
    });
    this.setState({ columns, rowKey: data.keyField })
  }
  setDataSource(dataSource) {
    let rowKey = this.state.rowKey;
    this.getKeyMap(dataSource, rowKey, {});
    this.setState({ dataSource });
  }
  //接受来自model的column信息
  setColumns = (columndata) => {
    let columns = [], actionMeta = this.props.actionMeta;
    columns.push({
      "cFieldName": "expandCol", "cItemName": "expandCol", "cCaption": "", "cShowCaption": "",
      "iColWidth": 30, "cControlType": "expand", "iAlign": 2
    })
    if (actionMeta && actionMeta.controls) {
      columns.push({
        "cFieldName": "action", "cItemName": "action", "cCaption": "", "cShowCaption": "",
        "iColWidth": this.fixedwidth, "cControlType": "action", "iAlign": 2, "fixedRight": true
      })
    }
    _.forEach(columndata, (column, key) => {
      columns.push(column);
    });
    this.setState({ columns })
  }
  /*操作列状态控制*/
  setActionState = (data) => {
    const rowKey = this.state.rowKey;
    const { key, itemName, name, value } = data;
    this.actionState[key][itemName][name] = value;
    this.setState({ rowKey });
  }
  /*批量操作列状态控制*/
  setActionsState = (data) => {
    if (data && data.length > 0) {
      const rowKey = this.state.rowKey;
      data.map(row => {
        this.actionState[row.key][row.itemName][row.name] = row.value;
      });
      this.setState({ rowKey });
    }
  }
  /*设置操作列是否显示*/
  setShowActionRows = (rows) => {
    if (typeof rows == 'object' && rows.length > 0) {
      rows.map(row => {
        if (this.keyMap[row.rowKey])
          this.keyMap[row.rowKey].showAction = row.showAction;
      });
    } else {
      console.log('setShowActionRows------参数错误！');
    }
  }
  /*对照*/
  getKeyMap = (data, rowKey, contrast) => {
    let actionList = this.props.actionMeta ? this.props.actionMeta.controls : [];
    data.map(item => {
      let key = item[rowKey];
      contrast[key] = { "isExpand": false, "showAction": false, "isEnd": item.isEnd, "level": item.level, "parent": item.parent, "key": key, "row": item };
      if (this.keyMap[key] && this.keyMap[key].isExpand) {
        contrast[key].isExpand = this.keyMap[key].isExpand;
      }
      this.keyMap[key] = contrast[key];
      this.actionState[key] = {};
      actionList.map(action => {
        if (!this.actionState[key][action.cItemName])
          this.actionState[key][action.cItemName] = { disabled: false, visible: true };
      });
      if (item.children)
        contrast[key].children = this.getKeyMap(item.children, rowKey, {});
    });
    return contrast;
  }
  /*设置展开行*/
  setExpandRow = (data) => {
    if (!data) return;
    const { rowKey, isExpand } = data;
    if (this.keyMap[rowKey]) {
      this.selectRowIndex = rowKey;
      let parentRowKey = this.keyMap[rowKey].parent;
      this.keyMap[parentRowKey].isExpand = isExpand;
    }
    this.setState({ "rowKey": this.state.rowKey });
  }
  /*行点击*/
  handleRowClick = (e, index) => {
    const { dataSource, rowKey } = this.state;
    let selectKey = '';
    if (e) {/*点击是否为扩展行*/
      let target = e.target;
      let className = target.className ? target.className : '';
      if (className.indexOf('expand-row') >= 0 || className.indexOf('expand-col') >= 0) {
        this.selectRowIndex = target.id;
        this.setState({ rowKey });
        return
      }
    }
    if (typeof index == 'object') {
      selectKey = this.keyMap[index.key].row[rowKey];
    } else {
      this.selectRowIndex = index;
      if (dataSource.length == 0 || !dataSource[index]) return;
      selectKey = dataSource[index][rowKey];
    }
    if (this.props.model)
      this.props.model.select(selectKey);
  }
  getColumnControl = () => {
    const { columns } = this.state;
    let ret = [];
    columns.map(function (col) {
      let column = this.getColumn(col);
      ret.push(column);
    }, this);

    return ret;
  }
  getColumn = (col) => {
    let headerCell = (<Cell><div className='billing-head-name'>{col.cShowCaption}</div></Cell>);
    let width, align, fixed = false, fixedRight = col.fixedRight;
    width = isNaN(parseFloat(col.iColWidth)) ? 200 : parseFloat(col.iColWidth);
    if (col.iAlign === 1)
      align = 'left';
    else if (col.iAlign === 2)
      align = 'center';
    else
      align = 'right';
    if (fixedRight) {
      return (<Column key={col.cItemName}
        allowCellsRecycling columnKey={col.cItemName}
        header={headerCell} cell={(rowIndex) => this.setCell(rowIndex, col)}
        width={width} align="center" fixedRight={true} />);
    } else {
      return (<Column key={col.cItemName}
        allowCellsRecycling columnKey={col.cItemName}
        header={headerCell} cell={(rowProperty) => this.setCell(rowProperty, col)}
        width={width} align={align} fixed={fixed} />);
    }
  }
  setCell = (rowProperty, col) => {
    const { dataSource } = this.state;
    const index = rowProperty.rowIndex;
    let row = dataSource[index];

    let text = this.compareCell(row, col, index);
    let titile = text;
    if (typeof text == 'object') {
      if (text.props && typeof text.props.children != 'object')
        titile = text.props.children;
      else
        titile = '';
    }
    return (
      <Cell width={rowProperty.width} height={this.rowHeight} className="billing-table-cell">
        <div title={titile} className="cell-text">
          {text}
        </div>
      </Cell>
    );
  }
  compareCell = (row, col, index, bExpand) => {
    const rowKey = this.state.rowKey;
    const ctrlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
    const columnKey = col.cItemName;
    const bJointQuery = col.bJointQuery;
    let text = cb.utils.isEmpty(row[columnKey]) ? "" : row[columnKey];

    switch (ctrlType) {
      case 'select':
        return this.renderSelect(col, text);
      case 'inputnumber':
      case 'money':
      case 'price':
        if (cb.utils.isEmpty(text)) return '';
        if (isNaN(text)) return text;

        /*谓词变量支持系统参数*/
        let cFormatData = col.cFormatData;
        try {
          if (!cFormatData || cFormatData == '') {
            cFormatData = {};
          } else {
            cFormatData = JSON.parse(cFormatData);
          }
        } catch (e) {
          cb.utils.alert('数量/金额/单价，预制错误！', 'error');
        }
        let iNumPoint = col.iNumPoint;
        let decimal = cFormatData.decimal ? getPredicateValue(cFormatData.decimal) : null;
        if (ctrlType === 'money') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.amountofdecimal;
        }
        else if (ctrlType === 'price') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
        } else {
          if (decimal)
            iNumPoint = decimal;
          else
            if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
        }
        if (!isNaN(iNumPoint) && iNumPoint != null) {
          text = parseFloat(text);
          text = getRoundValue(text, iNumPoint);
        }
        if (cFormatData.after) text = text + cFormatData.after;
        return text;
      case 'expand':
        let isExpand;
        if (row.children) {
          if (bExpand)
            isExpand = this.keyMap[index.key].isExpand;
          else
            isExpand = this.keyMap[row[rowKey]].isExpand;

          if (isExpand)
            text = (
              <div className="expand-icon" onClick={e => this.onExpandClick(e, index)}>
                <Icon type="minus-square-o" />
              </div>
            );
          else
            text = (
              <div className="expand-icon" onClick={e => this.onExpandClick(e, index)}>
                <Icon type="plus-square-o" />
              </div>
            );
        } else {
          text = "";
        }
        break;
      case 'checkbox':
        if (text == null || text == '') text = false;
        let indeterminate = this.getIndeterminate(index, col.cItemName, bExpand);
        return <Checkbox onChange={e => this.onCheckChange(e, index, col.cItemName, bExpand)} checked={text} indeterminate={indeterminate} />
        break;
      case 'action':
        text = this.getActionControl(index);
        return text;
    }
    return bJointQuery ? <a className="joinQueryCell" onClick={e => this.handleJointQuery(e, index, columnKey)}>{text}</a> : text;
  }
  onCheckChange = (e, index, cItemName, isExpand) => {
    const { dataSource, rowKey } = this.state;
    const checked = e.target.checked;
    let node = {};
    if (isExpand) {
      node = index.row;
      if (node.parent) {
        node[cItemName] = checked;
        this.updateNodes.push(node);
        if (node.children)
          this.loopChildNodes(this.keyMap[node[rowKey]], cItemName, checked);
        this.loopUpdateNodes(this.keyMap[node.parent], cItemName, checked);
        this.props.model.updateNodes(this.updateNodes);
        this.updateNodes = [];
        return
      }
    } else {
      node = dataSource[index];
    }
    this.props.model.updateNodeRecursive(node, cItemName, checked);
  }
  loopChildNodes = (data, cItemName, checked) => {
    let children = data.children;
    for (var key in children) {
      let childRow = children[key].row;
      let child = children[key].children;
      if (childRow[cItemName] != checked) {
        childRow[cItemName] = checked;
        this.updateNodes.push(childRow);
      }
      if (child) this.loopChildNodes(this.keyMap[children[key].key], cItemName, checked)
    }
  }
  loopUpdateNodes = (data, cItemName, checked) => {
    let { children, row, level } = data;
    if (checked) {
      let allChecked = true;
      for (var key in children) {
        let childRow = children[key].row;
        if (!childRow[cItemName] || childRow[cItemName] == '') {
          allChecked = false;
        }
      }
      if (allChecked) {
        row[cItemName] = checked;
        this.updateNodes.push(row);
      }
    } else {
      if (!row[cItemName]) {
        return;
      } else {
        row[cItemName] = checked;
        this.updateNodes.push(row);
      }
    }
    if (level > 1) this.loopUpdateNodes(this.keyMap[data.parent], cItemName, checked);
  }
  getIndeterminate = (index, cItemName, bExpand) => {
    const { dataSource, rowKey } = this.state;
    let key = null, indeterminate = false, node;
    if (bExpand)
      key = index.key;
    else
      key = dataSource[index][rowKey];
    node = this.keyMap[key];
    if (node.isEnd) return false;
    indeterminate = this.loopChildIndeterminate(node, cItemName);
    return indeterminate;
  }
  loopChildIndeterminate = (data, cItemName) => {
    let children = data.children;
    let indeterminate = false;
    for (var key in children) {
      let childRow = children[key].row;
      let child = children[key].children;
      if (childRow[cItemName]) {
        indeterminate = true;
        break;
      }
      if (child) this.loopChildIndeterminate(this.keyMap[children[key].key], cItemName);
    }
    return indeterminate;
  }
  handleJointQuery(e, index, columnKey) {
    let dataArry = this.state.dataSource;
    let rowData = {};
    if (typeof index == 'object') {
      rowData = this.keyMap[index.key].row;
    } else {
      rowData = dataArry[index];
    }
    this.props.model.execute('cellJointQuery', {
      rowData: rowData,
      cellName: columnKey
    });
  }
  /*操作列*/
  getActionControl = (index) => {
    const { dataSource, rowKey } = this.state;
    let actionList = this.props.actionMeta.controls;
    let actionControl = [], key = "";
    if (typeof index == 'object') {
      key = index.row[rowKey];
      if (index.showAction) {
        actionList.map(function (action) {
          const icon = action.iStyle === 1 ? null : '#icon-' + action.icon;
          const text = action.iStyle === 2 ? null : action.cShowCaption;
          if (this.actionState[key] && this.actionState[key][action.cItemName].visible) {
            let temp_action = (
              <span key={action.cItemName}>
                <a className="table-list-btn" onClick={(e) => this.ActionClick(e, action, index)}>{text}</a>
              </span>
            );
            actionControl.push(temp_action);
          }
        }, this);
      }
    } else {
      let { dataSource, rowKey } = this.state;
      key = dataSource[index][rowKey];
      if (this.keyMap[key].showAction) {
        actionList.map(function (action) {
          const icon = action.iStyle === 1 ? null : '#icon-' + action.icon;
          const text = action.iStyle === 2 ? null : action.cShowCaption;
          if (this.actionState[key] && this.actionState[key][action.cItemName].visible) {
            let temp_action = (
              <span key={action.cItemName}>
                <a className="table-list-btn" onClick={(e) => this.ActionClick(e, action, index)}>{text}</a>
              </span>
            );
            actionControl.push(temp_action);
          }
        }, this);
      }
    }
    return (<div className="acticonCell" style={{ "width": this.fixedwidth }}>{actionControl}</div>);
  }
  /*操作列点击*/
  ActionClick = (e, action, rowIndex) => {
    this.handleRowClick(null, rowIndex);
    if (this.actionClickTime) {
      let nowTime = new Date().valueOf();
      if (nowTime - this.actionClickTime < 1000) return;
      this.actionClickTime = nowTime;
    } else {
      this.actionClickTime = new Date().valueOf();
    }
    let viewModel = this.props.model.getParent();
    while (viewModel.getParent())
      viewModel = viewModel.getParent();
    let params = { index: rowIndex, cItemName: action.cItemName }
    viewModel.get(action.cItemName).fireEvent('click', params);
  }
  renderSelect(column, text) {
    const { keyMap, textField } = column;
    if (!keyMap || !textField)
      return text;
    return keyMap[text] && keyMap[text][textField];
  }

  /*展开行高度*/
  _subRowHeightGetter = (index) => {
    const { dataSource, rowKey } = this.state;
    const rowData = dataSource[index];
    const key = rowData[rowKey];
    let subRowHeight = 40;
    if (!cb.utils.isEmpty(this.keyMap[key]) && rowData.children) {
      if (this.keyMap[key].isExpand) {
        let children = rowData.children;
        subRowHeight = this.getSubRowHeight(this.keyMap[key].children, children.length * 40);
      } else {
        subRowHeight = 0;
      }
    } else {
      subRowHeight = 0;
    }
    return subRowHeight;
  }
  /*获取展开行高度*/
  getSubRowHeight = (children, height) => {
    for (var key in children) {
      let child = children[key];
      if (child.isExpand) {
        let len = 0;
        for (var key1 in child.children) {
          len = len + 1;
        }
        height = height + len * 40;
        if (child.children) {
          height = this.getSubRowHeight(child.children, height);
        }
      }
    }
    return height;
  }
  getGridHeight = () => {
    const { dataSource, rowKey } = this.state;
    let height = dataSource.length * 40 + 40 + 17;
    dataSource.map((rowData, index) => {
      const key = rowData[rowKey];
      let subRowHeight = 40;
      if (!cb.utils.isEmpty(this.keyMap[key]) && rowData.children) {
        if (this.keyMap[key].isExpand) {
          let children = rowData.children;
          subRowHeight = this.getSubRowHeight(this.keyMap[key].children, children.length * 40);
        } else {
          subRowHeight = 0;
        }
      } else {
        subRowHeight = 0;
      }
      height = height + subRowHeight;
    });
    return height;
  }
  /*展开行 渲染*/
  _rowExpandedGetter = ({ rowIndex, width, height }) => {
    const { dataSource, rowKey } = this.state;
    const rowData = dataSource[rowIndex];
    const key = rowData[rowKey];
    if (!cb.utils.isEmpty(this.keyMap[key]) && rowData.children) {
      if (this.keyMap[key].isExpand) {
        return (
          <div className="expand-rows">
            {this.getExpandRow(rowData.children, key)}
          </div>
        )
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  getExpandRow = (rows, parentKey) => {
    const { columns, rowKey } = this.state;
    let controls = [];
    rows.map(row => {
      let control, key = row[rowKey];
      control = this.getExpandCol(row, key);
      controls.push(control);
      if (row.children && this.keyMap[key].isExpand) {
        control = this.getExpandRow(row.children, this.keyMap[key].children, key);
        controls = controls.concat(control);
      }
    });
    return controls
  }
  getExpandCol = (row, parentKey) => {
    const { columns, rowKey } = this.state;
    const { level, isEnd } = this.keyMap[parentKey];
    let controls = [], bExpand = false;
    columns.map(col => {
      let width, align, style = { height: 40, float: 'left' };
      let expandColClass = "expand-col cell-text";
      width = isNaN(parseFloat(col.iColWidth)) ? 200 : parseFloat(col.iColWidth);
      if (col.iAlign === 1)
        align = 'left';
      else if (col.iAlign === 2)
        align = 'center';
      else
        align = 'left';
      // align = 'right';
      let text = this.compareCell(row, col, this.keyMap[parentKey], true);
      style.width = width;
      style.textAlign = align;
      if (col.cControlType == 'action') {
        // style.float = 'right';
        style.position = 'fixed';
        style.textAlign = 'right';
        style.left = (this.props.width || 1100) - width;
        if (text.props.children.length == 0) {
          expandColClass = expandColClass + " " + "action-col";
          style.height = style.height - 2;
        }
      }
      if (col.cControlType == 'expand') {
        style.textOverflow = 'initial';
        }
      if (level > 1 && col.cControlType != 'action') {
        if (col.cControlType == 'expand') {
          style.marginLeft = (level - 1) * 15;
          bExpand = true;
        } else {
          if (bExpand) {
            style.width = style.width - (level - 1) * 15;
            if (style.width < 0) style.width = 0;
            bExpand = false;
          }
        }
      }
      controls.push(
        <div className={expandColClass} id={parentKey} style={style}>{text}</div>
      );
    });
    let expandRowClass = "expand-row level-" + level;
    if (this.selectRowIndex == parentKey)
      expandRowClass = expandRowClass + ' ' + 'expand-row-selected'
    if (isEnd)
      expandRowClass = expandRowClass + ' ' + 'expand-row-end';
    let rowStyle = { "height": "40px" };
    rowStyle.width = this.getRowWidth();
    return (
      <div className={expandRowClass} id={parentKey} style={rowStyle}
        onMouseEnter={e => this.onExpandMouseEnter(e, parentKey)}
        onMouseLeave={e => this.onExpandMouseLeave(e, parentKey)}
      >
        {controls}
      </div>
    )
  }
  getRowWidth = () => {
    const columns = this.state.columns;
    let rowWidth = 0, tableWith = this.props.width || 1100;
    columns.map(col => {
      let width = isNaN(parseFloat(col.iColWidth)) ? 200 : parseFloat(col.iColWidth);
      // if (col.cItemName != 'action')
      rowWidth = rowWidth + width;
    });
    if (rowWidth < tableWith) rowWidth = tableWith;
    return rowWidth;
  }
  onExpandMouseEnter = (e, key) => {
    for (var key1 in this.keyMap) {
      if (key1 == key) {
        this.keyMap[key].showAction = true;
      } else {
        this.keyMap[key1].showAction = false;
      }
    }
    this.setState({
      rowKey: this.state.rowKey
    })
  }
  onExpandMouseLeave = (e, key) => {
    this.keyMap[key].showAction = false;
    this.keyMap[this.keyMap[key].parent].showAction = true;

    this.setState({
      rowKey: this.state.rowKey
    })
  }
  getRowClassName = (index) => {
    if (this.selectRowIndex == index)
      return 'public_fixedDataTableRow_selected';
  }
  _onHorizontalScroll = (scrollLeft) => {
    let expandRows = document.getElementsByClassName('expand-rows');
    if (expandRows.length <= 0) return true;
    for (var i = 0; i < expandRows.length; i++) {
      expandRows[i].scrollLeft = scrollLeft;
    }
    return true;
  }
  onExpandClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    let { dataSource, rowKey } = this.state;
    if (typeof index === 'object') {
      this.keyMap[index.key].isExpand = !index.isExpand;
    } else {
      let rowData = dataSource[index];
      let key = rowData[rowKey];
      this.keyMap[key].isExpand = !this.keyMap[key].isExpand;
    }
    this.setState({ rowKey });
  }
  //栏目设置————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  columnSetting = () => {
    this.setState({
      popFlag: !this.state.popFlag
    })
    this.props.model.columnSetting(this.props.code);
  }
  setTitle = (titleList) => {
    this.setState({
      titleList
    });
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
      titleList[index] = pre;
      titleList[index].iOrder = nowOrder;
      titleList[index - 1] = now;
      titleList[index - 1].iOrder = preOrder;
    } else {
      this.sort = "down";
      titleList[index] = next;
      titleList[index].iOrder = nowOrder;
      titleList[index + 1] = now;
      titleList[index + 1].iOrder = nextOrder;
    }
    this.setState({
      titleList
    });
  }
  onChecked = (e, element, index) => {
    let checked = e.target.checked;
    let id = element.id;
    let titleList = this.state.titleList;
    if (titleList[index].bJointQuery) {
      cb.utils.alert('关联字段不允许修改！', 'warning');
    } else {
      if (checked) {
        titleList[index].bShowIt = 1;
      } else {
        titleList[index].bShowIt = 0;
      }
    }
    this.setState({
      titleList
    });
  }
  buttonClick = (type) => {
    if (type == 'save') {
      this.props.model.setTitleData(this.state.titleList);
    }
    this.setState({
      popFlag: false
    });
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
  _onRowMouseEnter = (e, index) => {
    let { dataSource, rowKey } = this.state;
    let key = dataSource[index][rowKey];
    for (var key1 in this.keyMap) {
      if (key1 == key) {
        this.keyMap[key].showAction = true;
      } else {
        this.keyMap[key1].showAction = false;
      }
    }
    this.setState({ rowKey })
  }
  _onRowMouseLeave = (e, index) => {
    let { dataSource, rowKey } = this.state;
    let key = dataSource[index][rowKey];
    this.keyMap[key].showAction = false;
    this.setState({ rowKey })
  }
  render() {
    const { columns, dataSource } = this.state;
    let columnSetting = this.getColumnSetting();
    let gridHeight = this.getGridHeight();
    if (this.props.maxRowCount)
      gridHeight = this.props.maxRowCount * 40 + 40;
    return (
      <div className='meta-table tree-table'>
        <Row>
          {columnSetting}
          <Table
            className='billing_tree_table'
            rowHeight={40}
            overflowY={'auto'}
            overflowX={'auto'}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            onHorizontalScroll={this._onHorizontalScroll}
            footerHeight={0}
            headerHeight={40}
            onRowMouseEnter={this._onRowMouseEnter}
            onRowMouseLeave={this._onRowMouseLeave}
            rowsCount={dataSource.length}
            width={this.props.width || 1100}
            height={gridHeight}
            onRowClick={this.handleRowClick}
            rowClassNameGetter={this.getRowClassName}
          >
            {this.getColumnControl()}
          </Table>
        </Row>
      </div>
    );
  }
}
