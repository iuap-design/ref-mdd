import React, { Component } from 'react';
import { Table } from 'antd';
import _ from 'lodash';

export default class TreeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.props.model.addListener(this);
  }
  renderSelect(column, text) {
    const { keyMap, textField } = column;
    if (!keyMap || !textField)
      return text;
    return keyMap[text] && keyMap[text][textField];
  }
  setListenerState(data) {
    if (!data.columns) return;
    const columns = [];
    _.forEach(data.columns, (column, key) => {
      const column1 = {
        title: column.cShowCaption,
        dataIndex: key,
        key,
        width: column.iColWidth || 150
      };
      const ctrlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
      if (ctrlType === 'select')
        column1.render = (text) => {
          return this.renderSelect(column, text);
        }
      columns.push(column1);
    });
    this.setState({ columns, rowKey: data.keyField })
  }
  setDataSource(dataSource) {
    this.setState({ dataSource });
  }
  onRowClick = (record, index) => {
    const { rowKey } = this.state;
    if (this.props.model)
      this.props.model.select(record[rowKey]);
  }
  render() {
    const { columns, rowKey, dataSource } = this.state;
    if (!columns || !columns.length)
      return null;
    return (
      <Table columns={columns} rowKey={rowKey} dataSource={dataSource} onRowClick={this.onRowClick} />
    );
  }
}


getExpendContrast = (data, rowKey, contrast) => {
    data.map(item => {
      let key = item[rowKey];
      contrast[key] = { "isExpend": false, "level": item.level, "parent": item.parent, "key": key };
      this.keyMap[key] = contrast[key];
      if (item.children)
        contrast[key].children = this.getExpendContrast(item.children, rowKey, {});
    });
    return contrast;
  }
