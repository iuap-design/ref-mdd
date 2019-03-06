//级联选择控件
import React from 'react';
import { findDOMNode } from 'react-dom';
import { Cascader, Row, Col, Icon } from 'antd';
import Label from './label';
import text from './text';

export default class CascaderControl extends React.Component {
  constructor(props) {
    super(props);
    this.keyField = props.keyField || '';
    this.titleField = props.titleField || '';
    this.state = {
      bIsNull: props.bIsNull,
      options: props.options, //数据源
      defaultValue: props.defaultValue, //默认选择数据
      value: props.value, //选择数据值
      style: props.style || {}, //样式
      className: props.className || '', //class名称
      popupClassName: props.popupClassName || '', //自定义浮层类名
      popupPlacement: props.popupPlacement || 'bottomLeft', //浮层预设位置：bottomLeft bottomRight topLeft topRight
      placeholder: props.placeholder || '', //输入框占位文本
      size: props.size || 'default', //输入框大小，可选 large default small
      disabled: props.disabled || false,
      allowClear: props.allowClear || true, //是否支持清除
      expandTrigger: props.expandTrigger || 'hover', //菜单展开方式
      changeOnSelect: props.changeOnSelect || false, //是否点选每级菜单选项值都会发生变化
      showSearch: props.showSearch || false, //在选择框中显示搜索框
      notFoundContent: props.notFoundContent || '暂无数据！', //当下拉列表为空时显示的内容
      dataSource: props.dataSource || [],
    };
    this.CascaderOnChange = this.CascaderOnChange.bind(this); //选择完成后的回调
    this.displayRender = this.displayRender.bind(this); //选择后展示的渲染函数
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  setListenerState(params) {
    const { keyField, titleField, value } = params;
    this.keyField = keyField;
    this.titleField = titleField;
    delete params.keyField;
    delete params.titleField;
    delete params.value;
    this.setState(params);
    if (value)
      this.setValue(value);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  // 监听外部props的变化, 如果变化了需要更新组件的state
  componentWillReceiveProps(nextProps) {
    if (nextProps.model) {
      if (!this.props.model) {
        nextProps.model.addListener(this);
      }
    } else {
      if (this.props.model) {
        this.props.model.removeListener(this);
      } else {
        /*不绑定model*/
        this.keyField = nextProps.keyField;
        this.titleField = nextProps.titleField;
        this.setState({
          value: nextProps.value,
          dataSource: nextProps.dataSource
        });
      }
    }

  }
  //选择完成后的回调
  CascaderOnChange(value, selectedOptions) {
    if (this.props.model)
      this.props.model.select(value);
    if (this.props.onSelect)
      this.props.onSelect(value, selectedOptions);
    // this.setState({
    //   value
    // });
  }
  //选择后展示的渲染函数
  displayRender(label, selectedOptions) {
    return label.join('/');
  }

  setDataSource(dataSource) {
    this.setState({ dataSource });
  }

  setValue(value) {
    let keyField = this.keyField;
    let titleField = this.titleField;
    let states = {};
    let keys = [];
    let texts = [];
    value.forEach(function (item) {
      if (!item) return;
      keys.push(item[keyField]);
      texts.push(item[titleField]);
    });
    states['value'] = keys;
    states['text'] = texts.join('/');
    this.setState(states);
  }

  recursive(dataSource, options, keyField, titleField) {
    dataSource.forEach((item) => {
      let option = { value: item[keyField], label: item[titleField] };
      if (item.children) {
        option.children = [];
        this.recursive(item.children, option.children, keyField, titleField);
      }
      options.push(option);
    });
  }

  baseControl() {
    if (this.state.readOnly)
      return text(this.state.text);
    let options = [];
    let dataSource = this.state.dataSource;
    if (dataSource && dataSource.length)
      this.recursive(dataSource, options, this.keyField, this.titleField);
    return (
      <Cascader
        options={options} defaultValue={this.state.defaultValue} value={this.state.value}
        style={this.state.style} className={this.state.className} popupClassName={this.state.popupClassName}
        popupPlacement={this.state.popupPlacement} placeholder={this.state.placeholder}
        size={this.state.size} disabled={this.state.disabled} allowClear={this.state.allowClear}
        expandTrigger={this.state.expandTrigger} changeOnSelect={this.state.changeOnSelect}
        showSearch={this.state.showSearch} notFoundContent={this.state.notFoundContent}
        onChange={(value, selectedOptions) => this.CascaderOnChange(value, selectedOptions)}
        displayRender={(label, selectedOptions) => this.displayRender(label, selectedOptions)}
      />
    );
  }

  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }

  render() {
    const control = this.getControl();
    return (
      <div ref="div" className={this.state.err}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
