import React, { Component } from 'react';
import { Icon, Tree, Popover, Checkbox, Button, Input } from 'antd';
import Label from './label';
import text from './text';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { findDOMNode } from 'react-dom';
import { debug } from 'util';

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
      bIsNull: props.bIsNull,
      showPop: false,
      checkedKeys: [],
      halfCheckedKeys: [],
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      bLinkage: false,/*上级联动下级*/
    };
    this.expandedKeys = [];
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
    this.setState({ popWidth: this.input.clientWidth });
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    let model = this.getModel();
    if (model)
      model.removeListener(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value)
      this.setState({ value: nextProps.value });
    if (nextProps.model) {
      if (!this.props.model) {
        nextProps.model.addListener(this);
      } else {
        return;
      }
    } else {
      if (this.props.model) {
        this.props.model.removeListener(this);
      }
    }
  }
  open = (e) => {
    this.referViewModel = e.vm;
    this.treeModel = e.vm.get('tree');
    this.treeModel.addListener(this);
    if (typeof this.props.afterOkClick === 'function')
      this.referViewModel.on('afterOkClick', this.props.afterOkClick);
  }
  setListenerState(params) {
    const { value, keyField } = params;
    delete params.value;
    const { select } = this.state;
    if (select && select.length) {
      const checkedKeys = [];
      select.forEach(item => {
        checkedKeys.push(item[keyField]);
      });
      params.checkedKeys = checkedKeys;
    }
    this.setState(params);
    if (value)
      this.setValue(value);
  }
  setValue = (value) => {
    if (cb.utils.isArray(value)) return;
    this.setState({ value });
  }
  setDataSource = (dataSource) => {
    this.setState({ dataSource });
  }
  getModel = () => {
    return this.props.model || this.model;
  }
  handleClick = () => {
    if (this.state.disabled) return;
    if (!this.refresh) {
      if (this.hasClicked) return;
      this.hasClicked = true;
    }
    this.onClick();
  }
  onClick = () => {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model)
      model.browse();
  }
  handleJointQuery = () => {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model)
      model.fireEvent('jointQuery');
  }
  onSelect = (selectedKeys, e) => {
    if (this.props.onSelect)
      this.props.onSelect(selectedKeys, e);
    if (this.treeModel)
      this.treeModel.select(selectedKeys);
    this.setState({ showPop: false });
    this.referViewModel.execute('afterOkClick', this.treeModel.getSelectedNodes());
  }
  /*pop点击事件*/
  onPopClick = () => {
    const disabled = this.state.disabled;
    if (disabled) return;
    this.setState({
      showPop: !this.state.showPop
    });
  }
  onCheck = (checkedKeys, e) => {
    let bLinkage = this.state.bLinkage;
    let checkKeys, halfCheckKeys;
    if (checkedKeys.checked) {
      checkKeys = checkedKeys.checked;
      halfCheckKeys = checkedKeys.halfChecked;
    } else {
      checkKeys = checkedKeys;
      halfCheckKeys = e.halfCheckedKeys;
    }
    if (bLinkage)
      this.changeLinkage(checkKeys, halfCheckKeys, e)
    else
      this.setState({ checkedKeys: checkKeys, halfCheckedKeys: halfCheckKeys });
  }
  changeLinkage = (checkKeys, halfCheckKeys, e) => {
    let key = e.node.props.eventKey;
    if (!this.keyMap)
      this.keyMap = this.treeModel.get('keyMap');
    let node = this.keyMap[key];
    if (e.checked)
      checkKeys.pop();
    checkKeys = this.loopTreeNodes(node, checkKeys, e.checked);
    this.setState({ checkedKeys: checkKeys, halfCheckedKeys: halfCheckKeys });
  }
  loopTreeNodes = (node, checkKeys, bChecked) => {
    if (bChecked) {
      checkKeys.push(node[this.state.keyField]);
    } else {
      // let keys = cb.utils.extend(true, [], checkKeys);
      let keys = [];
      checkKeys.map((key, index) => {
        // if (key == node[this.state.keyField])
        // keys.splice(index, 1);
        if (key != node[this.state.keyField])
          keys.push(key);
      });
      checkKeys = keys;
    }
    if (node.children) {
      node.children.map(n => {
        checkKeys = this.loopTreeNodes(n, checkKeys, bChecked);
      });
    }
    return checkKeys;
  }
  onButtonClick = (e, type) => {
    let model = this.getModel();
    model.execute('blur');
    let keys = this.state.checkedKeys;
    if (type == 'submit') {
      if (this.props.onSelect)
        this.props.onSelect(keys, e);
      if (this.treeModel)
        this.treeModel.select(keys);
      this.referViewModel.execute('afterOkClick', this.treeModel.getSelectedNodes());
    }
    this.setState({ showPop: false });
  }
  onClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onSelect)
      this.props.onSelect([], e);
    if (this.treeModel)
      this.treeModel.select([]);
    this.setState({ checkedKeys: [], showPop: false });
    let model = this.getModel();
    model.setValue(null, true);
    model.execute('blur');
  }
  onVisibleChange = (visible) => {
    const disabled = this.state.disabled;
    if (disabled) return;
    this.setState({ showPop: visible });
    if (!visible) {
      let model = this.getModel();
      model.execute('blur');
    }
  }
  /*搜索改变*/
  onSearchChange = (e) => {
    const value = e.target.value;
    let data = this.state.dataSource;
    const { titleField, keyField } = this.state;
    const loop = data => data.map((item) => {
      if (item[titleField] && item[titleField].indexOf(value) > -1) this.expandedKeys.push(item[keyField]);
      if (item.children) {
        loop(item.children);
      }
    });
    if (value != '') loop(data);

    this.setState({
      expandedKeys: this.expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
    this.expandedKeys = [];
  }
  onExpand = (expandedKeys, node) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  filterTreeNode = (node) => {
    // return ['2'];
  }
  onSearch(val) {
    debugger
  }
  onPressEnter() {
    debugger
  }
  handleBodyClick = (e) => {
    document.body.removeEventListener('click', this.handleBodyClick);
    if (this.contains(this.refs.treerefer, e.target)) return;
    // ant-popover-inner-content
    if (e.target && cb.dom(findDOMNode(e.target)).parents('div.ant-popover-inner-content').length) return;
    let model = this.getModel();
    model.execute('blur');
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
  onLinkageChange = (e) => {
    this.setState({
      "bLinkage": e.target.checked
    })
  }
  getPopContent(treeNodes, multiple) {
    if (multiple) {
      let { checkedKeys, halfCheckedKeys, expandedKeys, autoExpandParent, searchValue, checkStrictly, bLinkage } = this.state;
      const treeProps = {};
      if (checkStrictly === false) {
        treeProps.checkStrictly = false;
        treeProps.checkedKeys = [].concat(checkedKeys);
      } else {
        treeProps.checkStrictly = true;
        let keys = [];
        if (checkedKeys.length > 0) {
          keys = { checked: checkedKeys, halfChecked: halfCheckedKeys };
        }
        treeProps.checkedKeys = keys;
      }
      return (
        <div>
          <Search onSearch={this.onSearch} onPressEnter={this.onPressEnter} value={searchValue} onChange={this.onSearchChange} />
          <Tree checkable onCheck={this.onCheck} {...treeProps} filterTreeNode={this.filterTreeNode}
            onExpand={this.onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent}
          >
            {treeNodes}
          </Tree>
          <div className="filter-btn-1">
            <Checkbox checked={bLinkage} onChange={this.onLinkageChange}>联动下级</Checkbox>
            <Button onClick={e => this.onButtonClick(e, 'submit')} className="ant-btn ant-btn-primary ant-btn-sm lf-margin">确定</Button>
            <Button onClick={e => this.onButtonClick(e, 'cancel')} className="ant-btn ant-btn-default ant-btn-sm">取消</Button>
          </div >
        </div >
      )
    } else {
      let { expandedKeys, autoExpandParent, searchValue } = this.state;
      return (
        <div>
          <Search onSearch={this.onSearch} onChange={this.onSearchChange} value={searchValue} />
          <Tree className='tree-refer-radio' onSelect={(selectedKeys, e) => this.onSelect(selectedKeys, e)}
            onExpand={this.onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent}
          >
            {treeNodes}
          </Tree>
        </div>
      )
    }
  }
  getTreeRefer = () => {
    let { multiple, disabled, value, showPop } = this.state;
    let contentClass = "", showClear = false, selectionControl = null;
    if (value && value != "") {
      selectionControl = <span className="ant-select-selection-selected-value">{value}</span>;
      showClear = true;
    } else {
      selectionControl = <span className="ant-select-selection__placeholder"></span>;
    }
    if (disabled) {
      contentClass = "ant-select ant-select-disabled  ant-select-allow-clear";
    } else {
      contentClass = "ant-select ant-select-enabled ant-select-allow-clear";
    }
    if (showPop) contentClass = contentClass + '  ant-select-open ant-select-focused';

    let clearControl = (showClear ? <span onClick={this.onClear} className="ant-select-selection__clear"></span> : <span></span>)
    return (
      <span ref={node => this.input = node} onClick={this.onClick} className={contentClass}>
        <span className="uretail-treerefer-selection ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" tabIndex="0" aria-expanded="false">
          <span className="ant-select-selection__rendered">
            {selectionControl}
          </span>
          {clearControl}
          <span className="ant-select-arrow" style={{ outline: 'none' }}>
            <b></b>
          </span>
        </span>
      </span>
    )
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    let baseControl = null;
    if (this.state.readOnly) {
      baseControl = text(this.state.value);
    }
    else {
      const dataSource = this.state.dataSource || [];
      let { titleField, keyField, childrenField, multiple, disabled, value, showPop, searchValue, popWidth } = this.state;


      const loop = data => data.map((item) => {
        let title = item[titleField];

        if (item[childrenField]) {
          if (item[titleField] && item[titleField].indexOf(searchValue) > -1 && searchValue != "") title = (<span style={{ color: 'red' }}>{title}</span>)
          return <TreeNode data={item} value={item[keyField]} title={title} key={item[keyField]}>{loop(item[childrenField])}</TreeNode>;
        }
        if (item[titleField] && item[titleField].indexOf(searchValue) > -1 && searchValue != "") title = (<span style={{ color: 'red' }}>{title}</span>)
        return <TreeNode data={item} value={item[keyField]} title={title} key={item[keyField]} isLeaf={item.isLeaf} disabled={item.disabled} />;
      });
      const treeNodes = loop(dataSource);
      const control = this.getTreeRefer();
      const popContent = this.getPopContent(treeNodes, multiple);
      const extraProps = {};
      if (popWidth)
        extraProps.overlayStyle = { width: popWidth };
      baseControl = (
        <Popover {...extraProps} visible={showPop} overlayClassName="uretail-pop" content={popContent} trigger="click" placement="bottom" onClick={this.onPopClick} onVisibleChange={this.onVisibleChange}>
          {control}
        </Popover >
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
    document.body.addEventListener('click', this.handleBodyClick);
    const control = this.getControl();
    let errClass = this.state.err;
    return (
      <div className={errClass} ref="treerefer">
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
