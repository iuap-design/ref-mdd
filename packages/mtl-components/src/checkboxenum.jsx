import React, { Component } from 'react';
import { Checkbox, Icon } from 'antd';
import Label from './label';
import text from './text';

const CheckGroup = Checkbox.Group;

export default class CheckboxEnum extends Component {
  constructor(props) {
    super(props);
    const { cStyle } = props;
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    this.state = Object.assign({
      bIsNull: props.bIsNull,
      indeterminate: false,
      checkAll: false
    }, config);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState(params) {
    const { valueField, textField, value, dataSource } = params;
    this.valueField = valueField;
    this.textField = textField;
    this.plainOptions = [];
    if (dataSource && dataSource.length) {
      dataSource.forEach(item => {
        this.plainOptions.push(item[valueField]);
      });
    }
    delete params.valueField;
    delete params.textField;
    delete params.value;
    this.setState(params);
    this.setValue(value);
  }
  onCheckAllChange = (e) => {
    if (this.props.model)
      this.props.model.select(e.target.checked ? this.plainOptions : []);
    this.setState({
      indeterminate: false,
      checkAll: e.target.checked
    });
  }
  handleChange = (checkedValues) => {
    if (this.props.model)
      this.props.model.select(checkedValues);
    this.setState({
      indeterminate: !!checkedValues.length && (checkedValues.length < this.plainOptions.length),
      checkAll: checkedValues.length === this.plainOptions.length,
    });
  }
  setValue(value) {
    const keys = [];
    if (cb.utils.isArray(value)) {
      value.forEach(item => {
        if (!item) return;
        keys.push(item[this.valueField]);
      });
    } else {
      if (value && !cb.utils.isEmpty(value[this.valueField]))
        keys.push(value[this.valueField]);
    }
    this.setState({ value: keys });
  }
  baseControl() {
    const { dataSource, value, readOnly, disabled, indeterminate, checkAll, after, bottom } = this.state;
    const options = [];
    const labels = [];
    dataSource && dataSource.forEach((item, index) => {
      const label = item[this.textField];
      const itemValue = item[this.valueField];
      options.push({ label, value: itemValue });
      if (value && value.indexOf(itemValue) > -1)
        labels.push(label);
    });
    if (readOnly)
      return text(labels.join('; '));
    const com = (
      <div>
        {/* <div style={{ float: 'left' }}>
          <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={this.onCheckAllChange}>全部</Checkbox>
        </div> */}
        <div style={{ float: 'left' }}>
          <CheckGroup value={value} options={options} disabled={disabled} onChange={this.handleChange} />
        </div>
      </div>
    );
    if (!after && !bottom)
      return com;
    return (
      <div className='checkboxenum-placeholder'>
        <div>{com}{after && <span>{after}</span>}</div>
        {bottom && <div className='checkboxenum-bottom'>{bottom}</div>}
      </div>
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
    return control;
  }
}
