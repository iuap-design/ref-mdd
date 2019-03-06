/*
参数	                      说明	               类型	默认值
defaultValue	默认选中的选项	array		[]
value	              指定选中的选项	array		[]
options	              指定可选项	    array		[]
onChange	       变化时回调函数	Function(checkedValue)
*/
import React, { Component } from 'react';
import { Checkbox } from 'antd';
import Label from './label';

const CheckGroup = Checkbox.Group;

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refCode: props.cRefType ? true : false,
      visible: !props.bHidden,
      bIsNull: props.bIsNull
    };
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    this.onClick();
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onClick() {
    const model = this.props.model;
    if (model && model.browse)
      model.browse();
  }
  open(e) {
    this.referViewModel = e.vm;
    this.gridModel = e.vm.get('table');
    this.gridModel.addListener(this);
  }
  handleChange = (checkedValues) => {
    if (!this.props.model) return;
    const { refCode, dataSource } = this.state;
    if (refCode) {
      this.gridModel.select(checkedValues);
      this.referViewModel.execute('afterOkClick', this.gridModel.getSelectedRows());
    } else {
      const values = [];
      checkedValues.forEach(index => {
        values.push(dataSource[index]);
      });
      this.props.model.setValue(values, true);
    }
  }
  setValue(value) {
    this.setState({ value });
  }
  setDataSource(dataSource) {
    this.setState({ dataSource });
  }
  baseControl() {
    const dataSource = this.state.dataSource || [];
    const titleField = this.state.titleField || 'name';
    const options = [];
    const value = [];
    dataSource.forEach((item, index) => {
      const title = item[titleField];
      const key = index.toString();
      options.push({ label: title, value: key });
      if (!this.state.value || this.state.value.indexOf(title) === -1) return;
      value.push(key);
    });
    return (
      <CheckGroup value={value} options={options} disabled={this.state.readOnly} onChange={this.handleChange} />
    );
  }
  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    const control = cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl();
    return control;
  }
  render() {
    const control = this.getControl();
    const style = this.state.visible ? {} : { display: 'none' };
    return (
      <div style={style}>
        {control}
      </div>
    );
  }
}
