/*
参数              说明                                          类型                  可选值                         默认值
type            【必须】声明 input 类型                     string                                              'text'
id              id                                          number 或 string
value           value 值                                     any
defaultValue    设置初始默认值                             any
size            控件大小                                        string              {'large','default','small'}     'default'
disabled        是否禁用状态，默认为 false                    bool                                                false
addonBefore     带标签的 input，设置前置标签                   node
addonAfter      带标签的 input，设置后置标签                   node
onPressEnter    按下回车的回调 function(e)
autosize        自适应内容高度，只对 type="textarea" 有效       bool or object  true or { minRows: 2, maxRows: 6 }  false
 */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { Input as AntdInput, Row, Col, Icon } from 'antd';
import SvgIcon from 'SvgIcon';
import Label from './label';
import text from './text';
import { getFormatValue } from '../../helpers/util';
// import KeyboardInput from '../common/KeyboardInput';

// const Input = cb.electron.getSharedObject() ? KeyboardInput : AntdInput;
let Input = null;

export default class InputControl extends React.Component {
  constructor(props) {
    super(props);
    Input = cb.electron.getSharedObject() ? require('../common/KeyboardInput').default : AntdInput;
    const { cStyle, cFormatData } = props;
    let config = null, format = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    if (cFormatData) {
      try {
        format = JSON.parse(cFormatData);
      } catch (e) {

      }
    }
    this.state = Object.assign({
      bIsNull: props.bIsNull,
      value: props.defaultValue,
      type: props.type || 'text',
      size: props.size || 'default',
      disabled: props.disabled || false,
      visible: !props.bHidden,
      addonBefore: props.addonBefore || '',
      readOnly: props.readOnly,
      addonAfter: props.addonAfter || '',
      placeholder: props.placeholder || '',
      autosize: props.autosize || false,
      err: props.err || '',
      msg: props.msg || '',
      format
    }, config);
    this.onPressEnter = this.onPressEnter.bind(this);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.focus) {
      if (this.refs.input.refs) {
        this.refs.input.refs.input.focus();
      } else {
        let input = cb.dom(findDOMNode(this.refs.input)).find('input');
        input.length && input[0].focus();
      }
    }
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  //render前
  componentWillUpdate(nextProps, nextState) { }
  //render后

  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  // 监听外部props的变化, 如果变化了需要更新组件的state
  componentWillReceiveProps(nextProps) {
    if (this.props.model) return;
    if (nextProps.defaultValue != this.state.value)
      this.setState({ value: nextProps.defaultValue });
    if (nextProps.err != this.state.err)
      this.setState({ err: nextProps.err })
  }
  handleInputChange(e) {
    // if (this.props.model) {
    // 		this.props.model.setData('value', e.target.value);
    // } else {
    // const value = e.target.value;
    // const { iMaxLength } = this.state;
    // if (iMaxLength && value.length > iMaxLength) return;
    const value = e && e.target ? e.target.value : e;
    if (this.props.onChange)
      this.props.onChange(value)
    this.setState({
      value
    });
    // }
  }
  handleInputBlur(e) {
    let value = e && e.target ? e.target.value : e;
    value = value === '' ? null : value;
    if (this.props.model) {
      this.props.model.setValue(value, true);
      this.props.model.execute('blur');
    }
    if (this.props.onBlur) {
      this.props.onBlur(value);
    }
  }
  onPressEnter(e) {
    if (this.props.model) {
      let value = e && e.target ? e.target.value : e;
      value = value === '' ? null : value;
      this.props.model.setValue(value, true);
      this.props.model.execute('enter');
    }
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    const { readOnly, value, type, placeholder, size, disabled, addonBefore, addonAfter, format, iMaxLength, icon, after, bottom } = this.state;
    let showValue = value, prefix = null, suffix = null;
    if (format) {
      const formatValue = getFormatValue(value, format);
      showValue = formatValue.showValue;
      prefix = formatValue.prefix;
      suffix = formatValue.suffix;
    }
    if (readOnly)
      return text(showValue);
    if (icon)
      suffix = <SvgIcon type={icon} />
    const props = {
      autoComplete: 'new-password',
      ref: 'input',
      type,
      placeholder: placeholder,
      size: size,
      disabled: disabled,
      addonBefore: addonBefore,
      addonAfter: addonAfter,
      onPressEnter: this.onPressEnter,
      value: cb.utils.isEmpty(value) ? '' : value,
      prefix,
      suffix,
      onBlur: e => this.handleInputBlur(e),
      onChange: e => this.handleInputChange(e)
    };
    if (iMaxLength)
      props.maxLength = iMaxLength;
    const com = <Input {...props} />
    if (!after && !bottom)
      return com;
    return (
      <div className="input-bottom">
        <div>{com}{after && <span>{after}</span>}</div>
        {bottom && <div className="input-bottom-text">{bottom}</div>}
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
    let errClass = `basic-input-${this.state.type} has-feedback ${this.state.classname || ''} ` + this.state.err;
    return (
      <div style={style} className={errClass}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
