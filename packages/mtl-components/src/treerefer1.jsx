import React, { Component } from 'react';
import { TreeSelect, Icon } from 'antd';
import Label from './label';
import text from './text';

const TreeNode = TreeSelect.TreeNode;

export default class TreeRefer extends Component {
  constructor(props) {
    super(props);
    const { cStyle } = this.props;
    if (cStyle) {
      let config = null;
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
      this.refresh = config.refresh;
    }
    this.state = {
      bIsNull: props.bIsNull
    };
  }
  getModel() {
    return this.props.model || this.model;
  }
  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
      const parent = this.props.model.getParent();
      if (parent)
        parent.on('updateTreeRefer', () => this.onClick());
    }
    if (this.props.focus)
      this.refs.input.refs.input.focus();
    // this.onClick();
  }
  handleClick() {
    if (this.state.disabled) return;
    if (!this.refresh) {
      if (this.hasClicked) return;
      this.hasClicked = true;
    }
    this.onClick();
  }
  componentWillUnmount() {
    let model = this.getModel();
    if (model)
      model.removeListener(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.model) return;
    if (nextProps.value != this.state.value)
      this.setState({ value: nextProps.value });
  }
  open(e) {
    this.referViewModel = e.vm;
    this.treeModel = e.vm.get('tree');
    this.treeModel.addListener(this);
    if (typeof this.props.afterOkClick === 'function')
      this.referViewModel.on('afterOkClick', this.props.afterOkClick);
  }
  setValue(value) {
    if (cb.utils.isArray(value)) return;
    this.setState({ value });
  }
  onClick() {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model)
      model.browse();
  }
  handleJointQuery() {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model)
      model.fireEvent('jointQuery');
  }
  onSelect(selectedKeys, e) {
    if (this.props.onSelect)
      this.props.onSelect(selectedKeys, e);
    if (this.treeModel)
      this.treeModel.select(selectedKeys);
    this.referViewModel.execute('afterOkClick', this.treeModel.getSelectedNodes());
  }
  onChange = (value) => {
    if (value == null)
      this.referViewModel.execute('afterOkClick', value);
  }
  setDataSource(dataSource) {
    this.setState({ dataSource });
  }
  baseControl() {
    let baseControl = null;
    if (this.state.readOnly) {
      baseControl = text(this.state.value);
    }
    else {
      // if (!this.state.dataSource || !this.state.dataSource.length)
      //   return baseControl;
      const dataSource = this.state.dataSource || [];
      let titleField = this.state.titleField;
      let keyField = this.state.keyField;
      let childrenField = this.state.childrenField;

      const loop = data => data.map((item) => {
        if (item[childrenField]) {
          return <TreeNode data={item} value={item[keyField]} title={item[titleField]} key={item[keyField]}>{loop(item[childrenField])}</TreeNode>;
        }
        return <TreeNode data={item} value={item[keyField]} title={item[titleField]} key={item[keyField]} isLeaf={item.isLeaf} disabled={item.disabled} />;
      });
      const treeNodes = loop(dataSource);
      baseControl = (
        <TreeSelect
          disabled={this.state.disabled}
          treeNodeFilterProp='title'
          onClick={() => this.handleClick()}
          showSearch
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          //placeholder="Please select"
          allowClear
          //treeDefaultExpandAll
          onSelect={(selectedKeys, e) => this.onSelect(selectedKeys, e)}
          onChange={this.onChange}
        >{treeNodes}</TreeSelect>
      )
    }
    return baseControl;
  }
  getControl() {
    const { bJointQuery, cShowCaption } = this.props;
    let title = bJointQuery ? <a onClick={e => this.handleJointQuery(e)}>{cShowCaption}</a> : cShowCaption;
    title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{title}</label> : <label>{title}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    const control = this.getControl();
    return control;
  }
}
