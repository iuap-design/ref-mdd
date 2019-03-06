/*
成员				说明						类型				默认值
min				最小值					Number			-Infinity
max				最大值					Number			Infinity
value			当前值					Number
step			每次改变步数，可以为小数	Number or String	1
defaultValue	初始值					Number
disabled		禁用						Boolean			false
size			输入框大小				String			无
 */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { InputNumber as AntdInputNumber, Icon } from 'antd';
import Label from './label';
import text from './text';
import { getPredicateValue, getRoundValue } from '../../helpers/util';
import KeyboardInputNumber from '../common/KeyboardInputNumber';

let InputNumber = null;

export default class InputNumberControl extends React.Component {
  constructor(props) {
    super(props);
    InputNumber = cb.electron.getSharedObject() ? KeyboardInputNumber : AntdInputNumber;
    let { iNumPoint, cFormatData, cStyle, bIsNull, bHidden } = props;
    if (cb.utils.isEmpty(iNumPoint))
      iNumPoint = 2;
    let format = null, config = null;
    if (cFormatData) {
      try {
        format = JSON.parse(cFormatData);
      } catch (e) {

      }
    }
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {

      }
    }
    this.state = Object.assign({
      bIsNull,
      value: this.props.defaultValue,
      // min: -999999999,
      // max: 999999999,
      iNumPoint,
      disabled: false,
      visible: !bHidden,
      size: 'default',
      err: '',
      msg: '',
      className: props.className || '',
      format
    }, config);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.focus) {
      let input = cb.dom(findDOMNode(this.refs.input)).find('input');
      input.length && input[0].focus();
    }
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
    // if (this.props.focus) {
    //   let input = cb.dom(findDOMNode(this.refs.input)).find('input');
    //   // input.length && input[0].focus();
    // }
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState(params) {
    const controlType = this.props.cControlType && this.props.cControlType.trim().toLocaleLowerCase();
    const { format } = this.state;
    let { iNumPoint } = params;
    switch (controlType) {
      case 'money':
        iNumPoint = cb.rest.AppContext.option.amountofdecimal;
        break;
      case 'price':
        iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
        break;
    }
    if (format && format.decimal)
      iNumPoint = getPredicateValue(format.decimal);
    if (!cb.utils.isEmpty(iNumPoint))
      params.iNumPoint = iNumPoint;
    this.setState(params);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.model) return;
    if (nextProps.defaultValue != this.state.value)
      this.setState({ value: nextProps.defaultValue });
    if (nextProps.err != this.state.err)
      this.setState({ err: nextProps.err })
  }
  handleInputBlur(e) {
    // if (this.props.model)
    //   this.props.model.execute('blur');
    let { value } = this.state;
    value = cb.utils.isEmpty(value) ? null : value;
    if (this.props.model) {
      this.props.model.setValue(value, true);
      this.props.model.execute('blur');
    }
  }
  onKeyDown = (e) => {
    if (e.keyCode !== 13) return;
    this.onPressEnter();
  }
  onPressEnter() {
    let { value } = this.state;
    value = cb.utils.isEmpty(value) ? null : value;
    if (this.props.model) {
      this.props.model.setValue(value, true);
      this.props.model.execute('enter');
    }
  }
  onChange(value) {
    // value = cb.utils.isEmpty(value) ? null : value;
    // if (this.props.model)
    //   this.props.model.setValue(value, true);
    if (value === -0)
      value = 1 / value < 0 ? '-0' : '0';
    this.setState({ value });
  }
  validate(val) {
    this.setState({
      err: 'has-feedback has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    const { format, iNumPoint, style, placeholder, after, bottom } = this.state;
    let showValue = this.state.value, formatter = null;
    if (!cb.utils.isEmpty(showValue) && !isNaN(showValue) && iNumPoint != null)
      showValue = getRoundValue(Number(showValue), iNumPoint);
    if (format) {
      if (cb.utils.isEmpty(showValue))
        showValue = '';
      if (format.before)
        showValue = format.before + showValue;
      if (format.after)
        showValue += format.after;
      formatter = value => `${format.before || ''}${value}${format.after || ''}`;
    }
    let textCom = text(showValue);
    const extraProps = {};
    if (style) {
      textCom = <div className='input-number-has-config-style' style={style}>{textCom}</div>
      extraProps.style = style;
    }
    const com = this.state.readOnly ? textCom : <InputNumber {...extraProps} placeholder={placeholder} formatter={formatter} ref="input" min={this.state.min} max={this.state.max} precision={iNumPoint} disabled={this.state.disabled} size={this.state.size} value={this.state.value} onBlur={e => this.handleInputBlur(e)} onChange={e => this.onChange(e)} onKeyDown={this.onKeyDown} onPressEnter={() => this.onPressEnter()} />
    if (!after && !bottom)
      return com;
    return (
      <div>
        <div className='control-flex'>{com}{after && <span>{after}</span>}</div>
        {bottom && <div>{bottom}</div>}
      </div>
    );
  }
  relatedControl() {
    const control = this.baseControl();
    const { relatedControl } = this.props;
    if (!relatedControl)
      return control;
    return (
      <div className='has-related'>
        <div className='viewCell'>{control}</div>
        {relatedControl}
      </div>
    );
  }
  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.relatedControl()} title={title} /> : this.relatedControl());
    return control;
  }
  render() {
    const control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };
    let className = this.state.err + ' ' + this.state.className;
    return (
      <div style={style} className={className}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
