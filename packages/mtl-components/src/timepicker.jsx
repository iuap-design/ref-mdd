import React from 'react';
import { TimePicker, Icon, Button } from 'antd';
import { findDOMNode } from 'react-dom';
import Label from './label';
import text from './text';
import moment from 'moment';
import * as formatDate from '../../helpers/formatDate'

export default class TimePickerControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsNull: props.bIsNull,
      format: props.cFormatData || 'HH:mm:ss',
      visible: !props.bHidden,
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
  handleBodyClick = (e) => {
    document.body.removeEventListener('click', this.handleBodyClick);
    if (this.contains(this.refs.div, e.target)) return;

    if (e.target && cb.dom(findDOMNode(e.target)).parents('div.ant-time-picker-panel').length) return; //好变态啊！！！
    if (this.props.model)
      this.props.model.execute('blur');
  }
  onChange = (time, timeString) => {
    this.timeString = timeString;
  }
  validate = (val) => {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  contains(elem, target) {
    if (elem === target)
      return true;
    if (!elem.children || !elem.children.length)
      return false;
    for (var i = 0, len = elem.children.length; i < len; i++) {
      if (this.contains(elem.children[i], target))
        return true;
    }
    return false;
  }
  handleButtonClick(panel) {
    if (this.props.model) {
      this.props.model.setValue(this.timeString, true);
      this.props.model.execute('blur');
    }
    panel.close();
  }
  baseControl = () => {
    let baseControl;
    const { readOnly, value, format, disabled } = this.state;
    if (readOnly) {
      baseControl = text(value);
    } else {
      const pickerProps = { disabled, format };
      if (value) {
        pickerProps.value = moment(value, format);
      } else {
        // pickerProps.value = moment(formatDate.dateFormat(new Date(), format), format);
      }
      const addon = panel => (
        <Button size="small" type="primary" onClick={() => this.handleButtonClick(panel)}>确定</Button>
      );
      baseControl = (
        <TimePicker {...pickerProps} onChange={this.onChange} addon={addon} />
      );
    }
    return baseControl;
  }
  getControl = () => {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    document.body.addEventListener('click', this.handleBodyClick);
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
