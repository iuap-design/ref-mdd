/*
按钮单选框
参数				说明						类型					可选值				默认值
onChange		选项变化时的回调函数		Function(e:Event)	无					无
value			用于设置当前选中的值		String				无					无
defaultValue	默认选中的值				String				无					无
size			大小，只对按钮样式生效	String				large default small	default
 */
import React from 'react';
import { Radio, Icon } from 'antd';
import Label from './label';
import text from './text';
import SvgIcon from 'SvgIcon';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import * as PopoverMap from '../../../../common/components/popover';
export default class RadioGroupControl extends React.Component {
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
      valueField: 'value',
      textField: 'text',
      options: [],
      value: undefined,
      disabled: false,
      visible: !props.bHidden,
      size: 'default'
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
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  handleBodyClick = (e) => {
    document.body.removeEventListener('click', this.handleBodyClick);
    this.setState({
      focus: false
    });
    if (this.contains(this.refs.div, e.target)) return;
    if (this.props.model)
      this.props.model.execute('blur');
  }
  validate = (val) => {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  onChange = (e) => {
    if (this.props.model) {
      this.props.model.select(e.target.value);
      // this.props.model.execute('enter');
    }
  }
  handleIconClick(value) {
    if (this.props.model)
      this.props.model.select(value);
  }
  setValue = (value) => {
    let valueField = this.state.valueField;
    let textField = this.state.textField;
    let states = {};
    let key,
      text;
    if (value) {
      key = value[valueField];
      text = value[textField];
    }
    states['value'] = key;
    states['text'] = text;
    this.setState(states);
  }

  setListenerState = (data) => {
    const value = data.value;
    if (value) {
      this.setValue(value);
      delete data.value;
    }
    var states = {};
    for (var attr in data) {
      if (attr === 'dataSource') {
        states['options'] = data[attr]
      } else {
        states[attr] = data[attr]
      }
    }
    this.setState(states);
  }
  getOptions = () => {
    const { valueField, textField, type, value } = this.state;
    return this.state.options.map((item, index) => {
      if (type == 'button') {
        return <RadioButton key={item[valueField]} disabled={item.disabled} value={item.value}>{item.text}</RadioButton>
      } else {
        const radioCom = <Radio key={item[valueField]} disabled={item.disabled} value={item.value}>{item.text}</Radio>
        if (item.nameType === 'icontext') {
          const className = item.value === value ? ' selected' : '';
          return <span className="radio-svg-btn"><div className={`radio-icon${className}`}><SvgIcon type={item.icon} onClick={() => this.handleIconClick(item.value)} /></div>{radioCom}</span>
        }
        if (item.nameType === 'svgtext') {
          let { icon } = item;
          if (item.value === value)
            icon += '-active';
          return <span className="radio-svg-btn"><div className='radio-svg'><SvgIcon type={icon} onClick={() => this.handleIconClick(item.value)} /></div>{radioCom}</span>
        }
        return radioCom;
      }
    });
  }
  baseControl = () => {
    const { readOnly, options, value ,afterPopoverKey} = this.state;
    let _baseControl = null;
    if (readOnly) {
      const textCom = text(this.state.text);
      const option = options.find(item => {
        return item.value === value;
      });
      if (option && option.nameType === 'icontext'){
        _baseControl = (<span style={{ float: 'left' }}><div className='radio-icon'><SvgIcon type={option.icon} style={{ display: 'block' }} /></div>{textCom}</span>)
      }else{
        _baseControl = textCom;
      }
    }else{
      let cProps = {
        value,
        size: this.state.size,
        onChange: this.onChange,
        disabled: this.state.disabled
      };
      _baseControl = (
        <RadioGroup {...cProps} onBlur={e => this.handleBlur(e)} >
          {this.getOptions()}
        </RadioGroup>
      );
    }
    let AfterComName = null;
    if(!afterPopoverKey){
      return _baseControl
    }else{
      AfterComName = PopoverMap[afterPopoverKey];
      return (
        <div className="input-bottom">
          <div className='control-flex'>{_baseControl}<AfterComName/></div>
        </div>
      );
    }
  }
  getControl = () => {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    if (this.state.focus)
      document.body.addEventListener('click', this.handleBodyClick);
    const control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };
    let className = "";
    if (!this.state.readOnly && !this.state.afterPopoverKey){
      className = 'control-radio ticket-opening';
    }
    let err = this.state.err ? this.state.err : '';
    className = className + ' ' + (this.state.classname ? `${this.state.classname} ` : '') + err;
    return (
      <div ref="div" style={style} className={className}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
