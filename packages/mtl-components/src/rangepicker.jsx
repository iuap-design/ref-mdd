import React from 'react';
import { DatePicker } from 'antd';
import Label from './label';
import text from './text';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;

export default class RangePickerControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: props.format || 'YYYY-MM-DD',
      visible: !props.bHidden,
      readOnly: props.readOnly,
      disabled: props.disabled || false,
      err: '',
      msg: ''
    };
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onChange = (value, dataString) => {
    console.log('From :' + dataString[0] + ' to ：' + dataString[1]);
    if (this.props.model)
      this.props.model.setValue(dataString, true);
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    const { readOnly, value, format, disabled } = this.state;
    let newValue, textValue;
    if (cb.utils.isArray(value)) {
      newValue = [];
      textValue = [];
      value.forEach(item => {
        newValue.push(item && moment(item, format));
        if (!item) return;
        textValue.push(item);
      });
    }
    if (readOnly)
      return text(textValue && textValue.join('~'));
    let control = <RangePicker value={newValue} format={format} disabled={disabled} onChange={this.onChange} />;
    return control;
  }
  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    const control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };
    let className = this.state.err + ' ' + this.state.className;
    return (
      <div ref="div" style={style} className={className}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
