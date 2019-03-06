import React from 'react';
import { Select, Icon } from 'antd';
import Label from './label';
import text from './text';

import * as PopoverMap from '../../../../common/components/popover';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class SelectControl extends React.Component {
  constructor(props) {
    super(props);
    this.valueField = props.valueField || '';
    this.textField = props.textField || '';
    this.state = {
      bIsNull: props.bIsNull,
      focus: props.focus,
      text: '',
      dataSource: [],
      value: undefined, //指定当前选中的条目 String/Array/{key: String, label: React.Node}/Array<{key, label}>
      defaultValue: [], //指定默认选中的条目 String/Array/{key: String, label: React.Node}/Array<{key, label}>
      multiple: false, //支持多选 boolean
      combobox: false, //输入框自动提示模式 boolean
      allowClear: true, //支持清除, 单选模式有效 boolean
      filterOption: true, //是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。  boolean or function(inputValue, option) true
      tags: false, // 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配  boolean
      placeholder: null, //选择框默认文字  string
      notFoundContent: '未找到', //当下拉列表为空时显示的内容 string
      dropdownMatchSelectWidth: true, //下拉菜单和选择器同宽  boolean
      optionFilterProp: 'children', //搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索  string  value
      size: 'default', //输入框大小，可选 large default small
      disabled: false,
      visible: !props.bHidden,
      err: '',
      msg: '',
      className: props.className || '',
      isInFilterJSX: props.isInFilterJSX
    };
    this.onChange = this.onChange.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
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
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  setListenerState(params) {
    const { valueField, textField, value } = params;
    this.valueField = valueField;
    this.textField = textField;
    delete params.valueField;
    delete params.textField;
    delete params.value;
    this.setState(params);
    this.setValue(value);
  }
  setValue(value) {
    let valueField = this.valueField;
    let textField = this.textField;
    let states = {};
    let keys = [];
    let texts = [];
    if (cb.utils.isArray(value)) {
      value.forEach(function (item) {
        if (!item) return;
        keys.push(item[valueField] + '');
        texts.push(item[textField] + '');
      });
    } else {
      if (value) {
        if (!cb.utils.isEmpty(value[valueField]))
          keys.push(value[valueField] + '');
        if (!cb.utils.isEmpty(value[textField]))
          texts.push(value[textField] + '');
      }
    }
    states['value'] = keys;
    states['text'] = texts.join(',');
    this.setState(states);
  }
  onSelect(value, option) { }
  onDeselect(value) { }
  onSearch(value) { }
  onChange(value) {
    if (cb.utils.isEmpty(value))
      value = null;
    if (this.props.model) {
      this.props.model.select(value);
      // this.props.model.execute('enter');
    }
  }
  handleBodyClick(e) {
    document.body.removeEventListener('click', this.handleBodyClick);
    this.setState({
      focus: false
    });
    if (this.contains(this.refs.div, e.target)) return;
    if (this.props.model)
      this.props.model.execute('blur');
  }
  contains(elem, target) {
    if (elem === target)
      return true;
    if (!elem.children.length)
      return false;
    for (var i = 0, len = elem.children.length; i < len; i++) {
      if (this.contains(elem.children[i], target))
        return true;
    }
    return false;
  }
  getOptions() {
    let valueField = this.valueField;
    let textField = this.textField;
    if (!this.state.dataSource) return
    const { rowStates } = this.state;
    const options = [];
    this.state.dataSource.forEach((item, index) => {
      if (item.optGroup) {
        options.push(<OptGroup key={index} label={item.optGroup.label}>
          {
            item.optGroup.options.map((opt) => {
              return <Option key={opt.value} text={opt.text}>{opt.text}</Option>
            })
          }
        </OptGroup>)
      } else {
        const key = item[valueField];
        const text = item[textField];
        if (rowStates && rowStates[key] && rowStates[key].visible === false) return;
        options.push(<Option key={key} text={text}>{text}</Option>);
      }
    });
    return options;
  }
  handleBlur(e) {
    if (this.props.model)
      this.props.model.execute('blur');
  }
  baseControl() {
    let {readOnly,afterPopoverKey} = this.state; 
    let _baseControl = null;
    if (readOnly){
      _baseControl = text(this.state.text);
    } else {
      let cProps = {
        dropdownClassName: cb.rest.interMode === 'touch' ? 'select-touch-container' : null,
        value: this.state.value,
        defaultValue: this.state.defaultValue,
        multiple: this.state.multiple,
        combobox: this.state.combobox,
        allowClear: this.state.allowClear,
        tags: this.state.tags,
        placeholder: this.state.placeholder,
        notFoundContent: this.state.notFoundContent,
        dropdownMatchSelectWidth: this.state.dropdownMatchSelectWidth,
        size: this.state.size,
        onChange: this.onChange,
        onSelect: this.onSelect,
        onDeselect: this.onDeselect,
        onSearch: this.onSearch,
        optionFilterProp: this.state.optionFilterProp,
        optionLabelProp: this.state.optionLabelProp,
        disabled: this.state.disabled
      };
      let options = this.getOptions();
      _baseControl= (
        <Select {...cProps} onBlur={e => this.handleBlur(e)}>
          {options}
        </Select>
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
  getControl() {
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
    let className = this.state.err + ' ' + this.state.className;
    if (this.state.isInFilterJSX) {
      className = className + " isInFilterJSX isInFilterJSX-Select";
    }
    else {
      // style.height = '100%';
    }
    if (this.state.readOnly) className = className + " readonly";
    return (
      <div ref="div" style={style} className={className}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
