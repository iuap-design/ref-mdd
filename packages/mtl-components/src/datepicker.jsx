/*
参数        	       		说明					类型				默认值
value	              	日期					string or Date	无
defaultValue			默认日期				string or Date	无
format					展示的日期格式		string			"yyyy-MM-dd"
disabledDate			不可选择的日期		function	无
disabled				禁用	bool			false
style					自定义输入框样式		object	{}
popupStyle				格外的弹出日历样式	object	{}
size					输入框大小，large 高度为 32px，small 为 22px，默认是 28px	string	无
locale					国际化配置								object	默认配置
onOk					点击确定按钮的回调						function(Date value)	无
toggleOpen				弹出日历和关闭日历的回调					function(status)	无
getCalendarContainer	定义浮层的容器，默认为 body 上新建 div		function(trigger)	无
showTime				增加时间选择功能							Object or Boolean	TimePicker Options
*/
import React from 'react';
import { DatePicker, Icon } from 'antd';
import { findDOMNode } from 'react-dom';
import Label from './label';
import text from './text';
import moment from 'moment';


export default class DatePickerControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      bIsNull: props.bIsNull,
      focus: props.focus,
      value: null,
      format: props.cFormatData || 'YYYY-MM-DD',
      disabled: false,
      visible: !props.bHidden,
      style: {},
      size: 'default',
      locale: '',
      err: '',
      msg: '',
      className: props.className || '',
      isInFilterJSX: props.isInFilterJSX
    };
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
    }
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  handleBodyClick(e) {
    document.body.removeEventListener('click', this.handleBodyClick);
    if (this.contains(this.refs.div, e.target)) return;

    if (e.target && cb.dom(findDOMNode(e.target)).parents('div.ant-calendar').length) return; //好变态啊！！！
    if (this.props.model)
      this.props.model.execute('blur');
  }
  onChange(value) {
    if (this.props.model) {
      let dateString = value ? value.format(this.state.format) : null;
      this.props.model.setValue(dateString, true);
      if (this.state.format && this.state.format.indexOf('mm') > -1) return;
      this.props.model.execute('blur');
    }
  }
  onOk = () => {
    this.props.model.execute('blur');
  }
  toggleOpen(status) {
    if (this.props.model) {
      this.props.model.fireEvent('toggleOpen');
    }
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  contains(elem, target) {
    if (elem === target)
      return true;
    if (!elem || !elem.children || !elem.children.length)
      return false;
    for (var i = 0, len = elem.children.length; i < len; i++) {
      if (this.contains(elem.children[i], target))
        return true;
    }
    return false;
  }
  getCalendarContainer() {
    return document.getElementById('popup-container');
  }
  baseControl() {
    const { value, format } = this.state;
    const showValue = value && typeof value !== 'object' ? moment(value, format) : '';
    let baseControl;
    if (this.state.readOnly) {
      baseControl = text(showValue ? showValue.format(format) : showValue);
    } else {
      let showTime = this.state.format && this.state.format.indexOf('mm') > -1;
      const pickerProps = { value: showValue || null };
      if (cb.rest.interMode === 'touch')
        pickerProps.getCalendarContainer = this.getCalendarContainer;
      baseControl = (
        <DatePicker placeholder={null} onOpenChange={e => this.toggleOpen(e)} showTime={showTime} onOk={this.onOk} locale={this.state.locale} size={this.state.size} style={this.state.style} disabled={this.state.disabled} format={this.state.format} {...pickerProps} onChange={this.onChange} />
      );
    }

    return baseControl;
  }
  getControl() {
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
    if (this.state.isInFilterJSX)
      className = className + " isInFilterJSX isInFilterJSX-DatePicker";
    return (
      <div ref="div" style={style} className={className}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );

  }
}
