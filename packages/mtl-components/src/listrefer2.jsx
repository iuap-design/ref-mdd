import React, { Component } from 'react';
import { Select, Icon } from 'antd';
import Label from './label';
import text from './text';

const Option = Select.Option;

export default class ListRefer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsNull: props.bIsNull
    };
  }
  getModel() {
    return this.props.model || this.model;
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.focus)
      this.refs.input.refs.input.focus();
    // this.onClick();
  }
  handleClick() {
    if (this.hasClicked) return;
    this.hasClicked = true;
    this.onClick();
  }
  componentWillUnmount() {
    let model = this.getModel();
    if (model)
      model.removeListener(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.model) return;
    if (nextProps.value != this.state.value)
      this.setState({ value: nextProps.value });
  }
  open(e) {
    this.referViewModel = e.vm;
    this.gridModel = e.vm.get('table');
    this.gridModel.addListener(this);
    if (typeof this.props.afterOkClick === 'function')
      this.referViewModel.on('afterOkClick', this.props.afterOkClick);
  }
  setValue(value) {
    this.setState({ value });
  }
  onClick() {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model && model.browse)
      model.browse(true);
  }
  handleJointQuery() {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model)
      model.fireEvent('jointQuery');
  }
  onChange(value) {
    let referValue;
    if (value == null) {
      referValue = value;
    } else {
      this.gridModel.select([value]);
      referValue = this.gridModel.getSelectedRows();
    }
    this.referViewModel.execute('afterOkClick', referValue);
  }
  setDataSource(dataSource) {
    this.setState({ dataSource });
  }
  baseControl() {
    let baseControl = null;
    if (this.state.readOnly) {
      baseControl = text(this.state.value);
    }
    else {
      // if (!this.state.dataSource || !this.state.dataSource.length)
      //   return baseControl;
      const dataSource = this.state.dataSource || [];
      let titleField = this.state.textField || 'name';
      let keyField = this.state.keyField || 'code';
      let value = dataSource.findIndex(item => {
        return item[titleField] === this.state.value;
      });
      if (value === -1) {
        value = this.state.value;
      } else {
        value = value.toString();
      }
      const loop = data => data.map((item, index) => {
        return <Option value={index.toString()}>{item[titleField]}</Option>
      });
      const optionNodes = loop(dataSource);
      baseControl = (
        <Select
          onFocus={() => this.handleClick()}
          value={value}
          allowClear
          onChange={value => this.onChange(value)}
        >{optionNodes}</Select>
      )
    }
    return baseControl;
  }
  getControl() {
    const { bJointQuery, cShowCaption } = this.props;
    let title = bJointQuery ? <a onClick={e => this.handleJointQuery(e)}>{cShowCaption}</a> : cShowCaption;
    title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{title}</label> : <label>{title}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    const control = this.getControl();
    return control;
  }
}
