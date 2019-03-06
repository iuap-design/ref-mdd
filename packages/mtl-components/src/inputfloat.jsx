/*
成员				说明						类型				默认值
min				最小值					Number			-Infinity
max				最大值					Number			Infinity
value			当前值					Number
step			每次改变步数，可以为小数	Number or String	1
value	初始值					Number
disabled		禁用						Boolean			false
size			输入框大小				String			无
 */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { Input, InputNumber, Icon } from 'antd';
import Label from './label';
import text from './text';

export default class InputFloatControl extends React.Component {
  constructor(props) {
    super(props);
    // let format = null;
    // if (props.cFormatData) {
    //   try {
    //     format = JSON.parse(props.cFormatData);
    //   } catch (e) {

    //   }
    // }
    // let numPoint = this.formatToDisplayStyle(this.props.numPoint, 0, 2);
    // let value = this.formatToDisplayStyle(this.props.value, numPoint, "");
    // this.state = {
    //   bIsNull: props.bIsNull,
    //   value: value,
    //   triggerValue: value,//触发给外部的数值
    //   min: this.props.min == undefined ? -999999999 : this.props.min,
    //   isIncludeMinValue: this.props.isIncludeMinValue == undefined ? true : this.props.isIncludeMinValue,
    //   max: this.props.max || 999999999,
    //   isIncludeMaxValue: this.props.isIncludeMaxValue == undefined ? true : this.props.isIncludeMaxValue,
    //   numPoint: numPoint,
    //   className: props.className || '',
    //   placeholder: props.placeholder || '',
    //   id: props.id || ''
    // };

    this.state = this.setStateByProps(this.props, true);

  }

  setStateByProps(props, bConstructor) {
    let numPoint = this.formatToDisplayStyle(props.numpoint, 0, 2);
    let value = this.formatToDisplayStyle(props.value, numPoint, "");
    let obj = {};
    obj = {
      bIsNull: props.bIsNull,
      value: value,
      triggerValue: value,//触发给外部的数值
      min: props.min == undefined ? -999999999 : props.min,
      isIncludeMinValue: props.isIncludeMinValue == undefined ? true : props.isIncludeMinValue,
      max: props.max || 999999999,
      isIncludeMaxValue: props.isIncludeMaxValue == undefined ? true : props.isIncludeMaxValue,
      numPoint: numPoint,
      className: props.className || '',
      placeholder: props.placeholder || '',
      id: props.id || ''
    };

    return obj;

    //   let value = this.state.value;
    // if (parseFloat(nextProps.value) != parseFloat(this.state.value))
    //   value = this.formatToDisplayStyle(nextProps.value, this.state.numPoint, "");
    // this.setState({ value: value, triggerValue: value });


  }
  componentDidMount() {
    // if (this.props.model)
    //   this.props.model.addListener(this);
    if (this.props.focus) {
      let input = cb.dom(findDOMNode(this.refs.input)).find('input');
      input.length && input[0].focus();
    }
  }
  render() {
    let id = this.state.id;
    if (id == undefined || id == '')
      return (
        <div  >
          <Input
            placeholder={this.state.placeholder}
            disabled={!!this.props.disabled}
            visible={!!this.props.visible}
            value={this.state.value}
            onChange={(e) => this.valueChange(e)}
            onBlur={(e) => this.inputOnBlur(e)}
          />
        </div>
      );
    else
      return (
        <div  >
          <Input
            id={id}
            placeholder={this.state.placeholder}
            disabled={!!this.props.disabled}
            visible={!!this.props.visible}
            value={this.state.value}
            onChange={(e) => this.valueChange(e)}
            onBlur={(e) => this.inputOnBlur(e)}
          />
        </div>
      );

  }
  formatToDisplayStyle(value, numPoint, defaultValue) {
    if (value == undefined)
      return defaultValue;
    if (isNaN(value))
      return defaultValue;
    let str = value.toString();
    if (str.trim() === "")
      return defaultValue;
    if (numPoint > 0 && str.indexOf('.') < 0)
      return parseFloat(value).toFixed(numPoint);
    if (numPoint > 0 )
      return parseFloat(value).toFixed(numPoint);
    if (str.indexOf('.') > -1 && numPoint == 0)
      return parseInt(value);
    return value;
  }

  validateInputNumber(value) {
    let numPoint = this.state.numPoint;
    //  var regu = /^[0-9]+\.?[0-9]*$/;
    var regu = /^\-?[0-9]+\.?[0-9]*$/;
    if (value == "-")
      return true;
    if (value != "") {
      if (!regu.test(value)) {
        return false;
      }
      if (isNaN(value)) {
        return false;
      }
      if (numPoint == 0) {
        if (value.indexOf('.') > -1) {
          return false;
        }
      }
      if (value.indexOf('.') > -1) {
        if (value.split('.')[1].length > numPoint) {
          return false;
        }
      }
      if (Number(value) > this.state.max || (this.state.isIncludeMaxValue == false && Number(value) == this.state.max)) {
        return false;
      }
      if (Number(value) < this.state.min || (this.state.isIncludeMinValue == false && Number(value) == this.state.min)) {
        return false;
      }
    }
    return true;
  }
  inputOnBlur(e) {

    let value = this.formatToDisplayStyle(this.state.triggerValue, this.state.numPoint, "");
    this.setState({ value: value });
  }
  isNotTriggerNum(value) {
    if (value == "-")
      return true;
    if (value == "-0")
      return true;
    if (value == "-0.")
      return true;
    return false;
  }
  valueChange(e) {
    let value = e.target.value;
    if (this.validateInputNumber(value) == true) {
      this.triggerOnChange(value);
      this.setState({ value: value });
    }
    else {
      this.setState();
    }
  }
  triggerOnChange(value) {
    if (this.props.onChange == undefined)
      return;
    if (this.isNotTriggerNum(value))
      return;
    // if (value != "" && value != "-" && isNaN(parseFloat(value)))
    //   return;
    if (isNaN(parseFloat(value)) && isNaN(parseFloat(this.state.value)))
      return;
    if (parseFloat(value) == parseFloat(this.state.value))
      return;
    this.props.onChange(value);
    this.setState({ triggerValue: value });
  }

  componentDidUpdate() {
  }
  componentWillUnmount() {
  }
  componentWillReceiveProps(nextProps) {
    let obj = this.setStateByProps(nextProps, false);
    let value = this.state.value;
    if (parseFloat(nextProps.value) != parseFloat(this.state.value))
      value = this.formatToDisplayStyle(nextProps.value, this.state.numPoint, "");
    obj = Object.assign(obj, { value: value, triggerValue: value })
    this.setState(obj);
  }
}
